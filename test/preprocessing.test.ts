import { assertEquals } from "../deps.ts";
import { preprocess_constraints } from "../src/utils.ts";

Deno.test({
  name: "Preprocessing variable to value assignment",
  fn: () => {
    const constraints = preprocess_constraints(
      new Set(["A"]),
      new Set(["A = 1"]),
    );
    assertEquals(new Set(['assignment["A"] = 1']), constraints);
  },
});

Deno.test({
  name: "Preprocessing variable to variable assignment",
  fn: () => {
    const constraints = preprocess_constraints(
      new Set(["A", "B"]),
      new Set(["A = B"]),
    );
    assertEquals(new Set(['assignment["A"] = assignment["B"]']), constraints);
  },
});

Deno.test({
  name: "Preprocessing expression to variable assignment",
  fn: () => {
    const constraints = preprocess_constraints(
      new Set(["A", "B"]),
      new Set(["A + B = 2"]),
    );
    assertEquals(
      new Set(['assignment["A"] + assignment["B"] = 2']),
      constraints,
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
