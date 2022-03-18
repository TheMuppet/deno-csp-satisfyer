import { SolutionProcessor } from "../solutionProcessors/SolutionProcessors.ts";
import { validateVariables } from "../utils.ts";
import { solveBacktrack } from "./backtrackSolver.ts";
import { solveBruteForce } from "./bruteForceSolver.ts";
import { solveConstraintPropagation } from "./constraintPropagationSolver.ts";
import { Assignment, CSP } from "./typesInterfaces.ts";
const sovlerObj = {
  "bruteforce": solveBruteForce,
  "backtrack": solveBacktrack,
  "constraint-propagation": solveConstraintPropagation,
};

export function solve(
  csp: CSP,
  solver: "bruteforce" | "backtrack" | "constraint-propagation" =
    "constraint-propagation",
  solutionProcessor?: SolutionProcessor,
): Assignment | null {
  validateVariables(csp.variables);
  return sovlerObj[solver](csp, solutionProcessor);
}
