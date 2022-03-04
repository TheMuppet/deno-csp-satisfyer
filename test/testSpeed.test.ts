const circle = 100000000;
Deno.test({
  name: "Test Speed Set",
  fn: () => {
    for (let i = 0; i < circle; i++) {
      const a = {
        "hans": "asd",
        "asd": "em",
        "peter": "a",
      };
      Object.keys(a);
      const c = new Set(["asd", "peter", "hans", "lol"]);
      Array.from(c).filter((val) => !(new Set(Object.keys(a)).has(val)));
    }
  },
});

Deno.test({
  name: "Test Speed Array",
  fn: () => {
    for (let i = 0; i < circle; i++) {
      const a = {
        "hans": "asd",
        "asd": "em",
        "peter": "a",
      };
      Object.keys(a);
      const c = new Set(["asd", "peter", "hans", "lol"]);
      Array.from(c).filter((val) => !(Object.keys(a).includes(val)));
    }
  },
});
