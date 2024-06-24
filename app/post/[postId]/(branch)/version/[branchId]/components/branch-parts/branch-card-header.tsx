"use client";

import { CardHeader, Divider, Switch } from "@nextui-org/react";
import HeaderSubtle from "@/components/common/header-subtle";
import {
  capitalizeFirstLetter as cap,
  formatDateString,
} from "@/lib/string-utils";
import ContributeDropdown from "@/post/[postId]/components/buttons/contribute-dropdown";
import { getStandardReviewStatus } from "@/lib/get-format";
import { idT } from "@/lib/types/api-types";
import ChipWithTitle from "@/components/common/chip-with-title";
import BranchCardHeaderSkeleton from "./branch-card-header-skeleton";
import { useMemo } from "react";
import ActionGroup from "@/post/[postId]/components/buttons/action-group";
import DownloadButton from "@/post/[postId]/components/buttons/download-button";
import { idBranchUnionT } from "@/lib/types/branch-union";
import { useBranchData } from "@/lib/api/hooks/branch-hooks";
import { branchUnionIDToPathID } from "@/lib/id-parser";
import DefaultError from "@/error";
import useTriggerRerender from "@/lib/hooks/use-trigger-rerender";

/**
 * Header for branch contents card. Uses CardHeader, so it must be child of a Card.
 * Includes title, metadata, and action buttons.
 * @param id branch ID
 * @param isClosed indicates if branch is closed
 * @param postPathID post path ID, used for routing in contribute, if undefined hides contribute button
 * @param actions list of actions performed when pressing buttons on left side of header
 * @param hideContribute hides button with contribution options, no effect if postPathID is undefined
 * @param onCompare called when "Compare" switch is toggled, if undefined switch won't be rendered
 */
export default function BranchCardHeader({
  id,
  isClosed,
  postPathID,
  actions,
  hideContribute,
  onCompare,
}: Readonly<
  idBranchUnionT & {
    postPathID?: string;
    actions: { do: () => void; label: string; isDisabled: boolean }[];
    hideContribute?: boolean;
    onCompare?: (value: boolean) => void;
  }
>) {
  const { data, isLoading, error } = useBranchData({ id: id as idT, isClosed });
  const { triggerRerender } = useTriggerRerender();

  const status = useMemo(
    () =>
      data
        ? getStandardReviewStatus(data.branch.branchOverallReviewStatus)
        : undefined,
    [data],
  );

  const contributeRoutes = {
    // Enabled buttons per status:
    // Accepted -> Fork
    // Rejected -> Fork, Contribute
    // Open     -> Fork, Review
    fork: `/todo`,
    contribute:
      status?.short == "rejected"
        ? `/propose-changes/${postPathID}`
        : undefined,
    review:
      status?.short == "open"
        ? `/post/${postPathID}/version/${branchUnionIDToPathID({ id: id as idT, isClosed })}/review`
        : undefined,
  };

  if (isLoading || !data) return <BranchCardHeaderSkeleton />;

  if (error) return <DefaultError error={error} reset={triggerRerender} />;

  return (
    <>
      {/* Branch title (description of changes) */}
      <CardHeader>
        <h1 className="text-foreground-500 mr-2">Version:</h1>
        <h1 className="font-semibold">{data.branch.branchTitle}</h1>
      </CardHeader>

      <CardHeader className="-mt-4 flex gap-8">
        {/* Buttons */}
        <ActionGroup actions={actions} />
        <DownloadButton
          id={data.branch.id}
          container="branch"
          projectTitle={`${data.updated.postTitle}-v-${id}`}
        />
        {!(hideContribute || !postPathID) && (
          <ContributeDropdown routes={contributeRoutes} />
        )}
        {!!onCompare && <Switch onValueChange={onCompare}>Compare</Switch>}

        <div className="grow" />

        {/* Metadata */}
        <ChipWithTitle title="Completion">
          {cap(data.updated.completionStatus as string)}
        </ChipWithTitle>

        {status && (
          <ChipWithTitle title="Status">
            {cap(status.descriptive)}
          </ChipWithTitle>
        )}

        <div className="flex-col">
          {status?.short === "open" ? (
            <>
              <HeaderSubtle>Created on</HeaderSubtle>
              <HeaderSubtle>
                {formatDateString(data.branch.createdAt)}
              </HeaderSubtle>
            </>
          ) : (
            status && (
              <>
                <HeaderSubtle>
                  Created on {formatDateString(data.branch.createdAt)}
                </HeaderSubtle>
                <HeaderSubtle>
                  {`${cap(status.short)} on ${formatDateString(data.branch.updatedAt)}`}
                </HeaderSubtle>
              </>
            )
          )}
        </div>
      </CardHeader>

      {/* (Updated) post title */}
      <CardHeader>
        <div className="w-full">
          {data.branch.updatedPostTitle &&
            data.branch.updatedPostTitle.length > 0 && (
              <div className="flex flex-row gap-1">
                <h2 className="font-normal">Updated title:</h2>
                <h2 className="font-semibold">
                  &quot;{data.branch.updatedPostTitle}&quot;
                </h2>
              </div>
            )}
          <Divider className="mt-4" />
        </div>
      </CardHeader>
    </>
  );
}
