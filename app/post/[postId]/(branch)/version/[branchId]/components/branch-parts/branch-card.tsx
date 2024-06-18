"use client";

import { Card, CardBody } from "@nextui-org/react";
import RenderedQuarto from "@/post/[postId]/components/render/rendered-quarto";
import { useMemo, useState } from "react";
import BranchCardHeader from "./branch-card-header";
import FileTree from "@/post/[postId]/components/files/file-tree";
import { idBranchUnionT } from "@/lib/types/branch-union";
import { QuartoContainerT } from "@/lib/types/quarto-container";
import { useBranchData } from "@/lib/api/hooks/branch-hooks";
import { idT } from "@/lib/types/api-types";
import GenericLoadingPage from "@/loading";
import DefaultError from "@/error";
import useTriggerRerender from "@/lib/hooks/use-trigger-rerender";

/**
 * Displays a Card for a branch, containing a [BranchCardHeader](./branch-card-header)
 * and two side-by-side [RenderedQuarto](@/post/[postId]/components/render/rendered-quarto)
 * which can be turned into a single RenderedQuarto by clicking a Switch.
 * @param id branch ID
 * @param isClosed indicates if branch is closed
 * @param postPathID post path ID, used for routing in contribute, if undefined hides contribute button
 * @param hideContribute hides button with contribution options, no effect if postPathID is undefined
 * @param footer optional CardFooter component, gets placed at the end of the Card
 */
export default function BranchCard({
  id,
  isClosed,
  footer,
  postPathID,
  hideContribute,
}: idBranchUnionT &
  Readonly<{
    footer?: React.ReactNode;
    postPathID?: string;
    hideContribute?: boolean;
  }>) {
  const { data, isLoading, error } = useBranchData({ id: id as idT, isClosed });

  const supercededProject: QuartoContainerT | undefined = useMemo(() => {
    if (!data) return undefined;

    return data.closedBranch
      ? { id: data.closedBranch.supercededBranchID, type: "branch" }
      : { id: data.branch.projectPostID, type: "post" };
  }, [data]);

  const [compare, setCompare] = useState(false);
  const [view, setView] = useState<"contents" | "files">("contents");

  const { triggerRerender } = useTriggerRerender();

  if (isLoading) {
    return (
      <Card>
        <GenericLoadingPage />
      </Card>
    );
  }

  if (error || !data || !supercededProject) {
    return (
      <DefaultError
        error={error ?? new Error("branch data is undefined")}
        reset={triggerRerender}
      />
    );
  }

  return (
    <Card>
      <BranchCardHeader
        id={id as idT}
        isClosed={isClosed}
        postPathID={postPathID}
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
        <div className={data.closedBranch && compare ? "w-1/2" : "w-full"}>
          {view === "files" ? (
            <FileTree id={data.branch.id} container="branch" />
          ) : (
            <RenderedQuarto id={data.branch.id} container="branch" />
          )}
        </div>

        <div className={compare ? "w-1/2" : "hidden"}>
          {view === "files" ? (
            <FileTree
              id={supercededProject.id}
              container={supercededProject.type}
            />
          ) : (
            <RenderedQuarto
              id={supercededProject.id}
              container={supercededProject.type}
            />
          )}
        </div>
      </CardBody>

      {footer}
    </Card>
  );
}
