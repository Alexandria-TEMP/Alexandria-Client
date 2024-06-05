export type FormData = {
  email: string;
  password: string;
};

/**
 * TODO jsdoc when properly implemented
 */
export function onSubmit(data: FormData) {
  alert(data.email + ", " + data.password);
  return true;
}
