import {
  assert,
  bench,
  BenchmarkRunResult,
  runBenchmarks,
} from "../../deps.ts";
import { nQueensProblemCSPSet } from "../../src/example-CSPs/nQueensProblem.ts";
import {
  nQueensProblemCSPArray,
  nQueensProblemCSPMap,
} from "../../src/example-CSPs/nQueensProblem_array.ts";
import { solveBruteForceSet } from "../../src/solver/bruteForceSolver.ts";
import { solveBruteForceArray } from "../../src/solver/bruteForceSolver_array.ts";
import { solveBruteForceMap } from "../../src/solver/bruteForceSolver_map.ts";

const circle = 100;
const n = 6;
bench({
  name: "Test Speed Map",
  runs: circle,
  func(b: any): void {
    const csp = nQueensProblemCSPMap(n);
    b.start();
    const sol = solveBruteForceMap(csp);
    b.stop();
    console.log(sol);
  },
});
bench({
  name: "Test Speed Set",
  runs: circle,
  func(b: any): void {
    const csp = nQueensProblemCSPSet(n);
    b.start();
    const sol = solveBruteForceSet(csp);
    b.stop();
    console.log(sol);
  },
});
bench({
  name: "Test Speed Array",
  runs: circle,
  func(b: any): void {
    const csp = nQueensProblemCSPArray(n);
    b.start();
    const sol = solveBruteForceArray(csp);
    b.stop();
    console.log(sol);
  },
});

runBenchmarks().then((results: BenchmarkRunResult) => {
  console.log(results);
});
