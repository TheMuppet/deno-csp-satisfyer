import { validateVariables } from "../utils.ts";
import { solveBacktrack } from "./backtrackSolver.ts";
import { solveBruteForce } from "./bruteForceSolver.ts";
import { solveConstraintPropagation } from "./constraintPropagationSolver.ts";
import { Assignment, CSP, SolutionProcessor } from "./typesInterfaces.ts";
export { solve };
const sovlerObj = {
  "bruteforce": solveBruteForce,
  "backtrack": solveBacktrack,
  "constraint-propagation": solveConstraintPropagation,
};

function solve(
  csp: CSP,
  solver: "bruteforce" | "backtrack" | "constraint-propagation" =
    "constraint-propagation",
  solutionProcessor?: SolutionProcessor,
): Assignment | null {
  validateVariables(csp.variables);
  return sovlerObj[solver](csp, solutionProcessor);
}
