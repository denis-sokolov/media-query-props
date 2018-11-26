# Media query props

Customize the props you pass with the full power of native CSS media queries.

No higher-order components, no run-time resize events, full power of arbitrary media queries, fully type-checked.

```jsx
<MyComponent
  title="Hi, John"
  titlePosition="left"
  mediaQueries={{
    "@media (max-width: 700px)": {
      titlePosition="on-top"
    }
  }}
  >
```

## Usage

After the initial configuration described below, use this module when authoring your components. Decide which props you want to allow to customize by media queries and wrap them in the MediaQueries type. The values of these props are not limited to any css values.

```ts
import { MediaQueries } from "lib/my-media-queries";
type MyProps = {
  title: string;
} & MediaQueries<{
  titlePosition: "left" | "on-top";
}>;
```

Use these props when rendering your component using your mediaQueries helper function. It takes all props of the component and calls your callback multiple times, once for the main props and once for every passed in media query.

```tsx
import { mediaQueries } from "lib/my-media-queries";
const titleClass = mediaQueries(this.props, function(props) {
  return props.titlePosition === "on-top"
    ? {
        position: "absolute",
        bottom: 5
      }
    : {
        textAlign: "left"
      };
});
return (
  <div>
    <h1 className={titleClass}>{title}</h1>
  </div>
);
```

If your component props are defined as a union of multiple other components, each of which has its own mediaQueries, you need to add a special type to correctly merge mediaQueries prop:

```tsx
// Will not merge mediaQueries prop correctly
type Props = PropsA & PropsB;

// Will merge mediaQueries prop correctly
import { FixMerge } from "media-query-props";
type Props = FixMerge<PropsA, PropsB>;
```

## Add to your project

The package is available [on npm as `media-query-props`](https://www.npmjs.com/package/media-query-props).

Configure it for your CSS tooling by calling the factory function with a type parameter describing what your callback functions are supposed to return, and a function parameter transforming a list of nested style objects into a single result, most likely a class name you will apply to elements.

For an example, here is how I configure it to use with Emotion.

```ts
import { createMediaQueries } from "media-query-props";
import { CSSObject } from "create-emotion";
import { css } from "emotion";
export const mediaQueries = createMediaQueriesFunction<CSSObject>(css);
export { MediaQueries, FixMerge } from "./media-query-props";
```
