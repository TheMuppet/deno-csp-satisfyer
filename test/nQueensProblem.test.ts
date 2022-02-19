import { solve } from "../src/solver/bruteForceSolver.ts";
import { assertNotEquals } from "../deps.ts";
import { nQueensProblemCSP } from "../src/example-CSPs/nQueensProblem.ts";

Deno.test({
  name: "Test Brute Force Solver on n-Queens Problem ",
  fn: () => {
    const n = 8;
    const sol = solve(nQueensProblemCSP(n));
    assertNotEquals(sol, {});
  },
});
