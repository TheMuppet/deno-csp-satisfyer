import { arb_set } from "../utils.ts";
export { solveBruteForce };
import {
  Assignment,
  Constraint,
  CSP,
  SolutionProcessor,
  Variable,
} from "./typesInterfaces.ts";
import { preprocess_csp } from "../utils.ts";

export function checkAllConstraints(
  // assignment is needed for eval function so we need to ignore errors
  // deno-lint-ignore no-unused-vars
  assignment: Assignment,
  constraints: Set<Constraint>,
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
  unassignedVars: Set<Variable>,
  csp: CSP,
  solutionProcessor?: SolutionProcessor,
): Assignment | null {
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
  unassignedVars.add(variable);
  return null;
}

function solveBruteForce(
  csp: CSP,
  solutionProcessor?: SolutionProcessor,
) {
  const preprocessed_csp: CSP = preprocess_csp(csp);
  const unassignedVars: Set<Variable> = new Set(csp.variables);
  return bruteForceSearch(
    {},
    unassignedVars,
    preprocessed_csp,
    solutionProcessor,
  );
}
