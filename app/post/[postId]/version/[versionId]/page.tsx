import { parseId } from "@/lib/string-utils";
import MergeRequestContents from "./components/merge-request-contents";

export default function PostVersion({
  params,
}: {
  params: { postId: string; versionId: string };
}) {
  // const data = await getMergeRequestData(parseId(params.versionId));

  return (
    <MergeRequestContents
      postId={parseId(params.postId)}
      mergeRequestId={parseId(params.versionId)}
    />
  );
}
