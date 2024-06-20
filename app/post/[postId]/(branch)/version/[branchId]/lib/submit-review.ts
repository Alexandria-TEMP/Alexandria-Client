import { postBranchesReviews } from "@/lib/api/services/branch-api";
import { postUnionIDToPathID } from "@/lib/id-parser";
import {
  BranchReviewDecisionT,
  ReviewCreationFormT,
  idT,
} from "@/lib/types/api-types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type FormType = {
  branchReviewDecision: BranchReviewDecisionT;
  feedback: string;
};

/**
 * Submit handler for adding reviews, handles the posting, loading and error states
 * @param data review data
 * @param branchId the branch to review
 * @param postId for routing to post version page on succsessful submit
 * @param accessToken of logged in user for authentication
 * @param setIsLoading setter of loading state
 * @param setErrorMsg setter of error message
 * @param router for redirect on successful submit
 */
export async function reviewSubmitHandler(
  data: FormType,
  branchId: idT,
  postId: idT,
  accessToken: string | undefined,
  setIsLoading: (v: boolean) => void,
  setErrorMsg: (e: string) => void,
  router: AppRouterInstance,
) {
  try {
    if (!accessToken) throw new Error("Please log in to post a reply.");
    setIsLoading(true);

    const reviewCreationForm: ReviewCreationFormT = {
      branchID: branchId,
      feedback: data.feedback,
      branchReviewDecision: data.branchReviewDecision,
    };

    await postBranchesReviews(reviewCreationForm, accessToken);
    // TODO redirect to correct branch page
    // /version/${branchUnionIDToPathID({ id: review.branchID, isClosed: review.branchReviewDecision == "rejected" })}
    router.push(
      `/post/${postUnionIDToPathID({ id: postId, isProject: true })}`,
    );
    router.refresh();

    setIsLoading(false);
  } catch (error) {
    if (error instanceof Error) {
      setErrorMsg(error.message);
    }
    setIsLoading(false);
  }
}
