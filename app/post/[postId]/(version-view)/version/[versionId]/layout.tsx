import { ChildrenProp } from "@/lib/types/react-props/children-prop";
import BodyWithSidebar from "@/components/body-with-sidebar";
import BranchSidebar from "./components/branch-parts/branch-sidebar";

/**
 * Layout for branch pages, which inserts a [BranchSidebar](./components/branch-sidebar)
 * @param params.postId Post ID, taken from route's dynamic segment /[postId]
 * @param params.versionId Branch ID, taken from route's dynamic segment /[versionId]
 */
export default function BranchLayout({
  children,
  params,
}: ChildrenProp & {
  params: { versionId: string; postId: string };
}) {
  return (
    <BodyWithSidebar sidebar={<BranchSidebar id={params.versionId} />}>
      {children}
    </BodyWithSidebar>
  );
}
