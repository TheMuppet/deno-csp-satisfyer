import {
  bench,
  BenchmarkDefinition,
  BenchmarkFunction,
  BenchmarkRunResult,
  runBenchmarks,
} from "../../../deps.ts";

const circle = 1000000;

const text = "abcdefghijklmnopqrstuvwxyz";
const chars = [...text];
const testdepth = 4;
"";

function fillTestObj(
  depht: number,
  s: string,
  testObj: { [key: string]: string },
) {
  testObj[s] = s;
  if (depht == 0) {
    return;
  }

  chars.forEach(function (char) {
    fillTestObj(depht - 1, s + char, testObj);
  });
}
const testObj: { [key: string]: string } = {};
fillTestObj(testdepth, "", testObj);
console.log("testObj created");
const aset = new Set(Object.keys(testObj));
const amap = new Map(Object.entries(testObj));
const aarray = Object.keys(testObj);
const testv = "zzzz";

bench({
  name: "Test Speed Map",
  runs: circle,
  func(b: any): void {
    b.start();
    amap.has(testv);
    b.stop();
  },
});
bench({
  name: "Test Speed Set",
  runs: circle,
  func(b: any): void {
    b.start();
    aset.has(testv);
    b.stop();
  },
});
bench({
  name: "Test Speed Array",
  runs: circle,
  func(b: any): void {
    b.start();
    aarray.includes(testv);
    b.stop();
  },
});

runBenchmarks().then((results: BenchmarkRunResult) => {
  console.log(results);
});
