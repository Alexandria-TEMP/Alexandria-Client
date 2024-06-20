import HeaderSubtle from "@/components/common/header-subtle";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import ReviewChips from "@/components/common/review-chips";
import { BranchUnionT } from "@/lib/types/branch-union";
import { capitalizeFirstLetter, formatDateString } from "@/lib/string-utils";
import { getStandardReviewStatus } from "@/lib/get-format";
import { branchUnionIDToPathID } from "@/lib/id-parser";
import { fetchBranchReviewStatuses } from "@/lib/api/services/branch-api";
import Link from "next/link";

/**
 * Card that represents some post branch
 * @param branchUnion branch data
 * @param postPathID post path ID, used for routing
 * @param short makes the card less wide
 */
export default async function BranchCardMini({
  branchUnion,
  postPathID,
  short,
}: Readonly<{
  branchUnion: BranchUnionT;
  postPathID: string;
  short?: boolean;
}>) {
  const reviews = await fetchBranchReviewStatuses(branchUnion.branch.id);

  const status = getStandardReviewStatus(
    branchUnion.branch.branchOverallReviewStatus,
  ).short;

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

  return (
    <Link
      href={`/post/${postPathID}/version/${branchUnionIDToPathID(branchUnion.id)}`}
    >
      {short ? (
        <Card className="w-full">
          <CardBody>{titleAndCreateDate}</CardBody>
          <CardFooter>
            {updateDate}
            <div className="grow" />
            <ReviewChips reviews={reviews} />
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full">
          <CardHeader className="gap-2">
            {titleAndCreateDate}
            {updateDate}
            <div className="grow" />
            <ReviewChips reviews={reviews} />
          </CardHeader>
        </Card>
      )}
    </Link>
  );
}
