import { t_assignment } from "./solver/assignment.ts";
export interface SolutionProcessor {
  processSolution(assignment: t_assignment): void;
}

export const allSolProc = {
  allSolutions: new Set(),
  processSolution: function (assignment: t_assignment) {
    this.allSolutions.add(assignment);
  },
};
