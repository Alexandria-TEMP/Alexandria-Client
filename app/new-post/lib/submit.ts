import { postBranchesIdUpload } from "@/lib/api/services/branch-api";
import { postPosts, postPostsIdUpload } from "@/lib/api/services/post-api";
import { postProjectPost } from "@/lib/api/services/project-post-api";
import { postUnionIDToPathID } from "@/lib/id-parser";
import {
  PostTypeT,
  ProjectCompletionStatusT,
  ProjectFeedbackPreferenceT,
  ProjectPostT,
  idT,
} from "@/lib/types/api-types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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
 * @param setErrorMsg on error, set the error message of the state holding variable
 * @param NextRouter for redirecting on successful submit
 */
export const submitHandler = async (
  data: FormType,
  accessToken: string | undefined,
  setIsLoading: (v: boolean) => void,
  onError: () => void,
  setErrorMsg: (e: string) => void,
  router: AppRouterInstance,
) => {
  try {
    if (!data.file) throw new Error("No file provided.");
    if (!accessToken)
      throw new Error("No access token provided. Please log in.");
    setIsLoading(true);

    const postCreationForm = {
      anonymous: data.anonymous,
      authorMemberIDs: data.authorMemberIDs,
      postType: data.postType,
      scientificFieldTagIDs: data.scientificFieldTagIDs,
      title: data.title,
    };
    const projectPostCreationForm = {
      ...postCreationForm,
      projectCompletionStatus: data.projectCompletionStatus,
      projectFeedbackPreference: data.projectFeedbackPreference,
    };

    if (data.postType == "project") {
      const newProjectPost: ProjectPostT = await postProjectPost(
        projectPostCreationForm,
        accessToken,
      );
      // TODO the fact that i kinda have to blindly trust that there is a branch and that the first one is the corret one is kindaaaaa not cool
      if (newProjectPost.openBranchIDs.length <= 0)
        throw Error("No initial branch created.");
      await postBranchesIdUpload(
        newProjectPost.openBranchIDs[0],
        data.file,
        accessToken,
      );
      router.push(
        "/post/" +
          postUnionIDToPathID({ id: newProjectPost.id, isProject: true }),
      );
    } else {
      const newPost = await postPosts(postCreationForm, accessToken);
      await postPostsIdUpload(newPost.id, data.file, accessToken);
      router.push(
        "/post/" + postUnionIDToPathID({ id: newPost.id, isProject: false }),
      );
    }

    setIsLoading(false);
  } catch (error) {
    if (error instanceof Error) {
      setErrorMsg(error.message);
    }
    setIsLoading(false);
    onError();
  }
};
