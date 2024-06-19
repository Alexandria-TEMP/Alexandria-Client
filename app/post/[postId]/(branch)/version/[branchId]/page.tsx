import DiscussionSection from "@/post/[postId]/components/discussions/discussion-section";
import PeerReviewSection from "./components/peer-review/peer-review-section";
import { CardFooter, Divider } from "@nextui-org/react";
import BranchCard from "./components/branch-parts/branch-card";
import { fetchBranchData } from "@/lib/api/services/branch-api";
import { pathIDToBranchUnionID } from "@/lib/id-parser";
import { idT } from "@/lib/types/api-types";

/**
 * Page with branch version comparison, its reviews and discussion
 * @param params.postId Post ID, taken from route's dynamic segment /[postId]
 * @param params.branchId Version ID, taken from route's dynamic segment /[branchId]
 */
export default async function Branch({
  params,
}: {
  params: { postId: string; branchId: string };
}) {
  const branchUnionID = pathIDToBranchUnionID(params.branchId);
  const data = await fetchBranchData(branchUnionID);

  return (
    <div className="flex flex-col space-y-4 w-full">
      <BranchCard
        id={branchUnionID.id as idT}
        isClosed={branchUnionID.isClosed}
        postPathID={params.postId}
        footer={
          <CardFooter>
            <div className="w-full">
              <Divider className="mb-4" />
              <PeerReviewSection reviewIDs={data.branch.reviewIDs} />
            </div>
          </CardFooter>
        }
      />
      <DiscussionSection id={data.branch.discussionContainerID} />
    </div>
  );
}
