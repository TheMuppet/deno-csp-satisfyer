import { tassignment } from "../src/solver/assignment.ts";

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
  assignment: tassignment,
  allSolutions: Set<tassignment>,
) {
  allSolutions.add(assignment);
}
