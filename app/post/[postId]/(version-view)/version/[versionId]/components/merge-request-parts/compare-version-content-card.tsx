"use client";

import { Card, CardBody } from "@nextui-org/react";
import { idType } from "@/lib/types/api-types";
import VersionRender from "@/post/[postId]/components/version-render/component";
import { useState } from "react";
import MergeRequestCardHeader from "./merge-request-card-header";
import FileTree from "@/post/[postId]/components/files/file-tree";

/**
 * Displays a Card for a merge request, containing a
 * [MergeRequestCardHeader](./merge-request-card-header), and two side-by-side
 * [VersionRender](@/post/[postId]/components/version-render/component) which
 * can be turned into a single VersionRender by clicking a Switch.
 * @param footer optional CardFooter component, gets placed at the end of the Card
 * @param hideContribute hides button with contribution options
 * @param newVersionID new version ID
 * @param previousVersionID previous version ID
 * @param postId post ID
 * @param mergeRequestId merge request ID
 */
export default function CompareVersionContentCard({
  footer,
  newVersionId,
  previousVersionId,
  postId,
  mergeRequestId,
  hideContribute,
}: Readonly<{
  footer?: React.ReactNode;
  newVersionId: idType;
  previousVersionId: idType;
  postId: idType;
  mergeRequestId: idType;
  hideContribute?: boolean;
}>) {
  const [compare, setCompare] = useState(false);
  const [view, setView] = useState<"contents" | "files">("contents");

  return (
    <Card>
      <MergeRequestCardHeader
        postId={postId}
        mergeRequestId={mergeRequestId}
        onCompare={setCompare}
        hideContribute={hideContribute}
        actions={[
          {
            label: "Contents",
            do: () => setView("contents"),
            isDisabled: view === "contents",
          },
          {
            label: "Files",
            do: () => setView("files"),
            isDisabled: view === "files",
          },
        ]}
      />

      {compare && (
        <CardBody className="flex flex-row w-full justify-evenly">
          <h3>New version</h3>
          <div></div>
          <h3>Replaced version</h3>
        </CardBody>
      )}

      <CardBody className="flex flex-row gap-3 w-full">
        <div className={compare ? "w-1/2" : "w-full"}>
          {view === "files" ? (
            <FileTree id={newVersionId.toString()} />
          ) : (
            <VersionRender id={newVersionId.toString()} />
          )}
        </div>

        <div className={compare ? "w-1/2" : "hidden"}>
          {view === "files" ? (
            <FileTree id={previousVersionId.toString()} />
          ) : (
            <VersionRender id={previousVersionId.toString()} />
          )}
        </div>
      </CardBody>

      {footer}
    </Card>
  );
}
