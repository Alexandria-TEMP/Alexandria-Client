import { idT } from "@/lib/types/api-types";
import Discussion from "./discussion";
import InputDiscussion from "./input-discussion";
import { IdProp } from "@/lib/types/react-props/id-prop";
import { fetchDiscussionContainer } from "@/lib/api/services/discussion-api";

/**
 * Displays a title, all discussions, and a discussion input component
 * @param id discussion container ID
 */
export default async function DiscussionSection({ id }: IdProp) {
  const { discussionIDs } = await fetchDiscussionContainer(id as idT);

  return (
    <>
      <h2>{discussionIDs.length} Replies</h2>
      {discussionIDs.map((id) => (
        <Discussion id={id} key={id} />
      ))}
      <InputDiscussion isRoot id={id as idT} />
    </>
  );
}
