import { createMediaQueries, MediaQueries } from "../src";

// typings:expect-error
createMediaQueries();

type CSS = { display?: "block" | "none" };
const mediaQueries = createMediaQueries<CSS>(function(list) {
  return list.join("");
});

type Props = {
  title: string;
} & MediaQueries<{
  showTitle: boolean;
}>;

function Sample(props: Props) {
  // typings:expect-error
  mediaQueries(props, function(mqProps) {
    mqProps.showTitle;
  });

  mediaQueries(props, function(mqProps) {
    // typings:expect-error
    mqProps.title;

    // typings:expect-error
    const a: number = mqProps.showTitle;

    return {
      display: a > 2 ? "block" : "none"
    };
  });

  mediaQueries(props, function() {
    return {
      display: "block"
    };
  });
}

// typings:expect-error
Sample({ title: "Hi" });

// typings:expect-error
Sample({ title: "Hi", showTitle: 12 });

Sample({ title: "Hi", showTitle: true });

// typings:expect-error
Sample({ title: "Hi", showTitle: true, mediaQueries: { showTitle: false } });

// typings:expect-error
Sample({
  title: "Hi",
  showTitle: true,
  mediaQueries: { foo: {} }
});

// typings:expect-error
Sample({
  title: "Hi",
  showTitle: true,
  mediaQueries: { foo: { showTitle: 12 } }
});

Sample({
  title: "Hi",
  showTitle: true,
  mediaQueries: { foo: { showTitle: false } }
});
