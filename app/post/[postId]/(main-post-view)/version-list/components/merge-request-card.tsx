"use client";

import HeaderSubtle from "@/components/header-subtle";
import {
  getMergeRequestData,
  getMergeRequestReviewStatuses,
} from "@/lib/api-calls/merge-request-api";
import { IdProp } from "@/lib/types/react-props/id-prop";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter, parseId } from "@/lib/string-utils";
import MergeRequestCardSkeleton from "./merge-request-card-skeleton";
import { MergeRequest, idType } from "@/lib/types/api-types";
import { reviewStatusToTensedVerb } from "@/lib/get-format";
import ReviewChips from "./review-chips";

/**
 * Card that represents some merge request for a post.
 *
 * @param id Merge request ID
 */
export default function MergeRequestCard({
  id,
  postId,
  short,
}: IdProp & { postId: idType; short?: boolean }) {
  const router = useRouter();
  const [data, setData] = useState<MergeRequest | undefined>(undefined);
  const [reviews, setReviews] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      setData(await getMergeRequestData(parseId(id)));
      setReviews(await getMergeRequestReviewStatuses(parseId(id)));
    };
    getData().catch(() => {
      setData(undefined);
      setReviews(undefined);
    });
  });

  if (data === undefined || reviews === undefined) {
    return <MergeRequestCardSkeleton />;
  }

  // We create variables for the separate parts of the card to avoid code duplication
  // between the short and !short card versions

  const titleAndCreateDate = (
    <>
      <h3 className="font-semibold">{data.mergeRequestTitle}</h3>
      <HeaderSubtle>Created on {data.createdAt}</HeaderSubtle>
    </>
  );

  const updateDate = (
    <p className="text-sm">
      {data.mergeRequestDecision != "open for review" &&
        `${capitalizeFirstLetter(reviewStatusToTensedVerb(data.mergeRequestDecision))} on ${data.updatedAt}`}
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
