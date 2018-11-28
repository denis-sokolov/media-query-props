import test from "ava";

import { createMediaQueries } from "..";

const dummyMediaQueries = createMediaQueries(() => {});

test("call the style function once without nested queries", t => {
  let count = 0;
  dummyMediaQueries({}, () => {
    count += 1;
    return {};
  });
  t.is(count, 1);
});

test("call the style function for every nested query", t => {
  let count = 0;
  dummyMediaQueries(
    {
      mediaQueries: { "@media foo": {}, "@media bar": {} },
      mediaQueriesExclusive: true
    },
    () => {
      count += 1;
      return {};
    }
  );
  t.is(count, 3);
});
