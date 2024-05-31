import { Card, CardBody } from "@nextui-org/react";
import PostCardHeader from "./post-card-header";
import getPostData from "@/lib/api-calls/post-api";
import { IdProp } from "@/lib/id-prop";
import VersionRender from "../version-render/component";

/**
 * Main body of a Post. Includes: title, main metadata, and action buttons.
 *
 * @param id Post ID
 */
export default async function PostContents({ id }: IdProp) {
  const data = await getPostData(id);
  return (
    <Card>
      <PostCardHeader postId={id} />
      <CardBody>
        <VersionRender id={data.currentVersion.id} />
      </CardBody>
    </Card>
  );
}
