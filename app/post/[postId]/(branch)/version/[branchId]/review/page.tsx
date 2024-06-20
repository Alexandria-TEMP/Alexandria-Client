import PeerReviewInput from "../components/peer-review/peer-review-input";
import BranchCard from "../components/branch-parts/branch-card";
import { pathIDToBranchUnionID } from "@/lib/id-parser";
import { idT } from "@/lib/types/api-types";

/**
 * Page with branch version comparison and input for a new peer review
 * @param params.postId Post ID, taken from route's dynamic segment /[postId]
 * @param params.branchId Branch ID, taken from route's dynamic segment /[branchId]
 */
export default function BranchReview({
  params,
}: {
  params: { postId: string; branchId: string };
}) {
  const branchUnionID = pathIDToBranchUnionID(params.branchId);

  return (
    <div className="flex flex-col space-y-4 w-full">
      <PeerReviewInput />
      <BranchCard
        id={branchUnionID.id as idT}
        isClosed={branchUnionID.isClosed}
        hideContribute
      />
    </div>
  );
}
