import { createMediaQueries } from "../src";

createMediaQueries<string>(function(list) {
  return list.join("");
});
