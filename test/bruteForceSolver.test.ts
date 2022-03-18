import { solveBruteForce } from "../src/solver/bruteForceSolver.ts";
import { assert, assertArrayIncludes, assertEquals } from "../deps.ts";
import { nQueensProblemCSP } from "../example-CSPs/nQueensProblem.ts";
import { checkAllConstraints } from "../src/solver/bruteForceSolver.ts";
import { AllSolProc } from "../src/solutionProcessors.ts";
import { prepareConstraintsForEval } from "../src/utils.ts";
Deno.test({
  name: "Test Brute Force Solver on 3-Queens Problem ",
  fn: () => {
    const n = 3;
    const sol = solveBruteForce(nQueensProblemCSP(n));
    assertEquals(null, sol);
  },
});
Deno.test({
  name: "Test Brute Force Solver on 6-Queens Problem ",
  fn: () => {
    const n = 6;
    const csp = nQueensProblemCSP(n);
    const sol = solveBruteForce(csp);
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
    const sol = solveBruteForce(nQueensProblemCSP(n));
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
    solveBruteForce(csp, solProc);
    if (solProc.allSolutions) {
      assert(solProc.allSolutions.size);
    } else {
      assert(false);
    }
  },
});
