import { getMergeRequestData } from "@/lib/api-calls/merge-request-api";
import { IdProp } from "@/lib/id-prop";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

/**
 * Card that represents some merge request for a post.
 *
 * @param id Merge request ID
 */
export default async function MergeRequestCard({ id }: IdProp) {
  const data = await getMergeRequestData(id);

  return (
    <Card>
      <CardHeader>{data.title}</CardHeader>
      <CardBody>
        <p>Placeholder</p>
      </CardBody>
    </Card>
  );
}
