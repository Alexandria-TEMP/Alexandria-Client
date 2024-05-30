"use client";

import HeaderSubtle from "@/components/header-subtle";
import { getMergeRequestData } from "@/lib/api-calls/merge-request-api";
import { IdProp } from "@/lib/id-prop";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import ReviewChip from "./review-chip";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "@/lib/string-utils";
import MergeRequestCardSkeleton from "./merge-request-card-skeleton";
import { MergeRequest } from "@/lib/api-types";

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

  useEffect(() => {
    getMergeRequestData(id)
      .then((mergeRequest) => setData(mergeRequest))
      .catch(() => setData(undefined));
  });

  if (data === undefined) {
    return <MergeRequestCardSkeleton />;
  }

  return short ? (
    <Card
      className="w-full"
      isPressable
      onPress={() => router.push(`/post-version/${id}`)}
    >
      <CardBody>
        <h3 className="font-semibold">{data.mergeRequestTitle}</h3>
        <HeaderSubtle>
          Created on {data.createdAt.toLocaleDateString()}
        </HeaderSubtle>
      </CardBody>
      <CardFooter>
        <p className="text-sm">
          {data.status != "open" &&
            `${capitalizeFirstLetter(data.status)} on ${data.closedAt.toLocaleDateString()}`}
        </p>
        <div className="grow" />
        <ReviewChip status={data.reviewIDs[0]} />
        <ReviewChip status={data.reviewIDs[1]} />
        <ReviewChip status={data.reviewIDs[2]} />
      </CardFooter>
    </Card>
  ) : (
    <Card
      className="w-full"
      isPressable
      onPress={() => router.push(`/post-version/${id}`)}
    >
      <CardHeader>
        <h3 className="font-semibold mr-2">{data.mergeRequestTitle}</h3>
        <HeaderSubtle>
          Created on {data.createdAt.toLocaleDateString()}
        </HeaderSubtle>
        <p className="text-sm ml-1">
          {data.status != "open" &&
            `| ${capitalizeFirstLetter(data.status)} on ${data.closedAt.toLocaleDateString()}`}
        </p>
        <div className="grow" />
        <ReviewChip status={data.reviewIDs[0]} />
        <ReviewChip status={data.reviewIDs[1]} />
        <ReviewChip status={data.reviewIDs[2]} />
      </CardHeader>
    </Card>
  );
}
