import { arb_set, getCSPwithVars } from "../utils.ts";
export { solve };
import { SolutionProcessor } from "../solutionProcessors.ts";
import { CSP, CSPwithVars } from "./CSP.ts";
import { t_assignment } from "./assignment.ts";

function _mostConstraintedVariable(
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


// WIP
function backtrack(
  assignment: t_assignment,
  unassignedVars: Set<string>,
  csp: CSPwithVars,
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
  const variable = arb_set(unassignedVars);
  unassignedVars.delete(variable);

  for (const value of csp.values) {
    if (true) {
      const newAssignment = { ...assignment };
      newAssignment[variable] = value;
      const result = backtrack(
        newAssignment,
        unassignedVars,
        csp,
        solutionProcessor,
      );
      if (result) {
        return result;
     }
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
          valuePerVars[variable].delete(variable);
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
  let valuePerVars: { [key: string]: Set<number | string> } = {};
  csp.variables.forEach(function (variable) {
    valuePerVars[variable] = { ...csp.values };
  });
  const cspVars: CSPwithVars = getCSPwithVars(csp);
  const [unaryCons, otherCons] = splitUnaryCons(cspVars.constraints);
  valuePerVars = applyUnaryCons(unaryCons, valuePerVars);
  cspVars.constraints = otherCons;
  return backtrack({}, unassignedVars, cspVars, solutionProcessor);
}
