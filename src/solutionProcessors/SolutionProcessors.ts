import { Assignment } from "../solver/typesInterfaces.ts";
export type { SolutionProcessor };
interface SolutionProcessor {
  processSolution(assignment: Assignment): void;
}
