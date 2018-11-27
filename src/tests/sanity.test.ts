import test from "ava";

import { createMediaQueries, MediaQueries } from "..";

function compute<Props extends object>(
  props: Props,
  styleFunction: (props: MediaQueries<Props>) => object,
  transform: (styles: any[]) => any
): Promise<unknown> {
  return new Promise(resolve => {
    const mediaQueries = createMediaQueries(list => resolve(transform(list)));
    mediaQueries(props, styleFunction as any);
  });
}

function showDisplay(props: { show: boolean }) {
  return { display: props.show ? "block" : "none" };
}

function merge(styles: any[]): object {
  const result: any = {};
  styles.forEach(k => Object.assign(result, k));
  return result;
}

[
  { input: { show: true }, expected: { display: "block" } },
  { input: { show: false }, expected: { display: "none" } },
  {
    name: "simple nested",
    input: { show: true, mediaQueries: { "@media small": { show: false } } },
    expected: { display: "block", "@media small": { display: "none" } }
  },
  {
    name: "missing nested prop",
    input: { show: true, mediaQueries: { "@media small": {} } },
    expected: { display: "block", "@media small": { display: "block" } }
  },
  {
    name: "undefined nested prop",
    input: {
      show: true,
      mediaQueries: { "@media small": { show: undefined } }
    },
    expected: { display: "block", "@media small": { display: "block" } }
  }
].forEach(function({ expected, input, name }, i) {
  test(name || `sanity row ${i}`, async t => {
    t.deepEqual(await compute(input, showDisplay, merge), expected);
  });
});
