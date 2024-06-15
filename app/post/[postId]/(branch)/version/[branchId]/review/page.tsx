import { idStringToIDT } from "@/lib/string-utils";
import PeerReviewInput from "../../../../(branch)/version/[branchId]/components/peer-review/peer-review-input";
import BranchCard from "../../../../(branch)/version/[branchId]/components/branch-parts/branch-card";
import { getBranchData } from "@/lib/api/services/branch-api";

/**
 * Page with branch version comparison and input for a new peer review
 * @param params.postId Post ID, taken from route's dynamic segment /[postId]
 * @param params.branchId Branch ID, taken from route's dynamic segment /[branchId]
 */
export default async function BranchReview({
  params,
}: {
  params: { postId: string; branchId: string };
}) {
  // TODO remove disable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = await getBranchData(idStringToIDT(params.branchId));

  return (
    <div className="flex flex-col space-y-4 w-full">
      <PeerReviewInput />
      <BranchCard
        newVersionId={0} // TODO {data.newVersionID}
        previousVersionId={0} // TODO {data.newVersionID}
        postId={idStringToIDT(params.postId)}
        branchId={idStringToIDT(params.branchId)}
        hideContribute
      />
    </div>
  );
}
