<div align="center">
    <img src="logo.png" alt="logo">
</div>

## About

Satisfyer is a Deno module that allows you to solve a so-called
[Constraint-Satisfaction-Problem](https://en.wikipedia.org/wiki/Constraint_satisfaction_problem)
(CSP). This module includes several solvers to fit your use case.

- Brute-Force-Solver
- Backtrack-Solver
- Constraint-Propagation-Solver

## Example

Import the solver function from `mod.ts` and define your problem using the CSP
type. A CSP is constructed using a dictionary with `variables`, `values` and
`constraints` as keys, and its corresponding values as a set of `strings`.
Values can also be defined as a set of `numbers`.\
The solver takes the CSP as a parameter and returns the solution.

### 8-Queens-Problem as CSP and calling the solver:

```ts
import {
  CSP,
  solve,
} from "https://github.com/TheMuppet/deno-CSP/blob/main/mod.ts";

//Defining variables, values and constraints using loops
const variables = new Set(Array.from({ length: 8 }, (_, i) => `V${i + 1}`));
const values = new Set(Array.from({ length: 8 }, (_, i) => i + 1));
const constraints = new Set<string>();
//adding constraints
for (let i = 1; i <= 8; i++) {
  for (let j = 1; j <= 8; j++) {
    if (i < j) {
      constraints.add(`V${i} != V${j}`);
      constraints.add(
        `Math.abs(V${j} - V${i}) != ${j - i}`,
      );
    }
  }
}

//The CSP
const csp: CSP = {
  variables: variables,
  values: values,
  constraints: constraints,
};

const solution = solve(csp);
```
