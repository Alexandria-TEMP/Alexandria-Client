"use client";

import { CardHeader, Switch } from "@nextui-org/react";
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
import { useMemo, useState } from "react";
import ActionGroup from "@/post/[postId]/components/buttons/action-group";
import DownloadButton from "@/post/[postId]/components/buttons/download-button";
import { idBranchUnionT } from "@/lib/types/branch-union";
import { useBranchData } from "@/lib/api/hooks/branch-hooks";
import { branchUnionIDToPathID } from "@/lib/id-parser";
import DefaultError from "@/error";

/**
 * Header for branch contents card. Uses CardHeader, so it must be child of a Card.
 * Includes title, metadata, and action buttons.
 * @param id branch ID
 * @param isClosed indicates if branch is closed
 * @param postPathID post path ID, used for routing only
 * @param actions list of actions performed when pressing buttons on left side of header
 * @param hideContribute hides button with contribution options
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
    postPathID: string;
    actions: { do: () => void; label: string; isDisabled: boolean }[];
    hideContribute?: boolean;
    onCompare?: (value: boolean) => void;
  }
>) {
  const { data, isLoading, error } = useBranchData({ id: id as idT, isClosed });
  // Used to force a rerender on error
  const [rerender, setRerender] = useState(false);

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

  if (error)
    return <DefaultError error={error} reset={() => setRerender(!rerender)} />;

  return (
    <>
      {/* Title */}
      <CardHeader>
        <h1 className="font-semibold">{data.updated.postTitle}</h1>
      </CardHeader>

      <CardHeader className="-mt-4 flex gap-8">
        {/* Buttons */}
        <ActionGroup actions={actions} />
        <DownloadButton
          id={id as idT}
          container="branch"
          projectTitle={`${data.updated.postTitle}-v-${id}`}
        />
        {!hideContribute && <ContributeDropdown routes={contributeRoutes} />}
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
    </>
  );
}
