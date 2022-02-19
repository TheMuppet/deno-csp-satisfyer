export function nQueensProblemCSP(n: number) {
    let variables = new Set(Array.from({length: n}, (_, i) => `V${i + 1}`));
    let values = new Set(Array.from({length: n}, (_, i) => i + 1));
    let constraints = new Set<string>();
    for (var i = 1; i <= n; i++) {
        for (var j = 1; j <= n; j++) {
            if (i < j) {
                constraints.add(`assignment["V${i}"] != assignment["V${j}"]`);
                constraints.add(`Math.abs(assignment["V${j}"] - assignment["V${i}"]) != ${j - i}`)
            }
        }
     }
    let csp: [Set<string>, Set<number | string>, Set<string>] = [
      variables,
      values,
      constraints,
    ];
    return csp;
  }