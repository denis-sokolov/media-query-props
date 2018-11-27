import test from "ava";
import { check } from "typings-tester";

test("typings", t => {
  try {
    check(["./src/tests/type-failures.js"], "tsconfig.json");
    t.pass();
  } catch (err) {
    t.fail(err.message);
  }
});
