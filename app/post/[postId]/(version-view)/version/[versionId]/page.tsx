import { parseId } from "@/lib/string-utils";
import VersionContentCard from "@/post/[postId]/components/post-parts/version-content-card";
import MergeRequestCardHeader from "./components/merge-request-card-header";
import { getMergeRequestData } from "@/lib/api-calls/merge-request-api";
import DiscussionSection from "@/post/[postId]/components/discussions/discussion-section";
import PeerReviewSection from "./components/peer-review-section";
import { CardFooter, Divider } from "@nextui-org/react";

export default async function PostVersion({
  params,
}: {
  params: { postId: string; versionId: string };
}) {
  const data = await getMergeRequestData(parseId(params.versionId));

  return (
    <div className="flex flex-col space-y-4 w-full">
      <VersionContentCard
        versionId={data.newVersionID}
        header={
          <MergeRequestCardHeader
            postId={parseId(params.postId)}
            mergeRequestId={parseId(params.versionId)}
          />
        }
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
