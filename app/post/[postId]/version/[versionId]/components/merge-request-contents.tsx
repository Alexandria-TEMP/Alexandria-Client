import { Card } from "@nextui-org/react";
import MergeRequestCardHeader from "./merge-request-card-header";
import { idType } from "@/lib/types/api-types";

export default function MergeRequestContents({
  postId,
  mergeRequestId,
}: Readonly<{ postId: idType; mergeRequestId: idType }>) {
  // const data = await getMergeRequestData(mergeRequestId);
  return (
    <Card>
      <MergeRequestCardHeader postId={postId} mergeRequestId={mergeRequestId} />
    </Card>
  );
}
