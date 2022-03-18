import { assert, assertArrayIncludes, assertEquals } from "../../deps.ts";
import {
  Constraint,
  ConstraintWithVars,
  Variable,
} from "../../src/solver/typesInterfaces.ts";
import {
  arbitrary,
  arbSet,
  collectVariables,
  getConstraintVariables,
  validateVariables,
} from "../../src/utils.ts";

Deno.test({
  name: "arbitrary returns string from array",
  fn: () => {
    const z = arbitrary(["x", "y", "z"]);
    assertArrayIncludes(["x", "y", "z"], z);
  },
});

Deno.test({
  name: "arbSet returns an element from a Set",
  fn: () => {
    const z = arbSet(new Set(["x", "y", "z"]));
    assertArrayIncludes(["x", "y", "z"], Array.from(z));
  },
});
Deno.test({
  name:
    "collect_vars returns list of correct vars in expression with logical operators",
  fn: () => {
    let vars = collectVariables("assignment['x'] ! assignment['y']");
    assertEquals(new Set(["x", "y"]), vars);

    vars = collectVariables("assignment['x'] && assignment['y']");
    assertEquals(new Set(["x", "y"]), vars);

    vars = collectVariables("assignment['x'] || assignment['y']");
    assertEquals(new Set(["x", "y"]), vars);
  },
});
Deno.test({
  name: "test get Constrained Variables",
  fn: () => {
    const cons: Set<Constraint> = new Set([
      "assignment['x'] && assignment['y']",
    ]);
    const consVars = getConstraintVariables(cons);
    const vars: Set<Variable> = new Set(["x", "y"]);
    const expectedResult: Set<ConstraintWithVars> = new Set([[
      "assignment['x'] && assignment['y']",
      vars,
    ]]);
    assertEquals(consVars, expectedResult);
  },
});
Deno.test({
  name: "validate variables",
  fn: () => {
    const vars = new Set(["x", "y"]);
    let errorThrown = false;
    try {
      validateVariables(vars);
    } catch {
      errorThrown = true;
    }
    assert(!errorThrown);
  },
});
Deno.test({
  name: "validate variables",
  fn: () => {
    const vars = new Set(["x]"]);
    let errorThrown = false;
    try {
      validateVariables(vars);
    } catch {
      errorThrown = true;
    }
    assert(errorThrown);
  },
});
