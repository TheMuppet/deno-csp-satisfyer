export type Assignment = {
  [key: string]: number | string;
};
export type Variable = string;
export type Value = number | string;
export type Constraint = string;

export type ValuePerVars = { [key: Variable]: Set<Value> };

export type ConstraintWithVars = [Constraint, Set<Variable>];
export type CSP = {
  variables: Set<Variable>;
  values: Set<Value>;
  constraints: Set<Constraint>;
};

export type CSPwithVars = {
  variables: Set<string>;
  values: Set<number | string>;
  constraints: Set<[string, Set<string>]>;
};

export interface SolutionProcessor {
  processSolution(assignment: Assignment): void;
}
