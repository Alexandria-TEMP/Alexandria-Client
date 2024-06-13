import { idT } from "@/lib/types/api-types";

export type FormType = {
  title: string;
  anonymous: boolean;
  authorMemberIDs: idT[];
  scientificFieldTagIDs: idT[];
  postType: string;
  projectCompletionStatus: string;
  projectFeedbackPreference: string;
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
      completionStatus: data.projectCompletionStatus,
      feedbackPreference: data.projectFeedbackPreference,
      postCreationForm: {
        anonymous: data.anonymous,
        authorMemberIDs: data.authorMemberIDs,
        postType: data.postType,
        scientificFieldTags: data.scientificFieldTagIDs,
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
