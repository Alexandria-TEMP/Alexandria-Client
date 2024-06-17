import { idT } from "./types/api-types";

/**
 * Capitalizes the first letter of a string, keeping the rest of
 * the string unchanged. Never throws an error.
 * @param str string to be capitalized
 * @returns capitalized string
 */
export function capitalizeFirstLetter(str: string) {
  if (str.length <= 1) {
    return str.toUpperCase();
  }
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Converts ID from string to idT. Throws exception if string is not a valid idT.
 * @param idStr ID in string format
 * @returns ID in idT format
 */
export function idStringToIDT(idStr: string): idT {
  const id = Number(idStr);
  if (isNaN(id)) throw Error(`id ${idStr} is NaN`);
  return id;
}

/**
 * @param date any string representation of a date
 * @returns [toLocaleDateString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)
 *          representation of date
 */
export function formatDateString(date: string): string {
  return new Date(date).toLocaleDateString();
}
