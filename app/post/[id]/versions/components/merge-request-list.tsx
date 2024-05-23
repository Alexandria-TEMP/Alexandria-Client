import MergeRequestCard from "./merge-request-card";

/**
 * List of [MergeRequestCard](./merge-request-card.tsx) with the given IDs.
 *
 * @param ids Merge request IDs
 */
export default function MergeRequestList({
  ids,
  grid,
}: Readonly<{ ids: string[]; grid?: boolean }>) {
  return (
    <div className={"gap-5 " + (grid ? "grid grid-cols-4" : "flex flex-col")}>
      {ids.map((id) => (
        <MergeRequestCard short={grid} key={id} id={id} />
      ))}
    </div>
  );
}
