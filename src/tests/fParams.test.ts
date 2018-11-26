import test from "ava";

import { createMediaQueries } from "..";

const dummyMediaQueries = createMediaQueries(() => {});

test("do not pass mediaQueries to f", t => {
  dummyMediaQueries({ mediaQueries: {} }, (props: any) => {
    t.false("mediaQueries" in props);
    return {};
  });
});
