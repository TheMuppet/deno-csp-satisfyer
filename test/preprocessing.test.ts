import { assertEquals } from "../deps.ts";
import { prepare_constraints_for_eval } from "../src/utils.ts";

Deno.test({
  name: "Constraint variable to value",
  fn: () => {
    const constraints = prepare_constraints_for_eval(
      new Set(["A"]),
      new Set(["A = 1"]),
    );
    assertEquals(constraints, new Set(["assignment['A'] = 1"]));
  },
});

Deno.test({
  name: "Constraint variable to variable",
  fn: () => {
    const constraints = prepare_constraints_for_eval(
      new Set(["A", "B"]),
      new Set(["A = B"]),
    );
    assertEquals(constraints, new Set(["assignment['A'] = assignment['B']"]));
  },
});

Deno.test({
  name: "Constraint expression to variable",
  fn: () => {
    const constraints = prepare_constraints_for_eval(
      new Set(["A", "B"]),
      new Set(["A + B = 2"]),
    );
    assertEquals(
      constraints,
      new Set(["assignment['A'] + assignment['B'] = 2"]),
    );
  },
});

Deno.test({
  name: "Constraint variable to homonymous value",
  fn: () => {
    const constraints = prepare_constraints_for_eval(
      new Set(["A"]),
      new Set(["A = 'A'"]),
    );
    assertEquals(
      constraints,
      new Set(["assignment['A'] = 'A'"]),
    );
  },
});

Deno.test({
  name: "Constraint variable to homonymous function",
  fn: () => {
    const constraints = prepare_constraints_for_eval(
      new Set(["A"]),
      new Set(["A = A(x)"]),
    );
    assertEquals(
      constraints,
      new Set(["assignment['A'] = A(x)"]),
    );
  },
});

Deno.test({
  name: "Constraint multiple constraints",
  fn: () => {
    const constraints = new Set(["A = B", "A = 1", "A + B = C", "C = 2"]);
    const processed_constraints = prepare_constraints_for_eval(
      new Set(["A", "B", "C"]),
      constraints,
    );
    assertEquals(constraints.size, processed_constraints.size);
  },
});
Deno.test({
  name: "Constraint with overlapping Name",
  fn: () => {
    const constraints = prepare_constraints_for_eval(
      new Set(["A", "A10"]),
      new Set(["A = A10"]),
    );
    assertEquals(
      constraints,
      new Set(["assignment['A'] = assignment['A10']"]),
    );
  },
});
