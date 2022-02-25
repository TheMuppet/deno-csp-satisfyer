import { solve as solve_array } from "../src/solver/bruteForceSolver_array.ts";
import { solve as solve_set} from "../src/solver/bruteForceSolver_set.ts";
import { assert, assertArrayIncludes, assertEquals } from "../deps.ts";
import { nQueensProblemCSP as CSP_set} from "../src/example-CSPs/nQueensProblem_set.ts";
import { nQueensProblemCSP as CSP_array } from "../src/example-CSPs/nQueensProblem_array.ts";
import { checkAllConstraints as checkConstraints_set } from "../src/solver/bruteForceSolver_set.ts";
import { checkAllConstraints as checkConstraints_array } from "../src/solver/bruteForceSolver_array.ts";

Deno.test({
  name: "Test Brute Force Solver (set) on 3-Queens Problem ",
  fn: () => {
    const n = 3;
    const sol = solve_set(CSP_set(n));
    assertEquals(null, sol);
  },
});

Deno.test({
  name: "Test Brute Force Solver (set) on 4-Queens Problem ",
  fn: () => {
    const n = 4;
    const sol = solve_set(CSP_set(n));
    assertArrayIncludes([{ "V1": 2, "V2": 4, "V3": 1, "V4": 3 }, {
      "V1": 3,
      "V2": 1,
      "V3": 4,
      "V4": 2,
    }], [sol]);
  },
});

Deno.test({
  name: "Test Brute Force Solver (set) on 6-Queens Problem ",
  fn: () => {
    const n = 6;
    const csp = CSP_set(n);
    const sol = solve_set(csp);
    if (sol) {
      assert(checkConstraints_set(sol, csp.constraints));
    } else {
      assert(false);
    }
  },
});

Deno.test({
  name: "Test Brute Force Solver (set) on 8-Queens Problem ",
  fn: () => {
    const n = 8;
    const csp = CSP_set(n);
    const sol = solve_set(csp);
    if (sol) {
      assert(checkConstraints_set(sol, csp.constraints));
    } else {
      assert(false);
    }
  },
});

Deno.test({
  name: "Test Brute Force Solver (array) on 3-Queens Problem ",
  fn: () => {
    const n = 3;
    const sol = solve_array(CSP_array(n));
    assertEquals(null, sol);
  },
});

Deno.test({
  name: "Test Brute Force Solver (array) on 4-Queens Problem ",
  fn: () => {
    const n = 4;
    const sol = solve_array(CSP_array(n));
    assertArrayIncludes([{ "V1": 2, "V2": 4, "V3": 1, "V4": 3 }, {
      "V1": 3,
      "V2": 1,
      "V3": 4,
      "V4": 2,
    }], [sol]);
  },
});

Deno.test({
  name: "Test Brute Force Solver (array) on 6-Queens Problem ",
  fn: () => {
    const n = 6;
    const csp = CSP_array(n);
    const sol = solve_array(csp);
    if (sol) {
      assert(checkConstraints_array(sol, csp.constraints));
    } else {
      assert(false);
    }
  },
});

Deno.test({
  name: "Test Brute Force Solver (array) on 8-Queens Problem ",
  fn: () => {
    const n = 8;
    const csp = CSP_array(n);
    const sol = solve_array(csp);
    if (sol) {
      assert(checkConstraints_array(sol, csp.constraints));
    } else {
      assert(false);
    }
  },
});