import { solve } from "../src/solver/bruteForceSolver.ts";
import { assertArrayIncludes, assertEquals } from "../deps.ts";
import { nQueensProblemCSP } from "../src/example-CSPs/nQueensProblem.ts";

Deno.test({
  name: "Test Brute Force Solver on 3-Queens Problem ",
  fn: () => {
    const n = 3;
    const sol = solve(nQueensProblemCSP(n));
    assertEquals(null, sol);
  },
});

Deno.test({
  name: "Test Brute Force Solver on 4-Queens Problem ",
  fn: () => {
    const n = 4;
    const sol = solve(nQueensProblemCSP(n));
    assertArrayIncludes([{ "V1": 2, "V2": 4, "V3": 1, "V4": 3 }, {
      "V1": 3,
      "V2": 1,
      "V3": 4,
      "V4": 2,
    }], [sol]);
  },
});
