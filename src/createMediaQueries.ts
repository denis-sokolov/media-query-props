import { ExtractMqProps, MediaQueries } from "./mainTypes";

function filterUndefinedValues<T extends object>(input: T): T {
  const output: any = {};
  (Object.keys(input) as (keyof typeof input)[]).forEach(function(k) {
    const v = input[k];
    if (typeof v !== "undefined") output[k] = v;
  });
  return output;
}

type Options = {
  validateMediaQuery?: (query: string) => boolean;
};

export default function createMediaQueries<CSSRules, Result = string>(
  transformResult: (
    styles: (CSSRules | { [mediaQuery: string]: CSSRules })[]
  ) => Result,
  options: Options = {}
) {
  const validateMediaQuery =
    options.validateMediaQuery || (query => query.startsWith("@media"));
  return function mediaQueries<Props extends MediaQueries>(
    props: Props,
    styleFunction: (t: ExtractMqProps<Props>) => CSSRules
  ): Result {
    const propsWithoutMq = { ...(props as any) };
    delete propsWithoutMq.mediaQueries;

    const result: (CSSRules | { [mediaQuery: string]: CSSRules })[] = [
      styleFunction(propsWithoutMq)
    ];

    const mediaQueries = props.mediaQueries || {};
    const queries = Object.keys(mediaQueries);

    if (queries.length > 1 && !props.mediaQueriesExclusive)
      throw new Error(
        "Unfortunately, media-query-props queries should be treated as exclusive. Add `mediaQueriesExclusive` prop to your component to acknowledge the warning. See the documentation for more details: https://github.com/denis-sokolov/media-query-props/blob/master/docs/ExclusiveQueries.md`"
      );

    queries.forEach(query => {
      if (!validateMediaQuery(query))
        throw new Error(`Invalid media query "${query}"`);
      result.push({
        [query]: styleFunction({
          ...(propsWithoutMq as object),
          ...filterUndefinedValues(mediaQueries[query])
        })
      });
    });

    return transformResult(result);
  };
}
