export interface SolutionProcessor {
  processSolution(assignment: assignment): void;
}

export const allSolProc = {
  allSolutions: new Set(),
  processSolution: function (assignment: assignment) {
    this.allSolutions.add(assignment);
  },
};
