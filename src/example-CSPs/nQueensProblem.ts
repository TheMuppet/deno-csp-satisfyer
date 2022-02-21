import { CSP } from "../solver/CSP.ts";
export function nQueensProblemCSP(n: number) {
  const variables = new Set(Array.from({ length: n }, (_, i) => `V${i + 1}`));
  const values = new Set(Array.from({ length: n }, (_, i) => i + 1));
  const constraints = new Set<string>();
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (i < j) {
        constraints.add(`assignment["V${i}"] != assignment["V${j}"]`);
        constraints.add(
          `Math.abs(assignment["V${j}"] - assignment["V${i}"]) != ${j - i}`,
        );
      }
    }
  }
  const csp: CSP = {
    variables: variables,
    values: values,
    constraints: constraints,
  };
  return csp;
}
