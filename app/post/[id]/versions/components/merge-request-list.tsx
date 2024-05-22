import MergeRequestCard from "./merge-request-card";

/**
 * List of [MergeRequestCard](./merge-request-card.tsx) with the given IDs.
 *
 * @param ids Merge request IDs
 */
export default function MergeRequestList({ ids }: Readonly<{ ids: string[] }>) {
  return (
    <div className="flex flex-row gap-4">
      {ids.map((id) => (
        <MergeRequestCard key={id} id={id} />
      ))}
    </div>
  );
}
