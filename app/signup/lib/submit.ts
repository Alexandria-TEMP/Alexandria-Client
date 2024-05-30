export type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  institution: string; // TODO might be nice to have some sort of list of institutions,
  fields: string[];
  password: string;
};

// : SubmitHandler<FormType>
export const submit = (data: FormData) => {
  alert(
    "Email: " +
      data.email +
      "\n" +
      "First Name: " +
      data.firstName +
      "\n" +
      "Last Name: " +
      data.lastName +
      "\n" +
      "Institution: " +
      data.institution +
      "\n" +
      "Password: " +
      data.password,
  );
  return true;
};
