import {
  Constraint,
  ConstraintWithVars,
  CSP,
  CSPwithVars,
  Variable,
} from "./solver/types.ts";

export function arbitrary(array: Array<string>): string {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// deno-lint-ignore no-explicit-any
export function arbSet(set: Set<any>): any { //skipcq: JS-0323
  for (const e of set) {
    return e;
  }
}

export function prepareConstraintsForEval(
  variables: Set<Variable>,
  constraints: Set<Constraint>,
): Set<Constraint> {
  const new_constraints = new Set<string>();
  constraints.forEach(function (constraint) {
    variables.forEach(function (variable) {
      const regex = new RegExp(
        `(?<=[^\\w'"]|^)${variable}(?=[^\\w'"^(]|$)`,
        "g",
      );
      constraint = constraint.replace(regex, `assignment['${variable}']`);
    });
    new_constraints.add(constraint);
  });
  return new_constraints;
}

export function preprocessCsp(
  csp: CSP,
): CSP {
  const preprocessedCsp: CSP = {
    variables: csp.variables,
    values: csp.values,
    constraints: prepareConstraintsForEval(csp.variables, csp.constraints),
  };
  return preprocessedCsp;
}

export function collectVariables(expression: Constraint): Set<Variable> {
  return new Set(expression.match(/(?<=assignment\[["'])(\S)+(?=(["']\]))/ig));
}

export function getConstraintVariables(
  expressions: Set<Constraint>,
): Set<ConstraintWithVars> {
  const constraintsWithVars: Set<ConstraintWithVars> = new Set();
  for (const cons of expressions) {
    constraintsWithVars.add([cons, collectVariables(cons)]);
  }
  return constraintsWithVars;
}

export function getCSPwithVars(csp: CSP): CSPwithVars {
  const newCons = getConstraintVariables(csp.constraints);
  const cspVars: CSPwithVars = {
    variables: csp.variables,
    values: csp.values,
    constraints: newCons,
  };
  return cspVars;
}

export function validateVariables(variables: Set<Variable>) {
  const regex = /[^\w]+/;
  variables.forEach(function (variable) {
    if (regex.test(variable)) {
      throw TypeError("Variables can only be Alphanumerical Characters");
    }
  });
}
