"use client";

import { Card, CardBody } from "@nextui-org/react";
import { idT } from "@/lib/types/api-types";
import RenderedProject from "@/post/[postId]/components/project-render/rendered-project";
import { useState } from "react";
import BranchCardHeader from "./branch-card-header";
import FileTree from "@/post/[postId]/components/files/file-tree";

/**
 * Displays a Card for a branch, containing a [BranchCardHeader](./branch-card-header)
 * and two side-by-side [RenderedProject](@/post/[postId]/components/project-render/rendered-project)
 * which can be turned into a single RenderedProject by clicking a Switch.
 * @param footer optional CardFooter component, gets placed at the end of the Card
 * @param hideContribute hides button with contribution options
 * @param newVersionID new version ID
 * @param previousVersionID previous version ID
 * @param postId post ID
 * @param branchId branch ID
 */
export default function BranchCard({
  footer,
  newVersionId,
  previousVersionId,
  postId,
  branchId,
  hideContribute,
}: Readonly<{
  footer?: React.ReactNode;
  newVersionId: idT;
  previousVersionId: idT;
  postId: idT;
  branchId: idT;
  hideContribute?: boolean;
}>) {
  const [compare, setCompare] = useState(false);
  const [view, setView] = useState<"contents" | "files">("contents");

  return (
    <Card>
      <BranchCardHeader
        postId={postId}
        branchId={branchId}
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
            <RenderedProject id={newVersionId.toString()} />
          )}
        </div>

        <div className={compare ? "w-1/2" : "hidden"}>
          {view === "files" ? (
            <FileTree id={previousVersionId.toString()} />
          ) : (
            <RenderedProject id={previousVersionId.toString()} />
          )}
        </div>
      </CardBody>

      {footer}
    </Card>
  );
}
