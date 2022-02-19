import { arb_set } from "../utils.ts";
export { solve };
import { SolutionProcessor } from "../solutionProcessors.ts";
import { CSP } from "./CSP.ts";

function checkAllConstraints(assignment: {}, constraints: Set<string>) {
  for (let con of constraints) {
    if (!eval(con)) {
      return false;
    }
  }
  return true;
}

function bruteForceSearch(
  assignment: {},
  unassignedVars: Set<string>,
  csp: CSP,
  solutionProcessor?: SolutionProcessor,
) {
  if (Object.keys(assignment).length == csp.variables.size) {
    if (checkAllConstraints(assignment, csp.constraints)) {
      if (solutionProcessor) {
        solutionProcessor.processSolution(assignment);
      } else {
        return assignment;
      }
    }
    return null;
  }
  const variable = arb_set(unassignedVars);
  unassignedVars.delete(variable);
  for (const value of csp.values) {
    const newAssignment: any = { ...assignment };
    newAssignment[variable] = value;
    const result: any = bruteForceSearch(
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

function solve(
  csp: CSP,
  solutionProcessor?: SolutionProcessor,
) {
  const unassignedVars: Set<string> = new Set(csp.variables);
  return bruteForceSearch({}, unassignedVars, csp, solutionProcessor);
}
