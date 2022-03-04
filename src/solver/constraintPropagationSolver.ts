import { arb_set, getCSPwithVars } from "../utils.ts";
export { solve };
import { SolutionProcessor } from "../solutionProcessors.ts";
import { CSP, CSPwithVars } from "./CSP.ts";
import { t_assignment } from "./assignment.ts";
export {
  applyUnaryCons,
  getValuesPerVar,
  mostConstraintedVariable,
  splitUnaryCons,
  propagate
};
function mostConstraintedVariable(
  unassignedVars: Set<string>,
  valuePerVars: { [key: string]: Set<number | string> },
) {
  const valueCount: Array<[string, number]> = new Array(unassignedVars.size);
  for (const variable of unassignedVars) {
    valueCount.push([variable, valuePerVars[variable].size]);
  }
  const min = Math.min.apply(
    null,
    valueCount.map(function (e) {
      return e[1];
    }),
  );
  return valueCount[min][0]; // the better option would be returning a rmd element with min value
}

function propagate(
  variable: string,
  value: string | number,
  currentAssignment: t_assignment,
  valuePerVars: { [key: string]: Set<number | string> },
  constraints: Set<[string, Set<string>]>,
) {
  const newValues = { ...valuePerVars };
  newValues[variable] = new Set([value])
  const assignmentWithVar = {...currentAssignment}
  assignmentWithVar[variable] = value
  for (const [constraint, vars] of constraints) {
    if (!vars.has(variable)) { continue }
    const unboundVars = Array.from(vars).filter(
      (val) =>  val != variable  && !(Object.keys(currentAssignment).includes(val)));
    if (unboundVars.length != 1 ){continue}
    const legalValues: Set<string|number> = new Set()
    for (const val of newValues[unboundVars[0]]){
      const assignment = {...assignmentWithVar}
      assignment[unboundVars[0]] = val
      if(eval(constraint)){
        legalValues.add(val)
      }
    }
    if(legalValues.size == 0){
      return null
    }
    newValues[unboundVars[0]] = legalValues
  
  }
  return newValues
}

// WIP
function backtrack(
  assignment: t_assignment,
  unassignedVars: Set<string>,
  csp: CSPwithVars,
  valuesPerVar: { [key: string]: Set<number | string> },
  solutionProcessor?: SolutionProcessor,
): t_assignment | null {
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
    const newAssignment = { ...assignment };
    newAssignment[variable] = value;
    const result = backtrack(
      newAssignment,
      unassignedVars,
      csp,
      valuesPerVar,
      solutionProcessor,
    );
    if (result) {
      return result;
    }
  }

  unassignedVars.add(variable);
  return null;
}

function applyUnaryCons(
  unaryCons: Set<[string, Set<string>]>,
  valuePerVars: { [key: string]: Set<number | string> },
) {
  const assignment: t_assignment = {};
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

function splitUnaryCons(constraints: Set<[string, Set<string>]>) {
  const unaryCons: Set<[string, Set<string>]> = new Set();
  const otherCons: Set<[string, Set<string>]> = new Set();
  constraints.forEach(function (constraint) {
    const [_, vars] = constraint;
    if (vars.size == 1) {
      unaryCons.add(constraint);
    } else {
      otherCons.add(constraint);
    }
  });
  return [unaryCons, otherCons];
}

function solve(csp: CSP, solutionProcessor?: SolutionProcessor) {
  const unassignedVars: Set<string> = new Set(csp.variables);
  let valuesPerVar: { [key: string]: Set<number | string> } = getValuesPerVar(
    csp,
  );
  const cspVars: CSPwithVars = getCSPwithVars(csp);
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

function getValuesPerVar(csp: CSP) {
  let valuePerVars: { [key: string]: Set<number | string> } = {};
  csp.variables.forEach(function (variable) {
    const cspVal = csp.values;
    valuePerVars[variable] = new Set(cspVal);
  });
  return valuePerVars;
}
