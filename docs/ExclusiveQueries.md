# Exclusive queries

In CSS, media queries can overlap. For an example, `@media (min-width: 800px)` and `@media (min-width: 1000px)` both apply on screens wider than 1000px. At the time a component renders, however, we don’t know which of the queries will overlap. This means the component needs to generate styles for each media query independently.

In the example below, the intent is to show more pieces on the screen the bigger the screen is. Usually the code inside MyComponent computes the styles of individual visuel elements separately, and this code works as expected:

```tsx
<MyComponent
  showTitle
  mediaQueries={{
    "@media (min-width: 800px)": { showDescription: true },
    "@media (min-width: 1000px)": { showFooter: true }
  }}
/>;

const descriptionStyles = mediaQueries(props, ({ showDescription }) => ({
  display: showDescription ? "block" : "none"
}));
const footerStyles = mediaQueries(props, ({ showFooter }) => ({
  display: showFooter ? "block" : "none"
}));
const titleStyles = mediaQueries(props, ({ showTitle }) => ({
  display: showTitle ? "block" : "none"
}));
```

However, when computing values for an individual media query, we only have base props and props of that media query, not any prop values from other queries. Thus if the code performs more complex computation where the values of different props interact, this will work unexpectedly.

```tsx
mediaQueries(props, ({ showDescription, showFooter, showTitle }) => {
  // This will be called three times
  // 1. Base case with { showTitle: true }
  // 2. First media query with { showDescription: true, showTitle: true }
  // 3. Second media query with { showFooter: true, showTitle: true }
  // Never will all three props be true at the same time given the example call above
});
```

## Workaround

If the props are independent, nothing needs to be done.

If the props are dependent, repeat them inside of every query, even though media queries overlap:

```tsx
<MyComponent
  mediaQueries={{
    "@media (min-width: 600px)": { showTitle: true },
    "@media (min-width: 1000px)": { showTitle: true, titleColor: "red" }
  }}
/>
```

In either case, let the library know you are aware of this unfortunate limitation by adding a `mediaQueriesExclusive` prop when add more than one media query:

```tsx
<MyComponent
  mediaQueries={{
    "@media (min-width: 600px)": {},
    "@media (min-width: 1000px)": {}
  }}
  mediaQueriesExclusive
/>
```
