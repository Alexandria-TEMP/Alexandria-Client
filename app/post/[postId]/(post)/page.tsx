import PostCardHeader from "../components/post-parts/post-card-header";
import DiscussionSection from "../components/discussions/discussion-section";
import { Card, CardBody } from "@nextui-org/react";
import RenderedQuarto from "../components/render/rendered-quarto";
import { pathIDToPostUnionID } from "@/lib/id-parser";
import { idT } from "@/lib/types/api-types";
import { fetchPostData } from "@/lib/api/services/post-api";
import getPostsQuartoProject from "./lib/get-posts-quarto-project";

/**
 * Page that shows contents of a Post.
 * @param params.postId Post ID, taken from route's dynamic segment /[postId].
 * Read more: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 */
export default async function Post({ params }: { params: { postId: string } }) {
  const postUnionID = pathIDToPostUnionID(params.postId);
  const data = await fetchPostData(postUnionID);

  const quartoContainer = getPostsQuartoProject(data);

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Card>
        <PostCardHeader
          id={postUnionID.id as idT}
          isProject={postUnionID.isProject}
          hideContribute={!postUnionID.isProject}
        />
        <CardBody>
          <RenderedQuarto
            id={quartoContainer.id}
            container={quartoContainer.type}
          />
        </CardBody>
      </Card>
      <DiscussionSection id={data.post.discussionContainerID} />
    </div>
  );
}
