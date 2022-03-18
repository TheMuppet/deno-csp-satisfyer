import { CSP } from "../solver/CSP_array.ts";
import { CSPMap } from "../solver/CSP_map.ts";
export function nQueensProblemCSPArray(n: number) {
  const variables = Array.from({ length: n }, (_, i) => `V${i + 1}`);
  const values = Array.from({ length: n }, (_, i) => i + 1);
  const constraints = new Array<string>();
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (i < j) {
        constraints.push(`assignment["V${i}"] != assignment["V${j}"]`);
        constraints.push(
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
export function nQueensProblemCSPMap(n: number) {
  const csp = nQueensProblemCSPArray(n);
  const cspMap: CSPMap = {
    variables: arraytoMap(csp.variables),
    values: arraytoMap(csp.values),
    constraints: arraytoMap(csp.constraints),
  };
  return cspMap;
}
function arraytoMap(array: Array<any>) {
  const a: Array<[any, null]> = array.map(function name(numb) {
    return [numb, null];
  });
  return new Map(a);
}
