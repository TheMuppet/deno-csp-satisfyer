export type {
  Assignment,
  Constraint,
  ConstraintWithVars,
  CSP,
  CSPwithVars,
  Value,
  ValuePerVars,
  Variable,
};

type Variable = string;
type Value = number | string;
type Constraint = string;

type Assignment = {
  [key: Variable]: Value;
};
type ValuePerVars = { [key: Variable]: Set<Value> };

type ConstraintWithVars = [Constraint, Set<Variable>];
type CSP = {
  variables: Set<Variable>;
  values: Set<Value>;
  constraints: Set<Constraint>;
};

type CSPwithVars = {
  variables: Set<Variable>;
  values: Set<Value>;
  constraints: Set<[Constraint, Set<string>]>;
};
