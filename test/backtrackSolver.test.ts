import { assert } from "../deps.ts";
import { nQueensProblemCSP } from "../src/example-CSPs/nQueensProblem.ts";
import { allSolProc } from "../src/solutionProcessors.ts";
import { solve } from "../src/solver/backtrackSolver.ts";
import { checkAllConstraints } from "../src/solver/bruteForceSolver.ts";

Deno.test({
  name: "Test Brute Force Solver on 8-Queens Problem ",
  fn: () => {
    const n = 8;
    const csp = nQueensProblemCSP(n);
    const sol = solve(csp);
    //console.log(sol);
    if (sol) {
      assert(checkAllConstraints(sol, csp.constraints));
    } else {
      assert(false);
    }
  },
});
Deno.test({
  name: "Test Brute Force Solver on 8-Queens Problem with All Solution",
  fn: () => {
    const n = 8;
    const solProc = allSolProc;
    const csp = nQueensProblemCSP(n);
    solve(csp, solProc);
    //console.log(solProc.allSolutions)
    if (solProc.allSolutions) {
      assert(solProc.allSolutions.size == 92);
    } else {
      assert(false);
    }
  },
});
