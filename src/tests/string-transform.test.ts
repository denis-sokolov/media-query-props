import test from "ava";

import { createMediaQueries, MediaQueries } from "..";

test("has no problem with style function returning strings", t => {
  const mediaQueries = createMediaQueries<string, void>(strings => {
    t.deepEqual(strings, ["foo", { "@media small": "bar" }]);
  });
  mediaQueries<MediaQueries<{ value: string }>>(
    {
      value: "foo",
      mediaQueries: {
        "@media small": { value: "bar" }
      }
    },
    props => props.value
  );
});
