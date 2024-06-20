import { BranchReviewDecisionT } from "@/lib/types/api-types";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";

/**
 * Circular chip that indicates status of a review.
 * @param status review status
 * @param small makes chip a smaller size
 */
export default function ReviewChip({
  status,
  small,
}: Readonly<{ status?: BranchReviewDecisionT; small?: boolean }>) {
  const size = small ? "size-5" : "size-10";

  if (status == "approved") {
    return (
      <CheckCircleIcon
        data-testid="review-chip-accept"
        className={`${size} text-success`}
      />
    );
  }
  if (status == "rejected") {
    return (
      <XCircleIcon
        data-testid="review-chip-reject"
        className={`${size} text-danger`}
      />
    );
  }
  return (
    <EllipsisHorizontalCircleIcon
      data-testid="review-chip-open"
      className={`${size}`}
    />
  );
}
