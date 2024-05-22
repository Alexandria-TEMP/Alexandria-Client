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
    return <CheckCircleIcon className={`${size} text-success`} />;
  }
  if (status == "reject") {
    return <XCircleIcon className={`${size} text-danger`} />;
  }
  return <EllipsisHorizontalCircleIcon className={`${size} `} />;
}
