import HeaderSubtle from "@/components/header-subtle";
import { getMergeRequestData } from "@/lib/api-calls/merge-request-api";
import { IdProp } from "@/lib/id-prop";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import ReviewChip from "./review-chip";

/**
 * Card that represents some merge request for a post.
 *
 * @param id Merge request ID
 */
export default async function MergeRequestCard({ id }: IdProp) {
  const data = await getMergeRequestData(id);
  const capitalizedStatus =
    data.mergeRequestStatus[0].toUpperCase() + data.mergeRequestStatus.slice(1);

  // TODO link to MR page
  return (
    <Card className="w-full">
      <CardBody>
        <h3 className="font-semibold">{data.title}</h3>
        <HeaderSubtle>Created on {data.createdAt}</HeaderSubtle>
      </CardBody>
      <CardFooter>
        <p className="text-sm">
          {data.mergeRequestStatus != "open" &&
            `${capitalizedStatus} on ${data.closedAt}`}
        </p>
        <div className="grow" />
        <ReviewChip status={data.reviews[0]} />
        <ReviewChip status={data.reviews[1]} />
        <ReviewChip status={data.reviews[2]} />
      </CardFooter>
    </Card>
  );
}
