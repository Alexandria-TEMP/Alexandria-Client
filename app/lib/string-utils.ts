/**
 * Capitalizes the first letter of a string, keeping the rest of
 * the string unchanged. Never throws an error.
 *
 * @export
 * @param str string to be capitalized
 * @returns capitalized string
 */
export function capitalizeFirstLetter(str: string) {
  if (str.length <= 1) {
    return str.toUpperCase();
  }
  return str[0].toUpperCase() + str.slice(1);
}
