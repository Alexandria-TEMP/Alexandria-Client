import { BranchReviewDecisionT } from "@/lib/types/api-types";
import ReviewChip from "./review-chip";

/**
 * Displays three [ReviewChip](./review-chip) in a row
 * @param reviews status of each of the reviews. must have length three
 */
export default function ReviewChips({
  reviews,
}: Readonly<{ reviews: BranchReviewDecisionT[] }>) {
  return (
    <div className="flex flex-row">
      <ReviewChip status={reviews[0] ?? undefined} />
      <ReviewChip status={reviews[1] ?? undefined} />
      <ReviewChip status={reviews[2] ?? undefined} />
    </div>
  );
}
