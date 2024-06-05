import { idType } from "./types/api-types";

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
 * Converts ID from string to idType. Throws exception if string is not an ID.
 * @param idStr ID in string format
 * @returns ID in idType format
 */
export function parseId(idStr: string): idType {
  const id = Number(idStr);
  if (isNaN(id)) throw Error(`id ${idStr} is NaN`);
  return id;
}
