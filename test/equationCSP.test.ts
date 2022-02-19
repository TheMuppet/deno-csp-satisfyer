import { solve } from "../src/solver/bruteForceSolver.ts";
import { assertEquals } from "../deps.ts";
import {
  equationSystemCSP,
  equationSystemCSPmultipleSol,
} from "../src/example-CSPs/EquationSystem.ts";
import { allSolProc } from "../src/solutionProcessors.ts";
Deno.test({
  name: "Test Brute Force Solver",
  fn: () => {
    const a = 2;
    const b = 3;
    const sol = solve(equationSystemCSP(a, b));
    assertEquals(sol, { "a": a, "b": b });
  },
});
Deno.test({
  name: "Test Brute Force Solver All Solutions",
  fn: () => {
    const a = 2;
    const b = 3;
    solve(equationSystemCSPmultipleSol(a, b), allSolProc);
    console.log(allSolProc.allSolutions);
    const sol = new Set([{ "a": a, "b": b }, { "a": b, "b": a }]);
    assertEquals(allSolProc.allSolutions, sol);
  },
});
