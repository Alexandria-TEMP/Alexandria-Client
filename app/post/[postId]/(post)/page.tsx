import PostCardHeader from "../components/post-parts/post-card-header";
import DiscussionSection from "../components/discussions/discussion-section";
import { Card, CardBody } from "@nextui-org/react";
import RenderedQuarto from "../components/render/rendered-quarto";
import { pathIDToPostUnionID } from "@/lib/id-parser";
import { idT } from "@/lib/types/api-types";

/**
 * Page that shows contents of a Post.
 * @param params.postId Post ID, taken from route's dynamic segment /[postId].
 * Read more: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 */
export default function Post({ params }: { params: { postId: string } }) {
  const postUnionID = pathIDToPostUnionID(params.postId);
  return (
    <div className="flex flex-col space-y-4 w-full">
      <Card>
        <PostCardHeader
          id={postUnionID.id as idT}
          isProject={postUnionID.isProject}
          hideContribute={!postUnionID.isProject}
        />
        <CardBody>
          <RenderedQuarto id={postUnionID.id as idT} container="post" />
        </CardBody>
      </Card>
      <DiscussionSection id={1} /> {/* TODO get proper ID */}
    </div>
  );
}
