import { Assignment, Value, Variable } from "../solver/typesInterfaces.ts";
import { SolutionProcessor } from "./SolutionProcessors.ts";
export { StatProc };
class StatProc implements SolutionProcessor {
  allSolutionsCount: { [key: Variable]: { [key: Value]: number } } = {};
  solutionCount: number;

  constructor(variables: Set<Variable>, values: Set<Value>) {
    this.solutionCount = 0;
    for (const variable of variables) {
      const obj: { [key: Value]: number } = {};
      for (const value of values) {
        obj[value] = 0;
      }
      this.allSolutionsCount[variable] = obj;
    }
  }
  processSolution(assignment: Assignment): void {
    this.solutionCount++;
    Object.keys(assignment).forEach((variable) => {
      this.allSolutionsCount[variable][assignment[variable]]++;
    });
  }
  calcPercentage(): { [key: Variable]: { [key: Value]: number } } {
    const count: number = this.solutionCount;
    const percentageObject: { [key: Variable]: { [key: Value]: number } } = {
      ...this.allSolutionsCount,
    };
    Object.keys(this.allSolutionsCount).forEach(function (variable) {
      Object.keys(variable).forEach(function (values) {
        percentageObject[variable][values] =
          percentageObject[variable][values] / count;
      });
    });
    return percentageObject;
  }
}
