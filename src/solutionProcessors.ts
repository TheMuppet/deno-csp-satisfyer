export interface SolutionProcessor {
  processSolution(assignment: {}): void;
}

export const allSolProc = {
  allSolutions: new Set(),
  processSolution: function (assignment: {}) {
    this.allSolutions.add(assignment);
  },
};
