"use client";

import { CardHeader, Switch } from "@nextui-org/react";
import HeaderSubtle from "@/components/common/header-subtle";
import { getBranchData } from "@/lib/api/services/branch-api";
import { capitalizeFirstLetter as cap } from "@/lib/string-utils";
import ContributeDropdown from "@/post/[postId]/components/buttons/contribute-dropdown";
import { getStandardReviewStatus } from "@/lib/get-format";
import { BranchT, idT } from "@/lib/types/api-types";
import ChipWithTitle from "@/components/common/chip-with-title";
import BranchCardHeaderSkeleton from "./branch-card-header-skeleton";
import { useEffect, useMemo, useState } from "react";
import ActionGroup from "@/post/[postId]/components/buttons/action-group";
import DownloadButton from "@/post/[postId]/components/buttons/download-button";

/**
 * Header for branch contents card. Uses CardHeader, so it must be child of a Card.
 * Includes title, metadata, and action buttons.
 * @param postId post ID, used for routing only
 * @param branchId branch ID
 * @param actions list of actions performed when pressing buttons on left side of header
 * @param hideContribute hides button with contribution options
 * @param onCompare called when "Compare" switch is toggled, if undefined switch won't be rendered
 */
export default function BranchCardHeader({
  postId,
  branchId,
  actions,
  hideContribute,
  onCompare,
}: {
  postId: idT;
  branchId: idT;
  actions: { do: () => void; label: string; isDisabled: boolean }[];
  hideContribute?: boolean;
  onCompare?: (value: boolean) => void;
}) {
  const [data, setData] = useState<BranchT>();
  const [isLoading, setIsLoading] = useState(true);
  const status = useMemo(
    () =>
      data
        ? getStandardReviewStatus(data.branchOverallReviewStatus)
        : undefined,
    [data],
  );

  useEffect(() => {
    getBranchData(branchId)
      .then(setData)
      .catch((e) => {
        throw e;
      })
      .finally(() => setIsLoading(false));
  }, [branchId]);

  const contributeRoutes = {
    // Enabled buttons per status:
    // Accepted -> Fork
    // Rejected -> Fork, Contribute
    // Open     -> Fork, Review
    fork: `/todo`,
    contribute:
      status?.short == "rejected" ? `/propose-changes/${postId}` : undefined,
    review:
      status?.short == "open"
        ? `/post/${postId}/version/${branchId}/review`
        : undefined,
  };

  if (isLoading || !data) return <BranchCardHeaderSkeleton />;

  return (
    <>
      {/* Title */}
      <CardHeader>
        <h1 className="font-semibold">{data.updatedPostTitle}</h1>
      </CardHeader>

      <CardHeader className="-mt-4 flex gap-8">
        {/* Buttons */}
        <ActionGroup actions={actions} />
        {/* <DownloadButton id={data.newVersionID.toString()} /> */}
        {/* TODO */}
        <DownloadButton
          id={branchId}
          container="branch"
          // TODO optionally: title
        />
        {!hideContribute && <ContributeDropdown routes={contributeRoutes} />}
        {!!onCompare && <Switch onValueChange={onCompare}>Compare</Switch>}

        <div className="grow" />

        {/* Metadata */}
        <ChipWithTitle title="Completion">
          {cap(data.updatedCompletionStatus)}
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
                {/* TODO */}
                {0}
                {/* {data.createdAt} */}
              </HeaderSubtle>
            </>
          ) : (
            status && (
              <>
                <HeaderSubtle>
                  Created on
                  {/* TODO */}
                  {0}
                  {/* {data.createdAt} */}
                </HeaderSubtle>
                <HeaderSubtle>
                  {/* TODO */}
                  {`${cap(status.short)} on ${0}`}
                  {/* {`${capitalizeFirstLetter(status)} on ${data.updatedAt}`} */}
                </HeaderSubtle>
              </>
            )
          )}
        </div>
      </CardHeader>
    </>
  );
}
