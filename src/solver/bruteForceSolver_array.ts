import { arbitrary } from "../utils.ts";
export { solveBruteForceArray };
import { Assignment, SolutionProcessor } from "./typesInterfaces.ts";
import { CSP } from "./CSP_array.ts";

export function checkAllConstraints(
  // deno-lint-ignore no-unused-vars
  assignment: Assignment,
  constraints: Array<string>,
) {
  for (const con of constraints) {
    if (!eval(con)) {
      return false;
    }
  }
  return true;
}

function bruteForceSearch(
  assignment: Assignment,
  unassignedVars: Array<string>,
  csp: CSP,
  solutionProcessor?: SolutionProcessor,
): Assignment | null {
  if (Object.keys(assignment).length == csp.variables.length) {
    if (checkAllConstraints(assignment, csp.constraints)) {
      if (solutionProcessor) {
        solutionProcessor.processSolution(assignment);
      } else {
        return assignment;
      }
    }
    return null;
  }
  const variable = arbitrary(unassignedVars);
  unassignedVars = unassignedVars.filter((obj) => obj !== variable);
  for (const value of csp.values) {
    const newAssignment: Assignment = { ...assignment };
    newAssignment[variable] = value;
    const result: Assignment | null = bruteForceSearch(
      newAssignment,
      unassignedVars,
      csp,
      solutionProcessor,
    );
    if (result) {
      return result;
    }
  }
  unassignedVars.push(variable);
  return null;
}

function solveBruteForceArray(
  csp: CSP,
  solutionProcessor?: SolutionProcessor,
) {
  const unassignedVars: Array<string> = [...csp.variables];
  return bruteForceSearch({}, unassignedVars, csp, solutionProcessor);
}
