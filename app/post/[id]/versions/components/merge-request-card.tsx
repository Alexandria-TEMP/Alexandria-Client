"use client";

import HeaderSubtle from "@/components/header-subtle";
import { getMergeRequestData } from "@/lib/api-calls/merge-request-api";
import { IdProp } from "@/lib/id-prop";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import ReviewChip from "./review-chip";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "@/lib/string-utils";
import MergeRequestCardSkeleton from "./merge-request-card-skeleton";

/**
 * Card that represents some merge request for a post.
 *
 * @param id Merge request ID
 */
export default function MergeRequestCard({ id }: IdProp) {
  const router = useRouter();
  const [data, setData] = useState<
    | {
        title: string;
        mergeRequestStatus: string;
        createdAt: string;
        closedAt: string;
        reviews: string[];
      }
    | undefined
  >(undefined);

  useEffect(() => {
    getMergeRequestData(id)
      .then((mergeRequest) => setData(mergeRequest))
      .catch(() => setData(undefined));
  });

  if (data === undefined) {
    return <MergeRequestCardSkeleton />;
  }

  return (
    <Card
      className="w-full"
      isPressable
      onPress={() => router.push(`/post-version/${id}`)}
    >
      <CardBody>
        <h3 className="font-semibold">{data.title}</h3>
        <HeaderSubtle>Created on {data.createdAt}</HeaderSubtle>
      </CardBody>
      <CardFooter>
        <p className="text-sm">
          {data.mergeRequestStatus != "open" &&
            `${capitalizeFirstLetter(data.mergeRequestStatus)} on ${data.closedAt}`}
        </p>
        <div className="grow" />
        <ReviewChip status={data.reviews[0]} />
        <ReviewChip status={data.reviews[1]} />
        <ReviewChip status={data.reviews[2]} />
      </CardFooter>
    </Card>
  );
}
