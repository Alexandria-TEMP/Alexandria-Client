import { ChildrenProp } from "@/lib/types/react-props/children-prop";
import BodyWithSidebar from "@/components/body-with-sidebar";
import MergeRequestSidebar from "./components/merge-request-sidebar";

/**
 * Layout for merge request pages, which inserts a [MergeRequestSidebar](./components/merge-request-sidebar)
 * @param params.postId Post ID, taken from route's dynamic segment /[postId]
 * @param params.versionId Version ID, taken from route's dynamic segment /[versionId]
 */
export default function VersionViewLayout({
  children,
  params,
}: ChildrenProp & {
  params: { versionId: string; postId: string };
}) {
  return (
    <BodyWithSidebar sidebar={<MergeRequestSidebar id={params.versionId} />}>
      {children}
    </BodyWithSidebar>
  );
}
