/**
 * This file contains validation rules which are present in multiple forms across the website, and which we might want to have easy access for changing
 * Stuff like error messages and whether fields are required are handled within each individual post.tsx page
 */

/* Maximum number of characters */
export const maxTitle = 150; // TODO decide how long we actually want this
export const maxName = 100;
export const maxInstitution = 150;

/* Password regex - min 8 characters, one lower case and one upper case letter, one number, and one special symbol */
export const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])/i;

/* Email regex, copied from NextUI page, could be better because it allows for "," instead of "." */
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{1,4}$/i;
