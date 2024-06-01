import ReviewChip from "./review-chip";

export default function ReviewChips({
  reviews,
}: Readonly<{ reviews: string[] }>) {
  return (
    <div className="flex flex-row gap-1">
      <ReviewChip status={reviews[0]} />
      <ReviewChip status={reviews[1]} />
      <ReviewChip status={reviews[2]} />
    </div>
  );
}
