import { solve } from "../src/solver/bruteForceSolver.ts";
import { assert, assertArrayIncludes, assertEquals } from "../deps.ts";
import { nQueensProblemCSP } from "../src/example-CSPs/nQueensProblem.ts";
import { checkAllConstraints } from "../src/solver/bruteForceSolver.ts";
Deno.test({
  name: "Test Brute Force Solver on 3-Queens Problem ",
  fn: () => {
    const n = 3;
    const sol = solve(nQueensProblemCSP(n));
    assertEquals(null, sol);
  },
});
Deno.test({
  name: "Test Brute Force Solver on 3-Queens Problem ",
  fn: () => {
    const n = 6;
    const csp = nQueensProblemCSP(n);
    const sol = solve(csp);
    if (sol) {
      assert(checkAllConstraints(sol, csp.constraints));
    } else {
      assert(false);
    }
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
