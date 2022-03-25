<div align="center">
    <img src="https://github.com/TheMuppet/deno-csp-satisfyer/blob/db41054790bc91c1904e00f87aa7ac84fcb7d5b4/logo.png" alt="logo">
</div>

---

<div align='center'>
    <a href="https://github.com/TheMuppet/deno-csp-satisfyer/releases">
    <img src="https://img.shields.io/github/v/release/TheMuppet/deno-csp-satisfyer.svg" />
  </a>
  <a href="https://github.com/TheMuppet/deno-csp-satisfyer/blob/ef60252f21f42963075d8ae6eb32d36ac3018250/LICENSE">
    <img src="https://img.shields.io/badge/License-GPLv3-blue.svg" />
  </a>
</div>
<div align='center'>
    <a href="https://github.com/TheMuppet/deno-csp-satisfyer/actions">
    <img src="https://github.com/TheMuppet/deno-csp-satisfyer/actions/workflows/deno.yml/badge.svg" />
  </a>
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
type. The solver takes a CSP and optionally a solver of your choice as
parameters, by default the constraint-propagation method will be used. A CSP is
constructed using a dictionary with `variables`, `values` and `constraints` as
keys, and its corresponding values as a set of `strings`. Values can also be
defined as a set of `numbers`.\
The solver takes the CSP as a parameter and returns the solution.

### 8-Queens-Problem as CSP and calling the solver:

```ts
import { CSP, solve } from "https://deno.land/x/satisfyer/mod.ts";

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

// const solution = solve(csp);
const solution = solve(csp, "bruteforce");
console.log(solution);
```
