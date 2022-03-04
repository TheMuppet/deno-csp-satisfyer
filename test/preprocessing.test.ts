import { assertEquals } from "../deps.ts";
import { preprocess_constraints } from "../src/utils.ts";

Deno.test({
  name: "Preprocessing variable to value",
  fn: () => {
    const constraints = preprocess_constraints(
      new Set(["A"]),
      new Set(["A = 1"]),
    );
    assertEquals(constraints, new Set(["assignment['A'] = 1"]));
  },
});

Deno.test({
  name: "Preprocessing variable to variable",
  fn: () => {
    const constraints = preprocess_constraints(
      new Set(["A", "B"]),
      new Set(["A = B"]),
    );
    assertEquals(constraints, new Set(["assignment['A'] = assignment['B']"]));
  },
});

Deno.test({
  name: "Preprocessing expression to variable",
  fn: () => {
    const constraints = preprocess_constraints(
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
  name: "Preprocessing variable to homonymous value",
  fn: () => {
    const constraints = preprocess_constraints(
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
  name: "Preprocessing variable to homonymous function",
  fn: () => {
    const constraints = preprocess_constraints(
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
  name: "Preprocessing multiple constraints",
  fn: () => {
    const constraints = new Set(["A = B", "A = 1", "A + B = C", "C = 2"]);
    const processed_constraints = preprocess_constraints(
      new Set(["A", "B", "C"]),
      constraints,
    );
    assertEquals(constraints.size, processed_constraints.size);
  },
});
