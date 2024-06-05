import { validateAuthors, validateTitle } from "./validators";

type FormData = {
  title: string;
  authors: string[];
  contributors: string[];
  fields: string[];
  type: string;
  completion: string;
  feedback: string;
};

/**
 * TODO jsdoc when properly implemented
 */
export function validate(formData: FormData) {
  return (
    validateTitle(formData.title) === true &&
    validateAuthors(formData.authors) === true
  );
}

/**
 * TODO jsdoc when properly implemented
 */
export function submit(formData: FormData) {
  if (validate(formData)) {
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
  } else {
    alert("Something went wrong");
    return false;
  }
}
