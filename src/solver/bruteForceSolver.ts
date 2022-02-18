import { arb_set } from "../utils.ts";
export { solve };
import { SolutionProcessor } from "../solutionProcessors.ts";

function solve(
  csp: [Set<string>, Set<number | string>, Set<string>],
  solutionProcessor?: SolutionProcessor,
) {
  let [variables, values, constraints] = csp;
  let assign = {};
  let unassignedVars = new Set(variables);
  return bruteForceSearch(assign, unassignedVars, csp, solutionProcessor);
}

function bruteForceSearch(
  assignment: {},
  unassignedVars: Set<string>,
  csp: [Set<string>, Set<number | string>, Set<string>],
  solutionProcessor?: SolutionProcessor,
) {
  let [variables, values, constraints] = csp;
  if (Object.keys(assignment).length == variables.size) {
    if (checkAllConstraints(assignment, constraints)) {
      if (solutionProcessor) {
        solutionProcessor.processSolution(assignment);
      } else {
        return assignment;
      }
    }
    return null;
  }
  let variable = arb_set(unassignedVars);
  unassignedVars.delete(variable);
  for (let value of values) {
    let newAssignment: any = { ...assignment };
    newAssignment[variable] = value;
    let result: any = bruteForceSearch(
      newAssignment,
      unassignedVars,
      csp,
      solutionProcessor,
    );
    if (result) {
      return result;
    }
  }
  unassignedVars.add(variable);
}

function checkAllConstraints(assignment: {}, constraints: Set<string>) {
  for (let con of constraints) {
    if (!eval(con)) {
      return false;
    }
  }
  return true;
}
