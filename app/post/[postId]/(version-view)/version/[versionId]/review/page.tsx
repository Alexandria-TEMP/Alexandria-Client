import { parseId } from "@/lib/string-utils";
import PeerReviewInput from "../components/peer-review/peer-review-input";
import BranchCard from "../components/branch-parts/branch-card";
import { getBranchData } from "@/lib/api-calls/branch-api";

/**
 * Page with branch version comparison and input for a new peer review
 * @param params.postId Post ID, taken from route's dynamic segment /[postId]
 * @param params.versionId Branch ID, taken from route's dynamic segment /[versionId]
 */
export default async function BranchReview({
  params,
}: {
  params: { postId: string; versionId: string };
}) {
  const data = await getBranchData(parseId(params.versionId));

  return (
    <div className="flex flex-col space-y-4 w-full">
      <PeerReviewInput />
      <BranchCard
        newVersionId={data.newVersionID}
        previousVersionId={data.previousVersionID}
        postId={parseId(params.postId)}
        branchId={parseId(params.versionId)}
        hideContribute
      />
    </div>
  );
}
