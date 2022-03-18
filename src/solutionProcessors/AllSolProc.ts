import { Assignment } from "../solver/typesInterfaces.ts";
import { SolutionProcessor } from "./SolutionProcessors.ts";
export { AllSolProc };

class AllSolProc implements SolutionProcessor {
  allSolutions: Set<Assignment> = new Set();
  processSolution(assignment: Assignment) {
    this.allSolutions.add(assignment);
  }
}
