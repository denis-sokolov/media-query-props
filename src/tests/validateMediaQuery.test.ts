import test from "ava";

import { createMediaQueries } from "..";

const dummyTransform = () => {};
const dummyStyle = () => ({});
const propsWithNestedSelector = { mediaQueries: { "& div": {} } };

test("forbid non-media queries", t => {
  const dummyMediaQueries = createMediaQueries(dummyTransform);
  t.throws(function() {
    dummyMediaQueries(propsWithNestedSelector, dummyStyle);
  });
});

test("allow to customize validation rule", t => {
  const dummyMediaQueries = createMediaQueries(dummyTransform, {
    validateMediaQuery: () => true
  });
  t.notThrows(function() {
    dummyMediaQueries(propsWithNestedSelector, dummyStyle);
  });
});
