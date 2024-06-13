import { Card, CardBody } from "@nextui-org/react";
import PostCardHeader from "../../components/post-parts/post-card-header";
import DiscussionSection from "../../components/discussions/discussion-section";
import FileTree from "../../components/files/file-tree";
import { parseId } from "@/lib/string-utils";

/**
 * Page that shows files of a Post.
 * @param params.postId Post ID, taken from route's dynamic segment /[postId].
 * Read more: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 */
export default function PostFiles({ params }: { params: { postId: string } }) {
  return (
    <div className="flex flex-col space-y-4 w-full">
      <Card>
        <PostCardHeader id={parseId(params.postId)} />
        <CardBody>
          <FileTree id={parseId(params.postId)} container="post" />
        </CardBody>
      </Card>
      <DiscussionSection id={1} /> {/* TODO get proper ID */}
    </div>
  );
}
