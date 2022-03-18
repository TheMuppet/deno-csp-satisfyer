export type Variable = string;
export type Value = number | string;
export type Constraint = string;

export type Assignment = {
  [key: Variable]: Value;
};
export type ValuePerVars = { [key: Variable]: Set<Value> };

export type ConstraintWithVars = [Constraint, Set<Variable>];
export type CSP = {
  variables: Set<Variable>;
  values: Set<Value>;
  constraints: Set<Constraint>;
};

export type CSPwithVars = {
  variables: Set<Variable>;
  values: Set<Value>;
  constraints: Set<[Constraint, Set<string>]>;
};
