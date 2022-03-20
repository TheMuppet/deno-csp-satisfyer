import { Assignment } from "../solver/types.ts";

export interface SolutionProcessor {
  processSolution(assignment: Assignment): void;
}
