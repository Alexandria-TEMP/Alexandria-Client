export type FormType = {
  branchTitle: string; // hihi mister title
  contributors: string[];
  anonymous: boolean;
  originalPostId: string;
  updatedTitle: string;
  updatedCompletionStatus: string;
  updatedFeedbackPreferences: string;
  updatedScientificFields: string[];
  newFile: File | null;
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
      anonymous: data.anonymous,
      collaboratingMemberIDs: data.contributors,
      projctPostID: data.originalPostId,
      branchTitle: data.branchTitle,
      updatedCompletionStatus: data.updatedCompletionStatus,
      updatedFeedbackPreferences: data.updatedFeedbackPreferences,
      updatedPostTitle: data.updatedTitle,
      updatedScientificFields: data.updatedScientificFields,
    });
    const fileData = new FormData();
    if (!data.newFile) throw new Error("Please submit a file");
    fileData.append("file", data.newFile);

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
