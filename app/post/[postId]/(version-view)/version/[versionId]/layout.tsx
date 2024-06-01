import { ChildrenProp } from "@/lib/types/react-props/children-prop";
import BodyWithSidebar from "@/components/body-with-sidebar";
import MergeRequestSidebar from "./components/merge-request-sidebar";

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
