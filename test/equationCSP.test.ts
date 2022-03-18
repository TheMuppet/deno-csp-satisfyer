import { solveBruteForce } from "../src/solver/bruteForceSolver.ts";
import { assertEquals } from "../deps.ts";
import {
  equationSystemCSP,
  equationSystemCSPmultipleSol,
} from "../example-CSPs/EquationSystem.ts";
import { AllSolProc } from "../src/solutionProcessors.ts";
Deno.test({
  name: "Test Brute Force Solver",
  fn: () => {
    const a = 2;
    const b = 3;
    const sol = solveBruteForce(equationSystemCSP(a, b));
    assertEquals(sol, { "a": a, "b": b });
  },
});
Deno.test({
  name: "Test Brute Force Solver All Solutions",
  fn: () => {
    const a = 2;
    const b = 3;
    const solProc = new AllSolProc();
    solveBruteForce(equationSystemCSPmultipleSol(a, b), solProc);
    const sol = new Set([{ "a": a, "b": b }, { "a": b, "b": a }]);
    assertEquals(solProc.allSolutions, sol);
  },
});
