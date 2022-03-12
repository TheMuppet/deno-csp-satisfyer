import {
  Constraint,
  ConstraintWithVars,
  CSP,
  CSPwithVars,
  Variable,
} from "./solver/typesInterfaces.ts";
export {
  arbitrary,
  arbSet,
  collectVariables,
  getConstraintVariables,
  getCSPwithVars,
  prepareConstraintsForEval,
  preprocessCsp,
  validateVariables,
};
function arbitrary(array: Array<string>): string {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// function returns an element of a Set
// deno-lint-ignore no-explicit-any
function arbSet(set: Set<any>): any { //skipcq: JS-0323
  for (const e of set) {
    return e;
  }
}

function prepareConstraintsForEval(
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

function preprocessCsp(
  csp: CSP,
): CSP {
  const preprocessedCsp: CSP = {
    variables: csp.variables,
    values: csp.values,
    constraints: prepareConstraintsForEval(csp.variables, csp.constraints),
  };
  return preprocessedCsp;
}

function collectVariables(expression: Constraint): Set<Variable> {
  return new Set(expression.match(/(?<=assignment\[["'])(\S)+(?=(["']\]))/ig));
}

function getConstraintVariables(
  expressions: Set<Constraint>,
): Set<ConstraintWithVars> {
  const constraintsWithVars: Set<ConstraintWithVars> = new Set();
  for (const cons of expressions) {
    constraintsWithVars.add([cons, collectVariables(cons)]);
  }
  return constraintsWithVars;
}

function getCSPwithVars(csp: CSP): CSPwithVars {
  const newCons = getConstraintVariables(csp.constraints);
  const cspVars: CSPwithVars = {
    variables: csp.variables,
    values: csp.values,
    constraints: newCons,
  };
  return cspVars;
}

function validateVariables(variables: Set<Variable>) {
  const regex = /[^\w]+/;
  variables.forEach(function (variable) {
    if (regex.test(variable)) {
      throw TypeError("Variables can only be Alphanumerical Charachters");
    }
  });
}
