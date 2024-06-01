import { idType } from "@/lib/types/api-types";
import MergeRequestCard from "./merge-request-card";

/**
 * List of [MergeRequestCard](./merge-request-card.tsx) with the given IDs.
 *
 * @param ids Merge request IDs
 * @param postId Post ID that merge requests belong to
 * @param grid Render list as a grid
 */
export default function MergeRequestList({
  ids,
  postId,
  grid,
}: Readonly<{ ids: string[]; postId: idType; grid?: boolean }>) {
  return (
    <div className={"gap-5 " + (grid ? "grid grid-cols-4" : "flex flex-col")}>
      {ids.map((id) => (
        <MergeRequestCard short={grid} key={id} id={id} postId={postId} />
      ))}
    </div>
  );
}
