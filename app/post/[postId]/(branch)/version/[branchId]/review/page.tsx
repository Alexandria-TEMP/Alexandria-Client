import PeerReviewInput from "../components/peer-review/peer-review-input";
import BranchCard from "../components/branch-parts/branch-card";
import { pathIDToBranchUnionID, pathIDToPostUnionID } from "@/lib/id-parser";
import { idT } from "@/lib/types/api-types";
import { idBranchUnionT } from "@/lib/types/branch-union";
import { idPostUnionT } from "@/lib/types/post-union";

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
  const branchUnionID: idBranchUnionT = pathIDToBranchUnionID(params.branchId);
  const postUnionID: idPostUnionT = pathIDToPostUnionID(params.postId);

  return (
    <div className="flex flex-col space-y-4 w-full">
      <PeerReviewInput
        branchID={branchUnionID.id as idT}
        postID={postUnionID.id as idT}
      />
      <BranchCard
        id={branchUnionID.id as idT}
        isClosed={branchUnionID.isClosed}
        hideContribute
      />
    </div>
  );
}
