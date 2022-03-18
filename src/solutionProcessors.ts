import { Assignment, SolutionProcessor } from "./solver/typesInterfaces.ts";

export class AllSolProc implements SolutionProcessor {
  allSolutions: Set<Assignment> = new Set();
  processSolution(assignment: Assignment) {
    this.allSolutions.add(assignment);
  }
}
