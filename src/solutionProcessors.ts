import { Assignment, SolutionProcessor } from "./solver/typesInterfaces.ts";
export { AllSolProc };
class AllSolProc implements SolutionProcessor {
  allSolutions: Set<Assignment> = new Set();
  processSolution(assignment: Assignment) {
    this.allSolutions.add(assignment);
  }
}
