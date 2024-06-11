// Needs to be client component because so is PeerReviewSection
"use client";

import HeaderSubtle from "@/components/common/header-subtle";
import getMemberData from "@/lib/api-calls/member-api";
import { getReviewData } from "@/lib/api-calls/review-api";
import { getMemberName } from "@/lib/get-format";
import { capitalizeFirstLetter, parseId } from "@/lib/string-utils";
import { Member, ReviewT } from "@/lib/types/api-types";
import { IdProp } from "@/lib/types/react-props/id-prop";
import ReviewChip from "@/components/common/review-chip";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";

/**
 * Displays peer review with feedback, author, decision and date
 * @param id peer review ID
 */
export default function PeerReview({ id }: IdProp) {
  const [data, setData] = useState<ReviewT | undefined>();
  const [author, setAuthor] = useState<Member | undefined>();

  useEffect(() => {
    const getData = async () => {
      const reviewData = await getReviewData(parseId(id));
      setData(reviewData);
      setAuthor(await getMemberData(reviewData.memberID.toString()));
    };
    getData().catch(() => {});
  });

  const decisionColor: "success" | "danger" = useMemo(
    () =>
      data && data.branchReviewDecision === "approved" ? "success" : "danger",
    [data],
  );

  return (
    <Card shadow="none" fullWidth>
      <CardHeader className="flex gap-x-2 items-baseline">
        {/* TODO link to profile */}

        <Skeleton isLoaded={!!data} className="rounded-lg">
          <p className="font-semibold">{getMemberName(author)}</p>
        </Skeleton>

        <Skeleton isLoaded={!!data} className="rounded-lg">
          <HeaderSubtle>reviewed on {data && data.createdAt}</HeaderSubtle>
        </Skeleton>
      </CardHeader>

      <CardBody className="w-full">
        <Skeleton isLoaded={!!data} className="rounded-lg">
          {data ? <p>{data.feedback}</p> : <div className="h-40" />}
        </Skeleton>
      </CardBody>

      <CardFooter>
        <Skeleton isLoaded={!!data} className="rounded-full">
          <ReviewChip small status={data && data.branchReviewDecision} />
        </Skeleton>

        <Skeleton isLoaded={!!data} className="rounded-lg">
          <h3 className={`text-${decisionColor} font-semibold ml-2`}>
            {capitalizeFirstLetter(
              data ? data.branchReviewDecision : "Review loading...",
            )}
          </h3>
        </Skeleton>
      </CardFooter>
    </Card>
  );
}
