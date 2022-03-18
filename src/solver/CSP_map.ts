import { Constraint, Value, Variable } from "./typesInterfaces.ts";

export type CSPMap = {
  variables: Map<Variable, null>;
  values: Map<Value, null>;
  constraints: Map<Constraint, null>;
};
