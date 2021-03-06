import { Assignment } from "../solver/types.ts";
import { SolutionProcessor } from "./SolutionProcessors.ts";

export class AllSolProc implements SolutionProcessor {
  allSolutions: Set<Assignment> = new Set();
  processSolution(assignment: Assignment) {
    this.allSolutions.add(assignment);
  }
}
