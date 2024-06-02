import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";

/**
 * Circular chip that indicates status of a review.
 *
 * @param status Review status
 */
export default function ReviewChip({
  status,
  small,
  // TODO better type (enum review status)
}: Readonly<{ status: string | undefined; small?: boolean }>) {
  const size = small ? "size-5" : "size-10";

  // TODO simplify if when types is improved
  if (status == "accept" || status == "approved") {
    return (
      <CheckCircleIcon
        data-testid="review-chip-accept"
        className={`${size} text-success`}
      />
    );
  }
  if (status == "reject" || status == "rejected") {
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
