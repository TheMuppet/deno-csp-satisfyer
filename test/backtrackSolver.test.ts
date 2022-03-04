import { assert } from "../deps.ts";
import { nQueensProblemCSP } from "../src/example-CSPs/nQueensProblem.ts";
import { allSolProc } from "../src/solutionProcessors.ts";
import { isConsistent, solve } from "../src/solver/backtrackSolver.ts";
import { checkAllConstraints } from "../src/solver/bruteForceSolver.ts";
import { preprocess_csp } from "../src/utils.ts";
import { getCSPwithVars } from "../src/utils.ts";
import { prepare_constraints_for_eval } from "../src/utils.ts";

Deno.test({
  name: "Test Backtrack Solver on 8-Queens Problem ",
  fn: () => {
    const n = 8;
    const csp = nQueensProblemCSP(n);
    const sol = solve(csp);
    //console.log(sol);
    if (sol) {
      assert(
        checkAllConstraints(
          sol,
          prepare_constraints_for_eval(csp.variables, csp.constraints),
        ),
      );
    } else {
      assert(false);
    }
  },
});
Deno.test({
  name: "Test Backtrack Solver on 8-Queens Problem with All Solution",
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

Deno.test({
  name: "Test Is Consistent Positive",
  fn: () => {
    const cons = getCSPwithVars(nQueensProblemCSP(4)).constraints;
    const assignment = { "V1": 2, "V2": 4, "V3": 1 };
    const result = isConsistent("V4", 3, assignment, cons);
    assert(result);
  },
});

Deno.test({
  name: "Test Is Consistent Negativ",
  fn: () => {
    const cons = getCSPwithVars(nQueensProblemCSP(4)).constraints;
    const assignment = { "V1": 2 };
    const result = isConsistent("V2", 2, assignment, cons);
    assert(!result);
  },
});
