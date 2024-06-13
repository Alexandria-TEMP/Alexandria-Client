import PostSidebar from "../components/post-parts/post-sidebar";
import { ChildrenProp } from "@/lib/types/react-props/children-prop";
import BodyWithSidebar from "@/components/layout/body-with-sidebar";
import { parseId } from "@/lib/string-utils";

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
  return (
    <BodyWithSidebar sidebar={<PostSidebar id={parseId(params.postId)} />}>
      {children}
    </BodyWithSidebar>
  );
}
