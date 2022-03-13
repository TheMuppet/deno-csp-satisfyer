import { assert, assertEquals } from "../deps.ts";
import { nQueensProblemCSP } from "../src/example-CSPs/nQueensProblem.ts";
import { checkAllConstraints } from "../src/solver/bruteForceSolver.ts";
import {
  applyUnaryCons,
  getValuesPerVar,
  mostConstraintedVariable,
  propagate,
  solveConstraintPropagation,
  splitUnaryCons,
} from "../src/solver/constraintPropagationSolver.ts";
import { Assignment, CSP, CSPwithVars } from "../src/solver/typesInterfaces.ts";
import { AllSolProc } from "../src/solutionProcessors.ts";
import {
  arbSet,
  getCSPwithVars,
  prepareConstraintsForEval,
  preprocessCsp,
} from "../src/utils.ts";

const basicCSP: CSP = {
  variables: new Set(["A", "B", "C"]),
  values: new Set(["C", "D"]),
  constraints: new Set([
    "A == 'C'",
    "B == A",
    "A + B != C",
  ]),
};
const preprocessed_csp: CSP = preprocessCsp(basicCSP);
const cspVars: CSPwithVars = getCSPwithVars(preprocessed_csp);
Deno.test({
  name: "Test splitUnaryCons",
  fn: () => {
    const [unaryCons, otherCons] = splitUnaryCons(cspVars.constraints);
    assertEquals(arbSet(unaryCons)[0], "assignment['A'] == 'C'");
    const excpectedOtherCons = new Set([[
      "assignment['B'] == assignment['A']",
      new Set(["B", "A"]),
    ], [
      "assignment['A'] + assignment['B'] != assignment['C']",
      new Set(["A", "B", "C"]),
    ]]);
    assertEquals(otherCons, excpectedOtherCons);
  },
});
Deno.test({
  name: "Test getValuesPerVar",
  fn: () => {
    const valuesPerVar = getValuesPerVar(basicCSP);
    assertEquals(valuesPerVar["A"], new Set(["C", "D"]));
    assertEquals(valuesPerVar["B"], new Set(["C", "D"]));
  },
});

Deno.test({
  name: "Test Solve Unarys",
  fn: () => {
    const valuesPerVar = getValuesPerVar(basicCSP);
    const unaryCons = splitUnaryCons(cspVars.constraints)[0];
    const valuesPerVarSolved = applyUnaryCons(unaryCons, valuesPerVar);
    assertEquals(valuesPerVarSolved["A"], new Set(["C"]));
    assertEquals(valuesPerVarSolved["B"], new Set(["C", "D"]));
  },
});
Deno.test({
  name: "Test Most Constrainted Varialbe",
  fn: () => {
    const valuesPerVar = getValuesPerVar(basicCSP);
    const unaryCons = splitUnaryCons(cspVars.constraints)[0];
    const valuesPerVarSolved = applyUnaryCons(unaryCons, valuesPerVar);
    const unassignedVars = new Set(["C", "B"]);
    const mCV = mostConstraintedVariable(unassignedVars, valuesPerVarSolved);
    assertEquals(mCV, "C");
  },
});

Deno.test({
  name: "Test Propagate",
  fn: () => {
    const valuesPerVar = getValuesPerVar(basicCSP);
    const [unaryCons, otherCons] = splitUnaryCons(cspVars.constraints);
    const valuesPerVarSolved = applyUnaryCons(unaryCons, valuesPerVar);
    const assignment: Assignment = {};
    const newValues = propagate(
      "A",
      "C",
      assignment,
      valuesPerVarSolved,
      otherCons,
    );
    const expectedValues = {
      A: new Set(["C"]),
      B: new Set(["C"]),
      C: new Set(["C", "D"]),
    };
    console.log(propagate("A", "C", assignment, valuesPerVarSolved, otherCons));
    assertEquals(newValues, expectedValues);
  },
});

Deno.test({
  name: "Test CP-Solver Solver on 8-Queens Problem ",
  fn: () => {
    const n = 8;
    const csp = nQueensProblemCSP(n);
    const sol = solveConstraintPropagation(csp);
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
  name: "Test CP-Solver Solver on 8-Queens Problem with All Solution",
  fn: () => {
    const n = 8;
    const solProc = new AllSolProc();
    const csp = nQueensProblemCSP(n);
    solveConstraintPropagation(csp, solProc);
    if (solProc.allSolutions) {
      assertEquals(solProc.allSolutions.size, 92);
    } else {
      assert(false);
    }
  },
});
