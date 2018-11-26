import { ExtractMqProps, MediaQueries } from "./mainTypes";

function filterUndefinedValues<T extends object>(input: T): T {
  const output: any = {};
  (Object.keys(input) as (keyof typeof input)[]).forEach(function(k) {
    const v = input[k];
    if (typeof v !== "undefined") output[k] = v;
  });
  return output;
}

export default function createMediaQueries<
  CSSRules extends object,
  Result = string
>(transformResult: (s: (CSSRules | { [k: string]: CSSRules })[]) => Result) {
  return function mediaQueries<Props extends MediaQueries>(
    props: Props,
    f: (t: ExtractMqProps<Props>) => CSSRules
  ): Result {
    const propsWithoutMq = { ...(props as any) };
    delete propsWithoutMq.mediaQueries;

    const result: (CSSRules | { [k: string]: CSSRules })[] = [
      f(propsWithoutMq)
    ];

    const mediaQueries = props.mediaQueries || {};
    Object.keys(mediaQueries).forEach(query => {
      result.push({
        [query]: f({
          ...(propsWithoutMq as object),
          ...filterUndefinedValues(mediaQueries[query])
        })
      });
    });

    return transformResult(result);
  };
}
