"use client";

import HeaderSubtle from "@/components/header-subtle";
import {
  getMergeRequestData,
  getMergeRequestReviewStatuses,
} from "@/lib/api-calls/merge-request-api";
import { IdProp } from "@/lib/types/react-props/id-prop";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import ReviewChip from "./review-chip";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter, parseId } from "@/lib/string-utils";
import MergeRequestCardSkeleton from "./merge-request-card-skeleton";
import { MergeRequest } from "@/lib/types/api-types";
import { reviewStatusToTensedVerb } from "@/lib/get-format";

/**
 * Card that represents some merge request for a post.
 *
 * @param id Merge request ID
 */
export default function MergeRequestCard({
  id,
  short,
}: IdProp & { short?: boolean }) {
  const router = useRouter();
  const [data, setData] = useState<MergeRequest | undefined>(undefined);
  const [reviews, setReviews] = useState(["open", "open", "open"]);

  useEffect(() => {
    const getData = async () => {
      const mergeRequest = await getMergeRequestData(parseId(id));
      setData(mergeRequest);
      const reviewStatuses = await getMergeRequestReviewStatuses(parseId(id));
      setReviews(reviewStatuses);
    };
    getData().catch(() => setData(undefined));
  });

  if (data === undefined) {
    return <MergeRequestCardSkeleton />;
  }

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

  const reviewChips = (
    <>
      <div className="grow" />
      <ReviewChip status={reviews[0]} />
      <ReviewChip status={reviews[1]} />
      <ReviewChip status={reviews[2]} />
    </>
  );

  return short ? (
    <Card
      className="w-full"
      isPressable
      onPress={() => router.push(`/post-version/${id}`)}
    >
      <CardBody>{titleAndCreateDate}</CardBody>
      <CardFooter>
        {updateDate}
        {reviewChips}
      </CardFooter>
    </Card>
  ) : (
    <Card
      className="w-full"
      isPressable
      onPress={() => router.push(`/post-version/${id}`)}
    >
      <CardHeader className="gap-2">
        {titleAndCreateDate}
        {updateDate}
        {reviewChips}
      </CardHeader>
    </Card>
  );
}
