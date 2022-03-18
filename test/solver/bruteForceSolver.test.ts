import { assert, assertArrayIncludes, assertEquals } from "../../deps.ts";
import { nQueensProblemCSP } from "../../example-CSPs/nQueensProblem.ts";
import { checkAllConstraints } from "../../src/solver/bruteForceSolver.ts";
import { prepareConstraintsForEval } from "../../src/utils.ts";
import { equationSystemCSP } from "../../example-CSPs/EquationSystem.ts";
import { solve } from "../../src/solver/solve.ts";
import { AllSolProc } from "../../src/solutionProcessors/AllSolProc.ts";
import { StatProc } from "../../src/solutionProcessors/StatProc.ts";

Deno.test({
  name: "Test Brute Force Solver On EQ System",
  fn: () => {
    const a = 2;
    const b = 3;
    const sol = solve(equationSystemCSP(a, b), "bruteforce");
    assertEquals(sol, { "a": a, "b": b });
  },
});

Deno.test({
  name: "Test Brute Force Solver on 3-Queens Problem ",
  fn: () => {
    const n = 3;
    const sol = solve(nQueensProblemCSP(n), "bruteforce");
    assertEquals(null, sol);
  },
});
Deno.test({
  name: "Test Brute Force Solver on 6-Queens Problem ",
  fn: () => {
    const n = 6;
    const csp = nQueensProblemCSP(n);
    const sol = solve(csp, "bruteforce");
    if (sol) {
      assert(
        checkAllConstraints(
          sol,
          prepareConstraintsForEval(csp.variables, csp.constraints),
        ),
      );
    } else {
      assert(false);
    }
  },
});

Deno.test({
  name: "Test Brute Force Solver on 4-Queens Problem ",
  fn: () => {
    const n = 4;
    const sol = solve(nQueensProblemCSP(n), "bruteforce");
    assertArrayIncludes([{ "V1": 2, "V2": 4, "V3": 1, "V4": 3 }, {
      "V1": 3,
      "V2": 1,
      "V3": 4,
      "V4": 2,
    }], [sol]);
  },
});
Deno.test({
  name: "Test Brute Force Solver on 4-Queens Problem with All Solution",
  fn: () => {
    const n = 4;
    const solProc = new AllSolProc();
    const csp = nQueensProblemCSP(n);
    solve(csp, "bruteforce", solProc);
    if (solProc.allSolutions) {
      assert(solProc.allSolutions.size);
    } else {
      assert(false);
    }
  },
});
Deno.test({
  name: "Test Bruteforce Solver on 8-Queens Problem with Stats Solution",
  fn: () => {
    const n = 6;
    const csp = nQueensProblemCSP(n);
    const solProc = new StatProc(csp.variables, csp.values);
    solve(csp, "bruteforce", solProc);
    assertEquals(solProc.solutionCount, 4);
  },
});
