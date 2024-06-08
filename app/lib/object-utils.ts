export type NestedObjectT<ValueT> = {
  [key: string]: NestedObjectT<ValueT> | ValueT;
};

/**
 * Gets a value from a deeply nested object by following
 * the given path of keys
 * @param object object to find value in
 * @param path array of keys: `["a", "b"]` accesses `object["a"]["b"]`
 * @returns the value found after following the path, or
 *          undefined if the path does not exist in the object
 */
export function getNestedValue<ValueT>(
  object: NestedObjectT<ValueT>,
  path: string[],
): NestedObjectT<ValueT> | ValueT | undefined {
  let previousLevel = object;

  for (let i = 0; i < path.length; i++) {
    const currentLevel = previousLevel[path[i]];
    if (!currentLevel) return undefined;

    previousLevel = currentLevel;
  }

  return previousLevel;
}
