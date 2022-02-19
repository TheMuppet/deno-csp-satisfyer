import { tassignment } from "./solver/assignment.ts";
export interface SolutionProcessor {
  processSolution(assignment: tassignment): void;
}

export const allSolProc = {
  allSolutions: new Set(),
  processSolution: function (assignment: tassignment) {
    this.allSolutions.add(assignment);
  },
};
