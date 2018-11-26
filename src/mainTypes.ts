export type ExtractMqProps<Mq extends MediaQueries> = NonNullable<
  Mq["mediaQueries"]
>[""];

export type MediaQueries<MqProps = {}> = MqProps & {
  mediaQueries?: { [query: string]: MqProps };
};

export type NestedCSSRules<CSSRules> = CSSRules & { [query: string]: CSSRules };
