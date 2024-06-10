"use client";

import HeaderSubtle from "@/components/header-subtle";
import {
  getBranchData,
  getBranchReviewStatuses,
} from "@/lib/api-calls/branch-api";
import { IdProp } from "@/lib/types/react-props/id-prop";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter, parseId } from "@/lib/string-utils";
import BranchCardSkeleton from "./branch-card-skeleton";
import { BranchT, idType } from "@/lib/types/api-types";
import { reviewStatusToTensedVerb } from "@/lib/get-format";
import ReviewChips from "../../../components/review-chips";

/**
 * Card that represents some post branch
 * @param id branch ID
 * @param postId branch's post ID, used only for routing
 * @param short makes the card less wide
 */
export default function BranchCard({
  id,
  postId,
  short,
}: IdProp & { postId: idType; short?: boolean }) {
  const router = useRouter();
  const [data, setData] = useState<BranchT | undefined>(undefined);
  const [reviews, setReviews] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      setData(await getBranchData(parseId(id)));
      setReviews(await getBranchReviewStatuses(parseId(id)));
    };
    getData().catch(() => {
      setData(undefined);
      setReviews(undefined);
    });
  });

  if (data === undefined || reviews === undefined) {
    return <BranchCardSkeleton />;
  }

  // We create variables for the separate parts of the card to avoid code duplication
  // between the short and !short card versions

  const titleAndCreateDate = (
    <>
      <h3 className="font-semibold">{data.branchTitle}</h3>
      <HeaderSubtle>Created on {data.createdAt}</HeaderSubtle>
    </>
  );

  const updateDate = (
    <p className="text-sm">
      {data.branchReviewStatus != "open for review" &&
        `${capitalizeFirstLetter(reviewStatusToTensedVerb(data.branchReviewStatus))} on ${data.updatedAt}`}
    </p>
  );

  const onPress = () => router.push(`/post/${postId}/version/${id}`);

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
