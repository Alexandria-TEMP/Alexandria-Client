import {
  postBranches,
  postBranchesIdUpload,
} from "@/lib/api/services/branch-api";
import { branchUnionIDToPathID, postUnionIDToPathID } from "@/lib/id-parser";
import {
  BranchCreationFormT,
  BranchT,
  ProjectCompletionStatusT,
  ProjectFeedbackPreferenceT,
  idT,
} from "@/lib/types/api-types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type FormType = {
  anonymous: boolean;
  branchTitle: string;
  collaboratingMemberIDs: idT[];
  projectPostID: idT;
  updatedCompletionStatus: ProjectCompletionStatusT;
  updatedFeedbackPreferences: ProjectFeedbackPreferenceT;
  updatedPostTitle: string;
  updatedScientificFieldIDs: idT[];
  newFile: File | null;
};

/**
 * Submit handler for new branches, in charge of creating creation form, calling post fetch endpoint and setting error and loading states
 * @param data the branch creation form data
 * @param accessToken of the currently logged in user
 * @param setIsLoading set the loading state of the page calling this
 * @param onError action to be taken on error
 * @param setErrorMsg setter for the error message
 * @param router to redirect on successful submit
 */
export async function submitHandler(
  data: FormType,
  accessToken: string | undefined,
  setIsLoading: (v: boolean) => void,
  onError: () => void,
  setErrorMsg: (e: string) => void,
  router: AppRouterInstance,
) {
  try {
    if (!data.newFile) throw new Error("No file provided.");
    if (!accessToken)
      throw new Error("No access token provided. Please log in.");
    setIsLoading(true);

    const branchCreationForm: BranchCreationFormT = {
      anonymous: data.anonymous,
      collaboratingMemberIDs: data.collaboratingMemberIDs,
      projectPostID: data.projectPostID,
      branchTitle: data.branchTitle,
      updatedCompletionStatus: data.updatedCompletionStatus,
      updatedFeedbackPreferences: data.updatedFeedbackPreferences,
      updatedPostTitle: data.updatedPostTitle,
      updatedScientificFieldIDs: data.updatedScientificFieldIDs,
    };

    // try {
    const newBranch: BranchT = await postBranches(
      branchCreationForm,
      accessToken,
    );
    await postBranchesIdUpload(newBranch.id, data.newFile, accessToken);
    router.push(
      "/post/" +
        postUnionIDToPathID({
          id: newBranch.projectPostID,
          isProject: true,
        }) +
        "/version/" +
        branchUnionIDToPathID({ id: newBranch.id, isClosed: false }),
    );

    setIsLoading(false);
  } catch (error) {
    if (error instanceof Error) {
      setErrorMsg(error.message);
    }
    setIsLoading(false);
    onError();
  }
}
