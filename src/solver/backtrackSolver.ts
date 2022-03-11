import { arb_set, getCSPwithVars } from "../utils.ts";
export { solveBacktrack };
import {
  Assignment,
  Constraint,
  CSP,
  CSPwithVars,
  SolutionProcessor,
  Value,
  Variable,
} from "./typesInterfaces.ts";
import { preprocess_csp } from "../utils.ts";

export function isConsistent(
  variable: Variable,
  value: Value,
  oldAssignment: Assignment,
  constraints: Set<[Constraint, Set<Variable>]>,
) {
  const assignment = { ...oldAssignment };
  assignment[variable] = value;
  for (const [cons, vars] of constraints) {
    if (
      vars.has(variable) &&
      Array.from(vars).every((val) => new Set(Object.keys(assignment)).has(val))
    ) {
      if (!(eval(cons))) {
        return false;
      }
    }
  }
  return true;
}

function backtrack(
  assignment: Assignment,
  unassignedVars: Set<Variable>,
  csp: CSPwithVars,
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
  const variable = arb_set(unassignedVars);
  unassignedVars.delete(variable);
  for (const value of csp.values) {
    if (isConsistent(variable, value, assignment, csp.constraints)) {
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

function solveBacktrack(csp: CSP, solutionProcessor?: SolutionProcessor) {
  const preprocessed_csp: CSP = preprocess_csp(csp);
  const unassignedVars: Set<Variable> = new Set(csp.variables);
  return backtrack(
    {},
    unassignedVars,
    getCSPwithVars(preprocessed_csp),
    solutionProcessor,
  );
}
