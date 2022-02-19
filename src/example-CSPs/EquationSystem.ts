import { CSP } from "../solver/CSP.ts";

export function equationSystemCSP(a: number, b: number) {
  const variables = new Set(["a", "b"]);
  const values = new Set([1, 2, 3, 5]);
  const amb = a * b + b;
  const apb = a + b;
  const constraints = new Set([
    `assignment["a"] + assignment["b"] == ${apb}`,
    `assignment["b"] * assignment["a"] + assignment["b"]== ${amb}`,
  ]);
  const csp: CSP = {
    variables: variables,
    values: values,
    constraints: constraints,
  };
  return csp;
}

export function equationSystemCSPmultipleSol(a: number, b: number) {
  const variables = new Set(["a", "b"]);
  const values = new Set([1, 2, 3, 5]);
  const amb = a * b;
  const apb = a + b;
  const constraints = new Set([
    `assignment["a"] + assignment["b"] == ${apb}`,
    `assignment["b"] * assignment["a"] == ${amb}`,
  ]);
  const csp: CSP = {
    variables: variables,
    values: values,
    constraints: constraints,
  };
  return csp;
}
