import test from "ava";

import { createMediaQueries } from "..";

const dummyTransform = () => {};
const dummyStyle = () => ({});

test("Throw warning about exclusive media queries", t => {
  const dummyMediaQueries = createMediaQueries(dummyTransform);
  t.throws(function() {
    dummyMediaQueries(
      {
        mediaQueries: {
          "@media most": {},
          "@media small": {}
        }
      },
      dummyStyle
    );
  }, /mediaQueriesExclusive/);
});

test("Allow using multiple media queries after an explicit opt-in", t => {
  const dummyMediaQueries = createMediaQueries(dummyTransform);
  dummyMediaQueries(
    {
      mediaQueries: {
        "@media most": {},
        "@media small": {}
      },
      mediaQueriesExclusive: true
    },
    dummyStyle
  );
  t.pass();
});
