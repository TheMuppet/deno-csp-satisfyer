import { t_assignment } from "./solver/assignment.ts";
import { CSP, CSPwithVars } from "./solver/CSP.ts";

export function arbitrary(array: Array<string>) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

export function collect_variables(expression: string) {
  return expression.match(/[a-z_]\w*(?!\w*\s*\()/ig);
}
// deno-lint-ignore no-explicit-any
export function arb_set(set: Set<any>) { //skipcq: JS-0323
  for (const e of set) {
    return e;
  }
}

export function allSolutions(
  assignment: t_assignment,
  allSolutions: Set<t_assignment>,
) {
  allSolutions.add(assignment);
}

export function prepare_constraints_for_eval(
  variables: Set<string>,
  constraints: Set<string>,
) {
  const new_constraints = new Set<string>();
  constraints.forEach(function (constraint) {
    variables.forEach(function (variable) {
      const regex = new RegExp(
        `(?<=[^\w^']|^)${variable}(?=[^\w^'^(]|$)`,
        "g",
      );
      constraint = constraint.replace(regex, `assignment['${variable}']`);
    });
    new_constraints.add(constraint);
  });
  return new_constraints;
}

export function preprocess_csp(
  csp: CSP,
) {
  const preprocessed_csp: CSP = {
    variables: csp.variables,
    values: csp.values,
    constraints: prepare_constraints_for_eval(csp.variables, csp.constraints),
  };
  return preprocessed_csp;
}

export function collectVariables(expression: string) {
  return new Set(expression.match(/(?<=assignment\[')(\S)+(?=('\]))/ig));
}

export function getConstraintVariables(expressions: Set<string>) {
  const constraintsWithVars: Set<[string, Set<string>]> = new Set();
  for (const cons of expressions) {
    constraintsWithVars.add([cons, collectVariables(cons)]);
  }
  return constraintsWithVars;
}

export function getCSPwithVars(csp: CSP) {
  const newCons = getConstraintVariables(csp.constraints);
  const cspVars: CSPwithVars = {
    variables: csp.variables,
    values: csp.values,
    constraints: newCons,
  };
  return cspVars;
}
