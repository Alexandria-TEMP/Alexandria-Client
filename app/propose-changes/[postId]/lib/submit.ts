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

export const submitHandler = async (
  data: FormType,
  setIsLoading: (v: boolean) => void,
  onError: () => void,
  setErrorMsg: (e: string) => void,
  router: AppRouterInstance,
) => {
  try {
    if (!data.newFile) throw new Error("No file provided.");
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
    const newBranch: BranchT = await postBranches(branchCreationForm);
    await postBranchesIdUpload(newBranch.id, data.newFile);
    router.push(
      "/post/" +
        postUnionIDToPathID({
          id: newBranch.projectPostID,
          isProject: true,
        }) +
        "/version/" +
        branchUnionIDToPathID({ id: newBranch.id, isClosed: false }),
    );
    // } catch (e) {
    //   // TODO delete branch object if error uploading files
    //   setIsLoading(false);
    //   onError();
    // }

    setIsLoading(false);
  } catch (error) {
    if (error instanceof Error) {
      setErrorMsg(error.message);
    }
    setIsLoading(false);
    onError();
  }
};
