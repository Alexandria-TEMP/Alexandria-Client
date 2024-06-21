import { Card, CardBody } from "@nextui-org/react";
import PostCardHeader from "../../components/post-parts/post-card-header";
import DiscussionSection from "../../components/discussions/discussion-section";
import FileTree from "../../components/files/file-tree";
import { pathIDToPostUnionID } from "@/lib/id-parser";
import { idT } from "@/lib/types/api-types";
import { fetchPostData } from "@/lib/api/services/post-api";
import getPostsQuartoProject from "../lib/get-posts-quarto-project";

/**
 * Page that shows files of a Post.
 * @param params.postId Post ID, taken from route's dynamic segment /[postId].
 * Read more: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 */
export default async function PostFiles({
  params,
}: {
  params: { postId: string };
}) {
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
          <FileTree id={quartoContainer.id} container={quartoContainer.type} />
        </CardBody>
      </Card>
      <DiscussionSection id={data.post.discussionContainerID} />
    </div>
  );
}
