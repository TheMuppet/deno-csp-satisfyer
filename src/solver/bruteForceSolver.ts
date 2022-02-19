import { arb_set } from "../utils.ts";
export { solve };
import { SolutionProcessor } from "../solutionProcessors.ts";
import { CSP } from "./CSP.ts";
import { t_assignment } from "./assignment.ts";

function checkAllConstraints(
  // deno-lint-ignore no-unused-vars
  assignment: t_assignment,
  constraints: Set<string>,
) {
  for (const con of constraints) {
    if (!eval(con)) {
      return false;
    }
  }
  return true;
}

function bruteForceSearch(
  assignment: t_assignment,
  unassignedVars: Set<string>,
  csp: CSP,
  solutionProcessor?: SolutionProcessor,
): t_assignment | null {
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
    const newAssignment: t_assignment = { ...assignment };
    newAssignment[variable] = value;
    const result: t_assignment | null = bruteForceSearch(
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
  return null;
}

function solve(
  csp: CSP,
  solutionProcessor?: SolutionProcessor,
) {
  const unassignedVars: Set<string> = new Set(csp.variables);
  return bruteForceSearch({}, unassignedVars, csp, solutionProcessor);
}
