export type FormType = {
  title: string;
  anonymous: boolean;
  authors: string[];
  contributors: string[];
  fields: string[];
  type: string;
  completionStatus: string;
  feedbackPreference: string;
  file: File | null;
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
    const jsonData = JSON.stringify({
      completionStatus: data.completionStatus,
      feedbackPreference: data.feedbackPreference,
      postCreationForm: {
        anonymous: data.anonymous,
        authorMemberIDs: data.authors,
        postType: data.type,
        scientificFieldTags: data.fields,
        title: data.title,
      },
    });
    const fileData = new FormData();
    if (!data.file) throw new Error("Please submit a file");
    fileData.append("file", data.file);

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
