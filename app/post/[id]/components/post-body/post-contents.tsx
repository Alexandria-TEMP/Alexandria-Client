import { Card, CardBody } from "@nextui-org/react";
import PostCardHeader from "./post-card-header";
import PostEmbed from "./post-embed";

/**
 * Main body of a Post. Includes: title, main metadata, and action buttons.
 *
 * @param postId Post ID
 */
export default function PostContents({ postId }: { postId: string }) {
  return (
    <Card>
      <PostCardHeader postId={postId} />
      {/* Contents */}
      <CardBody>
        <PostEmbed postId={postId} />
      </CardBody>
    </Card>
  );
}
