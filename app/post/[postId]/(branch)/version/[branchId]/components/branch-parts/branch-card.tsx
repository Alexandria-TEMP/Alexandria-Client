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

    // Initial branch (first peer review of project post) should not have compare,
    // as it has no previous content that it is replacing
    if (
      // initial branch has supercededBranch == null when closed
      (data.closedBranch && data.closedBranch.supercededBranchID === null) ||
      // only way to check if its initial branch while it is open without getting post data
      data.branch.branchTitle === "Initial Peer Review"
    )
      return undefined;

    return data.closedBranch
      ? // Closed branches compare against what they replaced when they were closed
        { id: data.closedBranch.supercededBranchID as idT, type: "branch" }
      : // Open branches compare against what they are replacing
        { id: data.postIDs.postID as idT, type: "post" };
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

  if (error || !data) {
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
        onCompare={supercededProject ? setCompare : undefined}
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
        <div className={supercededProject && compare ? "w-1/2" : "w-full"}>
          {view === "files" ? (
            <FileTree id={data.branch.id} container="branch" />
          ) : (
            <RenderedQuarto id={data.branch.id} container="branch" />
          )}
        </div>
        {supercededProject && (
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
        )}{" "}
      </CardBody>

      {footer}
    </Card>
  );
}
