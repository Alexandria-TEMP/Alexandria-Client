import { postBranchesIdUpload } from "@/lib/api-calls/branch-api";
import { postPosts, postPostsIdUpload } from "@/lib/api-calls/post-api";
import { postProjectPost } from "@/lib/api-calls/project-post-api";
import {
  PostTypeT,
  ProjectCompletionStatusT,
  ProjectFeedbackPreferenceT,
  ProjectPostT,
  idT,
} from "@/lib/types/api-types";

/**
 * Type of all form fields
 * Similar datatypes to possible submit values of PostCreationForm and ProjectPostCreation form
 * but integrated into one
 */
export type FormType = {
  title: string;
  anonymous: boolean;
  authorMemberIDs: idT[];
  scientificFieldTagIDs: idT[];
  postType: PostTypeT;
  projectCompletionStatus: ProjectCompletionStatusT;
  projectFeedbackPreference: ProjectFeedbackPreferenceT;
  file: File | null;
};

/**
 * Method that constructs form creation objects, and calls the correct API methods for creating posts and project posts
 * @param data form data, as per react-hook-form
 * @param setIsLoading setter for a boolean, representing if the form is submitting
 * @param onError on error passed down from an ErrorModal component, used to open the error modal
 */
export const submitHandler = async (
  data: FormType,
  setIsLoading: (v: boolean) => void,
  onError: () => void,
) => {
  try {
    setIsLoading(true);
    if (!data.file) throw new Error("No file provided.");

    const postCreationForm = {
      anonymous: data.anonymous,
      authorMemberIDs: data.authorMemberIDs,
      postType: data.postType,
      scientificFieldTags: data.scientificFieldTagIDs,
      title: data.title,
    };
    const projectPostCreationForm = {
      projectCompletionStatus: data.projectCompletionStatus,
      projectFeedbackPreference: data.projectFeedbackPreference,
      postCreationForm: postCreationForm,
    };

    if (data.postType == "project") {
      // try {
      const newProjectPost: ProjectPostT = await postProjectPost(
        projectPostCreationForm,
      );
      // TODO the fact that i kinda have to blindly trust that there is a branch and that the first one is the corret one is kindaaaaa not cool
      await postBranchesIdUpload(newProjectPost.openBranchIDs[0], data.file);
      // } catch (e) {
      // TODO delete post if error uploading files, without that this try catch block is not necessary
      // setIsLoading(false);
      // onError();
      // }
    } else {
      // try {
      const newPost = await postPosts(postCreationForm);
      await postPostsIdUpload(newPost.id, data.file);
      // } catch (e) {
      // TODO delete post if error uploading files, without that this try catch block is not necessary
      // setIsLoading(false);
      // onError();
      // }
    }

    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    onError();
  }
};
