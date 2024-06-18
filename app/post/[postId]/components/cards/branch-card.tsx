"use client";

import HeaderSubtle from "@/components/common/header-subtle";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import BranchCardSkeleton from "./branch-card-skeleton";
import { idT } from "@/lib/types/api-types";
import ReviewChips from "@/components/common/review-chips";
import { useBranchAndReviewData } from "@/lib/api/hooks/branch-hooks";
import { idBranchUnionT } from "@/lib/types/branch-union";
import useTriggerRerender from "@/lib/hooks/use-trigger-rerender";
import DefaultError from "@/error";
import { capitalizeFirstLetter, formatDateString } from "@/lib/string-utils";
import { getStandardReviewStatus } from "@/lib/get-format";

/**
 * Card that represents some post branch
 * @param id branch ID
 * @param isClosed indicates if branch is closed
 * @param postPathID post path ID, used for routing in contribute
 * @param short makes the card less wide
 */
export default function BranchCard({
  id,
  isClosed,
  postPathID,
  short,
}: idBranchUnionT & Readonly<{ postPathID: string; short?: boolean }>) {
  const { data, isLoading, error } = useBranchAndReviewData({
    id: id as idT,
    isClosed,
  });

  const status = useMemo(
    () =>
      getStandardReviewStatus(
        data?.branchUnion?.branch.branchOverallReviewStatus,
      ).short,
    [data],
  );

  const { triggerRerender } = useTriggerRerender();
  const router = useRouter();

  if (isLoading || !data) {
    return <BranchCardSkeleton />;
  }

  if (error) {
    return <DefaultError reset={triggerRerender} error={error} />;
  }

  const { branchUnion, reviews } = data;

  // We create variables for the separate parts of the card to avoid
  // code duplication between the short and !short card versions

  const titleAndCreateDate = (
    <>
      <h3 className="font-semibold">{branchUnion.branch.branchTitle}</h3>
      <HeaderSubtle>
        Created on {formatDateString(branchUnion.branch.createdAt)}
      </HeaderSubtle>
    </>
  );

  const updateDate =
    status === "open" || status === "unknown" ? (
      <></>
    ) : (
      <p className="text-sm">{`${capitalizeFirstLetter(status)} on ${formatDateString(branchUnion.branch.updatedAt)}`}</p>
    );

  const onPress = () => router.push(`/post/${postPathID}/version/${id}`);

  return short ? (
    <Card className="w-full" isPressable onPress={onPress}>
      <CardBody>{titleAndCreateDate}</CardBody>
      <CardFooter>
        {updateDate}
        <div className="grow" />
        <ReviewChips reviews={reviews} />
      </CardFooter>
    </Card>
  ) : (
    <Card className="w-full" isPressable onPress={onPress}>
      <CardHeader className="gap-2">
        {titleAndCreateDate}
        {updateDate}
        <div className="grow" />
        <ReviewChips reviews={reviews} />
      </CardHeader>
    </Card>
  );
}
