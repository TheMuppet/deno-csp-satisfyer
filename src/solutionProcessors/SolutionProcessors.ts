import { Assignment } from "../solver/typesInterfaces.ts";

export interface SolutionProcessor {
  processSolution(assignment: Assignment): void;
}
