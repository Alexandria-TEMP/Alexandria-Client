import { IdProp } from "@/lib/id-prop";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

/**
 * Card that represents some merge request for a post.
 *
 * @param id Merge request ID
 */
export default function MergeRequestCard({ id }: IdProp) {
  return (
    <Card>
      <CardBody>
        <p>Placeholder</p>
      </CardBody>
    </Card>
  );
}
