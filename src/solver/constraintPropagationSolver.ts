import { SolutionProcessor } from "../solutionProcessors/SolutionProcessors.ts";
import { getCSPwithVars, preprocessCsp } from "../utils.ts";
import {
  Assignment,
  ConstraintWithVars,
  CSP,
  CSPwithVars,
  Value,
  ValuePerVars,
  Variable,
} from "./types.ts";

export function mostConstraintedVariable(
  unassignedVars: Set<Variable>,
  valuePerVars: ValuePerVars,
): Variable {
  let minVar = "";
  let minCount = Infinity;
  const valueCount: Array<[string, number]> = new Array(0);
  for (const variable of unassignedVars) {
    const count = valuePerVars[variable].size;
    if (count < minCount) {
      minVar = variable;
      minCount = count;
    }
    valueCount.push([variable, valuePerVars[variable].size]);
  }
  return minVar; // the better option would be returning a rmd element with min value
}

export function propagate(
  variable: Variable,
  value: Value,
  currentAssignment: Assignment,
  valuePerVars: ValuePerVars,
  constraints: Set<ConstraintWithVars>,
): ValuePerVars | null {
  const newValues = { ...valuePerVars };
  newValues[variable] = new Set([value]);
  const assignmentWithVar = { ...currentAssignment };
  assignmentWithVar[variable] = value;
  for (const [constraint, vars] of constraints) {
    if (!vars.has(variable)) continue;
    const unboundVars = Array.from(vars).filter(
      (val) =>
        val != variable && !(Object.keys(currentAssignment).includes(val)),
    );
    if (unboundVars.length != 1) continue;
    const legalValues: Set<string | number> = new Set();
    for (const val of newValues[unboundVars[0]]) {
      const assignment = { ...assignmentWithVar };
      assignment[unboundVars[0]] = val;
      if (eval(constraint)) {
        legalValues.add(val);
      }
    }
    if (legalValues.size == 0) {
      return null;
    }
    newValues[unboundVars[0]] = legalValues;
  }
  return newValues;
}

export function backtrack(
  assignment: Assignment,
  unassignedVars: Set<Variable>,
  csp: CSPwithVars,
  valuesPerVar: ValuePerVars,
  solutionProcessor?: SolutionProcessor,
): Assignment | null {
  if (unassignedVars.size == 0) {
    if (solutionProcessor) {
      solutionProcessor.processSolution(assignment);
      return null;
    } else {
      return assignment;
    }
  }
  const variable = mostConstraintedVariable(unassignedVars, valuesPerVar);
  unassignedVars.delete(variable);
  for (const value of valuesPerVar[variable]) {
    const newValuesPerVar = propagate(
      variable,
      value,
      assignment,
      valuesPerVar,
      csp.constraints,
    );
    if (!newValuesPerVar) { //speed test with exception method
      continue;
    }
    const newAssignment = { ...assignment };
    newAssignment[variable] = value;
    const result = backtrack(
      newAssignment,
      unassignedVars,
      csp,
      newValuesPerVar,
      solutionProcessor,
    );
    if (result) {
      return result;
    }
  }

  unassignedVars.add(variable);
  return null;
}

export function applyUnaryCons(
  unaryCons: Set<ConstraintWithVars>,
  valuePerVars: ValuePerVars,
): ValuePerVars {
  const assignment: Assignment = {};
  for (const [constraint, variables] of unaryCons) {
    for (const variable of variables) {
      for (const value of valuePerVars[variable]) {
        assignment[variable] = value;
        if (!(eval(constraint))) {
          valuePerVars[variable].delete(value);
        }
      }
      delete assignment[variable];
    }
  }
  return valuePerVars;
}

export function splitUnaryCons(
  constraints: Set<ConstraintWithVars>,
): [Set<ConstraintWithVars>, Set<ConstraintWithVars>] {
  const unaryCons: Set<ConstraintWithVars> = new Set();
  const otherCons: Set<ConstraintWithVars> = new Set();
  constraints.forEach(function (constraint) {
    const vars = constraint[1];
    if (vars.size == 1) {
      unaryCons.add(constraint);
    } else {
      otherCons.add(constraint);
    }
  });
  return [unaryCons, otherCons];
}

export function getValuesPerVar(csp: CSP): ValuePerVars {
  const valuePerVars: ValuePerVars = {};
  csp.variables.forEach(function (variable) {
    const cspVal = csp.values;
    valuePerVars[variable] = new Set(cspVal);
  });
  return valuePerVars;
}

export function solveConstraintPropagation(
  csp: CSP,
  solutionProcessor?: SolutionProcessor,
): Assignment | null {
  const preprocessed_csp: CSP = preprocessCsp(csp);
  const unassignedVars: Set<string> = new Set(preprocessed_csp.variables);
  let valuesPerVar: { [key: string]: Set<number | string> } = getValuesPerVar(
    preprocessed_csp,
  );
  const cspVars: CSPwithVars = getCSPwithVars(preprocessed_csp);
  const [unaryCons, otherCons] = splitUnaryCons(cspVars.constraints);
  valuesPerVar = applyUnaryCons(unaryCons, valuesPerVar);
  cspVars.constraints = otherCons;
  return backtrack(
    {},
    unassignedVars,
    cspVars,
    valuesPerVar,
    solutionProcessor,
  );
}
