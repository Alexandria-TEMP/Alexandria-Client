"use client";

import { CardHeader, Switch } from "@nextui-org/react";
import HeaderSubtle from "@/components/header-subtle";
import { getBranchData } from "@/lib/api-calls/merge-request-api";
import { capitalizeFirstLetter } from "@/lib/string-utils";
import LinkGroup from "@/post/[postId]/components/buttons/link-group";
import ContributeDropdown from "@/post/[postId]/components/buttons/contribute-dropdown";
import { reviewStatusToTensedVerb } from "@/lib/get-format";
import { BranchT, idType } from "@/lib/types/api-types";
import ChipWithTitle from "@/components/chip-with-title";
import MergeRequestCardHeaderSkeleton from "./merge-request-card-header-skeleton";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Header for merge request contents card. Uses CardHeader, so it must be child of a Card.
 * Includes title, main metadata, and action buttons.
 * @param postId post ID, used for routing only
 * @param mergeRequestId merge request ID
 * @param hideContribute hides button with contribution options
 * @param onCompare called when "Compare" switch is toggled,
 *                  if undefined the switch won't be rendered
 */
export default function MergeRequestCardHeader({
  postId,
  mergeRequestId,
  hideContribute,
  onCompare,
}: {
  postId: idType;
  mergeRequestId: idType;
  hideContribute?: boolean;
  onCompare?: (value: boolean) => void;
}) {
  const [data, setData] = useState<BranchT>();
  const [isLoading, setIsLoading] = useState(true);
  const status = useMemo(
    () =>
      data ? reviewStatusToTensedVerb(data.branchReviewStatus) : undefined,
    [data],
  );

  useEffect(() => {
    getBranchData(mergeRequestId)
      .then(setData)
      .catch((e) => {
        throw e;
      })
      .finally(() => setIsLoading(false));
  }, [mergeRequestId]);

  // Pathname is used to switch between "Content" and "File" views
  const pathname = usePathname();
  const basePath = useMemo(() => pathname.replace("/files", ""), [pathname]);

  const contributeRoutes = {
    // Enabled buttons per status:
    // Accepted -> Fork
    // Rejected -> Fork, Contribute
    // Open     -> Fork, Review
    fork: `/todo`,
    contribute: status == "rejected" ? `/propose-changes/${postId}` : undefined,
    review:
      status == "open"
        ? `/post/${postId}/version/${mergeRequestId}/review`
        : undefined,
  };

  if (isLoading || !data) return <MergeRequestCardHeaderSkeleton />;

  return (
    <>
      {/* Title */}
      <CardHeader>
        <h1 className="font-semibold">{data.newPostTitle}</h1>
      </CardHeader>

      {/* (part of) Metadata */}
      <CardHeader className="-mt-4 flex gap-12">
        <LinkGroup
          links={[
            { href: basePath, label: "Contents" },
            { href: `${basePath}/files`, label: "Files" },
          ]}
        />

        {!hideContribute && <ContributeDropdown routes={contributeRoutes} />}

        {!!onCompare && <Switch onValueChange={onCompare}>Compare</Switch>}

        <div className="grow" />

        <ChipWithTitle title="Completion">
          {capitalizeFirstLetter(data.updatedCompletionStatus)}
        </ChipWithTitle>

        {status && (
          <ChipWithTitle title="Status">
            {capitalizeFirstLetter(status)}
          </ChipWithTitle>
        )}

        <div className="flex-col">
          {status === "open" ? (
            <>
              <HeaderSubtle>Created on</HeaderSubtle>
              <HeaderSubtle>{data.createdAt}</HeaderSubtle>
            </>
          ) : (
            status && (
              <>
                <HeaderSubtle>Created on {data.createdAt}</HeaderSubtle>
                <HeaderSubtle>
                  {`${capitalizeFirstLetter(status)} on ${data.updatedAt}`}
                </HeaderSubtle>
              </>
            )
          )}
        </div>
      </CardHeader>
    </>
  );
}
