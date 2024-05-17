import { validateAuthors, validateTitle } from "./validators";

type createPostForm = {
  title: string;
  authors: Set<string>;
  contributors: Set<string>;
  fields: Set<string>;
  type: string;
  completion: string;
  feedback: string;
};

export function validate(formData: createPostForm) {
  return (
    validateTitle(formData.title) === true &&
    validateAuthors(formData.authors) === true
  );
}

export function submit(formData: createPostForm) {
  if (validate(formData)) {
    alert(
      "Title: " +
        formData.title +
        "\n" +
        "Authors: " +
        Array.from(formData.authors.keys()).map((a) => a.toString()) +
        "\n" +
        "Contributors: " +
        Array.from(formData.contributors.keys()).map((a) => a.toString()) +
        "\n" +
        "Fields: " +
        Array.from(formData.fields.keys()).map((a) => a.toString()) +
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
  } else {
    alert("Something went wrong");
    return false;
  }
}
