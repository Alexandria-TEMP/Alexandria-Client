import { IdProp } from "@/lib/id-prop";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

/**
 * Card that represents some version of a post.
 *
 * @param id Version ID
 */
export default function VersionCard({ id }: IdProp) {
  return (
    <Card>
      <CardBody>
        <p>Placeholder</p>
      </CardBody>
    </Card>
  );
}
