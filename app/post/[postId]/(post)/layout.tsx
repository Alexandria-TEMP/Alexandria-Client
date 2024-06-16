import PostSidebar from "../components/post-parts/post-sidebar";
import { ChildrenProp } from "@/lib/types/react-props/children-prop";
import BodyWithSidebar from "@/components/layout/body-with-sidebar";
import { pathIDToPostUnionID } from "@/lib/id-parser";
import { idT } from "@/lib/types/api-types";

/**
 * Layout for post pages, which inserts a [PostSidebar](../components/post-parts/post-sidebar)
 * @param params.postId Post ID, taken from route's dynamic segment /[postId]
 */
export default function MainPostViewLayout({
  children,
  params,
}: ChildrenProp & {
  params: { postId: string };
}) {
  const postID = pathIDToPostUnionID(params.postId);
  return (
    <BodyWithSidebar
      sidebar={
        <PostSidebar id={postID.id as idT} isProject={postID.isProject} />
      }
    >
      {children}
    </BodyWithSidebar>
  );
}
