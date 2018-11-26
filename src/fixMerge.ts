export type FixMerge<ObjectUnion> = {
  [K in keyof ObjectUnion]: ObjectUnion[K] extends {}
    ? FixMerge<ObjectUnion[K]>
    : ObjectUnion[K]
};
