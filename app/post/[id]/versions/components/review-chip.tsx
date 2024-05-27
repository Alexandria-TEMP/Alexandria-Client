import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";

/**
 * Circular chip that indicates status of a review.
 *
 * @param status Review status
 */
export default function ReviewChip({
  status,
  // TODO better type (enum review status)
}: Readonly<{ status: string | undefined }>) {
  const size = "size-10";

  if (status == "accept") {
    return (
      <CheckCircleIcon
        data-testid="review-chip-accept"
        className={`${size} text-success`}
      />
    );
  }
  if (status == "reject") {
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
      className={`${size} `}
    />
  );
}
