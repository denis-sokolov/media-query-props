import test from "ava";

import { createMediaQueries } from "..";

const dummyMediaQueries = createMediaQueries(() => {});

test("call the mediaQuery function once without nested queries", t => {
  let count = 0;
  dummyMediaQueries({}, () => {
    count += 1;
    return {};
  });
  t.is(count, 1);
});

test("call the mediaQuery function for every nested query", t => {
  let count = 0;
  dummyMediaQueries({ mediaQueries: { foo: {}, bar: {} } }, () => {
    count += 1;
    return {};
  });
  t.is(count, 3);
});
