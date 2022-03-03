export interface CSP {
  variables: Set<string>;
  values: Set<number | string>;
  constraints: Set<string>;
}

export interface CSPwithVars {
  variables: Set<string>;
  values: Set<number | string>;
  constraints: Set<[string, Set<string>]>;
}
