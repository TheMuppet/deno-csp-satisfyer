import { solveBruteForce } from "../src/solver/bruteForceSolver.ts";
import { assertEquals } from "../deps.ts";
import {
  equationSystemCSP,
  equationSystemCSPmultipleSol,
} from "../src/example-CSPs/EquationSystem.ts";
import { allSolProc } from "../src/solver/typesInterfaces.ts";
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
    solveBruteForce(equationSystemCSPmultipleSol(a, b), allSolProc);
    const sol = new Set([{ "a": a, "b": b }, { "a": b, "b": a }]);
    assertEquals(allSolProc.allSolutions, sol);
  },
});
