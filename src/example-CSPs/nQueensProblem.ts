import { CSP } from "../solver/typesInterfaces.ts";
export function nQueensProblemCSP(n: number) {
  const variables = new Set(Array.from({ length: n }, (_, i) => `V${i + 1}`));
  const values = new Set(Array.from({ length: n }, (_, i) => i + 1));
  const constraints = new Set<string>();
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (i < j) {
        constraints.add(`V${i} != V${j}`);
        constraints.add(
          `Math.abs(V${j} - V${i}) != ${j - i}`,
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
