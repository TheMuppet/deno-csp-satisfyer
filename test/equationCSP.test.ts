import { solve } from "../src/solver/bruteForceSolver.ts";
import { assertArrayIncludes, assertEquals } from "../deps.ts";
import { equationSystemCSP } from "../src/example-CSPs/EquationSystem.ts";
Deno.test({
  name: "Test Brute Force Solver",
  fn: () => {
    let a = 2;
    let b = 3;
    let sol = solve(equationSystemCSP(a, b));
    assertEquals(sol, { "a": a, "b": b });
  },
});
