import { parseId } from "@/lib/string-utils";
import DiscussionSection from "@/post/[postId]/components/discussions/discussion-section";
import PeerReviewSection from "./components/peer-review/peer-review-section";
import { CardFooter, Divider } from "@nextui-org/react";
import CompareVersionContentCard from "./components/merge-request-parts/compare-version-content-card";
import { getBranchData } from "@/lib/api-calls/merge-request-api";

/**
 * Page with merge request version comparison, its reviews and discussion
 * @param params.postId Post ID, taken from route's dynamic segment /[postId]
 * @param params.versionId Version ID, taken from route's dynamic segment /[versionId]
 */
export default async function PostVersion({
  params,
}: {
  params: { postId: string; versionId: string };
}) {
  const data = await getBranchData(parseId(params.versionId));

  return (
    <div className="flex flex-col space-y-4 w-full">
      <CompareVersionContentCard
        newVersionId={data.newVersionID}
        previousVersionId={data.previousVersionID}
        postId={parseId(params.postId)}
        mergeRequestId={parseId(params.versionId)}
        footer={
          <CardFooter>
            <div className="w-full">
              <Divider className="mb-4" />
              <PeerReviewSection reviewIDs={data.reviewIDs} />
            </div>
          </CardFooter>
        }
      />
      <DiscussionSection versionId={data.newVersionID} />
    </div>
  );
}
