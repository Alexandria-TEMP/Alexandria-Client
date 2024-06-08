import ReviewChip from "./review-chip";

/**
 * Displays three [ReviewChip](./review-chip) in a row
 * @param reviews status of each of the reviews. must have length three
 */
export default function ReviewChips({
  reviews,
}: Readonly<{ reviews: string[] }>) {
  if (reviews.length != 3)
    throw Error(`expected ${reviews.toString()} to have length 3`);
  return (
    <div className="flex flex-row">
      <ReviewChip status={reviews[0]} />
      <ReviewChip status={reviews[1]} />
      <ReviewChip status={reviews[2]} />
    </div>
  );
}
