import { assert, assertEquals } from "../deps.ts";
import { t_assignment } from "../src/solver/assignment.ts";
import {
  applyUnaryCons,
  getValuesPerVar,
  propagate,
  splitUnaryCons,
} from "../src/solver/constraintPropagationSolver.ts";
import { CSP, CSPwithVars } from "../src/solver/CSP.ts";
import { arb_set, getCSPwithVars, preprocess_csp } from "../src/utils.ts";

const basicCSP: CSP = {
  variables: new Set(["A", "B", "C"]),
  values: new Set(["C", "D"]),
  constraints: new Set([
    "A == 'C'",
    "B == A",
    "A + B != C"
  ]),
};
const preprocessed_csp: CSP = preprocess_csp(basicCSP);
const cspVars: CSPwithVars = getCSPwithVars(preprocessed_csp);
Deno.test({
  name: "Test splitUnaryCons",
  fn: () => {
    const [unaryCons, otherCons] = splitUnaryCons(cspVars.constraints);
    assertEquals(arb_set(unaryCons)[0], "assignment['A'] == 'C'");
    const excpectedOtherCons = new Set([[ "assignment['B'] == assignment['A']", new Set (["B", "A"])],
    [ "assignment['A'] + assignment['B'] != assignment['C']", new Set(["A", "B", "C" ])]])
    assertEquals(otherCons, excpectedOtherCons)
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
    const [unaryCons, otherCons] = splitUnaryCons(cspVars.constraints);
    const valuesPerVarSolved = applyUnaryCons(unaryCons, valuesPerVar);
    assertEquals(valuesPerVarSolved["A"], new Set(["C"]));
    assertEquals(valuesPerVarSolved["B"], new Set(["C", "D"]));
  },
});

Deno.test({
  name: "Test Propagate",
  fn: () => {
    const valuesPerVar = getValuesPerVar(basicCSP);
    const [unaryCons, otherCons] = splitUnaryCons(cspVars.constraints);
    const valuesPerVarSolved = applyUnaryCons(unaryCons, valuesPerVar);
    const assignment: t_assignment = {};
    const newValues = propagate("A", "C", assignment, valuesPerVarSolved, otherCons);
    const expectedValues = { A: new Set(["C"]), B: new Set(["C"]), C: new Set(["C", "D"]) }
    console.log(propagate("A", "C", assignment, valuesPerVarSolved, otherCons));
    assertEquals(newValues, expectedValues)

    
  },
});
