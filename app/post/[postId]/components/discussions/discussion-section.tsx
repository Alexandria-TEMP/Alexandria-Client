import { idType } from "@/lib/types/api-types";
import Discussion from "./discussion";
import InputDiscussion from "./input-discussion";
import { getVersionData } from "@/lib/api-calls/version-api";

/**
 * Displays a title, all discussions of a version, and a discussion input component.
 * @param versionId version ID
 */
export default async function DiscussionSection({
  versionId,
}: Readonly<{ versionId: idType }>) {
  const data = await getVersionData(versionId);

  return (
    <>
      <h2>{data.discussionIDs.length} Replies</h2>
      {data.discussionIDs.map((id) => (
        <Discussion id={id.toString()} key={id} />
      ))}
      <InputDiscussion versionId={versionId.toString()} />
    </>
  );
}
