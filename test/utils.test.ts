import { assertArrayIncludes, assertEquals } from "../deps.ts";
import { arbitrary, collectVariables } from "../src/utils.ts";

Deno.test({
  name: "arbitrary returns string from array",
  fn: () => {
    const z = arbitrary(["x", "y", "z"]);
    assertArrayIncludes(["x", "y", "z"], z);
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
// WIP Stupid bug
// Deno.test({
//   name:
//     "validate variables",
//   fn: () => {
//     let vars = new Set(['x', 'y'])
//     validateVariables(vars)

//     vars = new Set(['x]'])
//     try {
//       validateVariables(vars)
//     } catch {
//       assert(true)
//     }

//   },
// });
