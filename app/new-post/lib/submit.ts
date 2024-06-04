type FormData = {
  title: string;
  anonymous: boolean;
  authors: string[];
  contributors: string[];
  fields: string[];
  type: string;
  completion: string;
  feedback: string;
};

export function onSubmit(formData: FormData) {
  alert(
    "Title: " +
      formData.title +
      "\n" +
      "Authors: " +
      formData.authors.map((a) => a.toString()).toString() +
      "\n" +
      "Contributors: " +
      formData.contributors.map((a) => a.toString()).toString() +
      "\n" +
      "Fields: " +
      formData.fields.map((a) => a.toString()).toString() +
      "\n" +
      "Completion: " +
      formData.completion +
      "\n" +
      "Type: " +
      formData.type +
      "\n" +
      "Feedback: " +
      formData.feedback,
  );
  return true;
}
