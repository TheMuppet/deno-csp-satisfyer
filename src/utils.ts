export function arbitrary(array: Array<string>) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

export function collect_variables(expression: string) {
  return expression.match(/[a-z_]\w*(?!\w*\s*\()/ig);
}
export function arb_set(set: Set<any>) { //skipcq: JS-0323
  for (const e of set) {
    return e;
  }
}
export function allSolutions(assignment: {[key: string]: number | string}, allSolutions: Set<{[key: string]: number | string}>) {
  allSolutions.add(assignment);
}
