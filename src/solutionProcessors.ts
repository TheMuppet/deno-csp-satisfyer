export interface SolutionProcessor {
  processSolution(assignment: {[key: string]: number | string}): void;
}

export const allSolProc = {
  allSolutions: new Set(),
  processSolution: function (assignment: {[key: string]: number | string}) {
    this.allSolutions.add(assignment);
  },
};
