
export type { t_assignment, CSP, CSPwithVars, SolutionProcessor }
type t_assignment = {
  [key: string]: number | string;
};


type CSP = {
  variables: Set<string>;
  values: Set<number | string>;
  constraints: Set<string>;
}

type CSPwithVars = {
  variables: Set<string>;
  values: Set<number | string>;
  constraints: Set<[string, Set<string>]>;
}

interface SolutionProcessor {
  processSolution(assignment: t_assignment): void;
}

export const allSolProc = {
  allSolutions: new Set(),
  processSolution: function (assignment: t_assignment) {
    this.allSolutions.add(assignment);
  },
};