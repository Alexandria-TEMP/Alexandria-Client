export type FormType = {
  email: string;
  password: string;
};

/**
 * TODO jsdoc when properly implemented
 */
export const submitHandler = async (
  data: FormType,
  setIsLoading: (v: boolean) => void,
  onError: () => void,
) => {
  try {
    setIsLoading(true);
    // TODO hash password?
    const jsonData = JSON.stringify(data);
    // TODO the actual sending of the form, should be a fetch and potentially storing cookie
    // in this case we might want to have custom error messages (if the account exists or the password was incorrect)
    // but ill burn that bridge when i get to it
    await new Promise((resolve) => setTimeout(resolve, 400));

    // uncomment if you want to see the error
    // throw new Error("Please submit a file");

    setIsLoading(false);
    alert(jsonData);
  } catch (error) {
    setIsLoading(false);
    onError();
  }
};
