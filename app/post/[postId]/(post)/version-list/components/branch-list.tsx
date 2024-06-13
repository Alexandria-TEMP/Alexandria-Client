import { idT } from "@/lib/types/api-types";
import BranchCard from "../../../components/cards/branch-card";

/**
 * List of [BranchCards](./branch-card.tsx) with the given IDs.
 * @param ids branch IDs
 * @param postId branch's post ID, used only for routing
 * @param grid makes list a grid instead
 */
export default function BranchList({
  ids,
  postId,
  grid,
}: Readonly<{ ids: string[]; postId: idT; grid?: boolean }>) {
  return (
    <div className={"gap-5 " + (grid ? "grid grid-cols-4" : "flex flex-col")}>
      {ids.map((id) => (
        <BranchCard short={grid} key={id} id={id} postId={postId} />
      ))}
    </div>
  );
}
