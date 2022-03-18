import { arbSet } from "../utils.ts";
import { CSPMap } from "./CSP_map.ts";
import {
  Assignment,
  Constraint,
  SolutionProcessor,
  Variable,
} from "./typesInterfaces.ts";
export function checkAllConstraints(
  // assignment is needed for eval function so we need to ignore errors
  // deno-lint-ignore no-unused-vars
  assignment: Assignment,
  constraints: Map<Constraint, null>,
): boolean {
  for (const con of constraints) {
    if (!eval(con[0])) {
      return false;
    }
  }
  return true;
}

function bruteForceSearch(
  assignment: Assignment,
  unassignedVars: Map<Variable, null>,
  csp: CSPMap,
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
  const variable: string = arbMap(unassignedVars);
  unassignedVars.delete(variable);
  for (const value of csp.values) {
    const newAssignment: Assignment = { ...assignment };
    newAssignment[variable] = value[0];
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
  unassignedVars.set(variable, null);
  return null;
}

export function solveBruteForceMap(
  csp: CSPMap,
  solutionProcessor?: SolutionProcessor,
): Assignment | null {
  const preprocessed_csp: CSPMap = preprocessCsp(csp);
  const unassignedVars: Map<Variable, null> = new Map(csp.variables);
  return bruteForceSearch(
    {},
    unassignedVars,
    preprocessed_csp,
    solutionProcessor,
  );
}

function prepareConstraintsForEval(
  variables: Map<Variable, null>,
  constraints: Map<Constraint, null>,
): Map<Constraint, null> {
  const new_constraints = new Map();
  constraints.forEach(function (value, constraint) {
    variables.forEach(function (variable) {
      const regex = new RegExp(
        `(?<=[^\\w'"]|^)${variable}(?=[^\\w'"^(]|$)`,
        "g",
      );
      constraint = constraint.replace(regex, `assignment['${variable}']`);
    });
    new_constraints.set(constraint, null);
  });
  return new_constraints;
}

function preprocessCsp(
  csp: CSPMap,
): CSPMap {
  const preprocessedCsp: CSPMap = {
    variables: csp.variables,
    values: csp.values,
    constraints: prepareConstraintsForEval(csp.variables, csp.constraints),
  };
  return preprocessedCsp;
}
// function returns an element of a Set
// deno-lint-ignore no-explicit-any
function arbMap(map: Map<any, any>): any { //skipcq: JS-0323
  for (const e of map) {
    return e[0];
  }
}
