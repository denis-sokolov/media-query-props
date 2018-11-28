import test from "ava";
import { check } from "typings-tester";

test("typings", t => {
  try {
    check(["./type-assertions/index.ts"], "tsconfig.json");
    t.pass();
  } catch (err) {
    t.fail(err.message);
  }
});
