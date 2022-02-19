import { CSP } from "../solver/CSP.ts";

export function equationSystemCSP(a: number, b: number) {
  let variables = new Set(["a", "b"]);
  let values = new Set([1, 2, 3, 5]);
  let amb = a * b + b;
  let apb = a + b;
  let constraints = new Set([
    `assignment["a"] + assignment["b"] == ${apb}`,
    `assignment["b"] * assignment["a"] + assignment["b"]== ${amb}`,
  ]);
  let csp: CSP = {
    variables: variables,
    values: values,
    constraints: constraints,
  };
  return csp;
}

export function equationSystemCSPmultipleSol(a: number, b: number) {
  let variables = new Set(["a", "b"]);
  let values = new Set([1, 2, 3, 5]);
  let amb = a * b;
  let apb = a + b;
  let constraints = new Set([
    `assignment["a"] + assignment["b"] == ${apb}`,
    `assignment["b"] * assignment["a"] == ${amb}`,
  ]);
  let csp: CSP = {
    variables: variables,
    values: values,
    constraints: constraints,
  };
  return csp;
}
