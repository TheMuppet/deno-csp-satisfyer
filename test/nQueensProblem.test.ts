import { solve } from "../src/solver/bruteForceSolver.ts";
import { assertNotEquals } from "../deps.ts";
import { nQueensProblemCSP } from "../src/example-CSPs/nQueensProblem.ts";

Deno.test({
  name: "Test Brute Force Solver on n-Queens Problem ",
  fn: () => {
    let n = 8;
    let sol = solve(nQueensProblemCSP(n));
    assertNotEquals(sol, {});
    console.log('\n Solution: ')
    console.log(sol)
  },
});
