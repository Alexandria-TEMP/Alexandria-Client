import { parseId } from "@/lib/string-utils";
import PeerReviewInput from "../components/peer-review-inputs";
import CompareVersionContentCard from "../components/compare-version-content-card";
import { getMergeRequestData } from "@/lib/api-calls/merge-request-api";

export default async function PostVersionReview({
  params,
}: {
  params: { postId: string; versionId: string };
}) {
  const data = await getMergeRequestData(parseId(params.versionId));

  return (
    <div className="flex flex-col space-y-4 w-full">
      <PeerReviewInput />
      <CompareVersionContentCard
        newVersionId={data.newVersionID}
        previousVersionId={data.previousVersionID}
        postId={parseId(params.postId)}
        mergeRequestId={parseId(params.versionId)}
      />
    </div>
  );
}
