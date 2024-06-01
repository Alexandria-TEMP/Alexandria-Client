import PostSidebar from "../components/post-parts/post-sidebar";
import { ChildrenProp } from "@/lib/types/react-props/children-prop";
import BodyWithSidebar from "@/components/body-with-sidebar";

export default function MainPostViewLayout({
  children,
  params,
}: ChildrenProp & {
  params: { postId: string };
}) {
  return (
    <BodyWithSidebar sidebar={<PostSidebar postId={params.postId} />}>
      {children}
    </BodyWithSidebar>
  );
}
