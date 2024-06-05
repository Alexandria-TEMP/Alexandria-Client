export type FormType = {
  email: string;
  firstName: string;
  lastName: string;
  institution: string; // TODO might be nice to have some sort of list of institutions,
  fields: string[];
  password: string;
  confpass: string;
};

export const submitHandler = async (
  data: FormType,
  setIsLoading: (v: boolean) => void,
  onError: () => void,
) => {
  try {
    setIsLoading(true);
    const jsonData = JSON.stringify(data); // TODO remove the conf pass field

    // TODO the actual sending of the files, should be two, potentially 3, fetches
    await new Promise((resolve) => setTimeout(resolve, 300));

    // uncomment if you want to see the error
    // throw new Error("Please submit a file");

    setIsLoading(false);
    alert(jsonData);
  } catch (error) {
    setIsLoading(false);
    onError();
  }
};
