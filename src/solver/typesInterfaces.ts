export type {
  Assignment,
  Constraint,
  ConstraintWithVars,
  CSP,
  CSPwithVars,
  SolutionProcessor,
  Value,
  ValuePerVars,
  Variable,
};
type Assignment = {
  [key: string]: number | string;
};
type Variable = string;
type Value = number | string;
type Constraint = string;

type ValuePerVars = { [key: Variable]: Set<Value> };

type ConstraintWithVars = [Constraint, Set<Variable>];
type CSP = {
  variables: Set<Variable>;
  values: Set<Value>;
  constraints: Set<Constraint>;
};

type CSPwithVars = {
  variables: Set<string>;
  values: Set<number | string>;
  constraints: Set<[string, Set<string>]>;
};

interface SolutionProcessor {
  processSolution(assignment: Assignment): void;
}
