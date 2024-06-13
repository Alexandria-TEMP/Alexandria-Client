import { idT } from "@/lib/types/api-types";
import Discussion from "./discussion";
import InputDiscussion from "./input-discussion";
import { getVersionData } from "@/lib/api-calls/quarto-api";

/**
 * Displays a title, all discussions of a version, and a discussion input component.
 * @param versionId TODO which ID
 */
export default async function DiscussionSection({
  versionId,
}: Readonly<{ versionId: idT }>) {
  // TODO which ID
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
