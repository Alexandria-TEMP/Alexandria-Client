import { CardHeader } from "@nextui-org/react";
import HeaderSubtle from "@/components/header-subtle";
import { getMergeRequestData } from "@/lib/api-calls/merge-request-api";
import { capitalizeFirstLetter } from "@/lib/string-utils";
import LinkGroup from "@/post/[postId]/components/buttons/link-group";
import ContributeDropdown from "@/post/[postId]/components/buttons/contribute-dropdown";
import { reviewStatusToTensedVerb } from "@/lib/get-format";
import { idType } from "@/lib/types/api-types";
import ChipWithTitle from "@/components/chip-with-title";

/**
 * Header for merge request contents card. Uses CardHeader, so it must be child of a Card.
 * Includes title, main metadata, and action buttons.
 *
 * TODO update jsdoc
 */
export default async function MergeRequestCardHeader({
  postId,
  mergeRequestId,
}: {
  postId: idType;
  mergeRequestId: idType;
}) {
  const data = await getMergeRequestData(mergeRequestId);
  const status = reviewStatusToTensedVerb(data.mergeRequestDecision);

  const contributeRoutes = {
    // Enabled buttons per status:
    // Accepted -> Fork
    // Rejected -> Fork, Contribute
    // Open     -> Fork, Review
    fork: `/todo`,
    contribute: status == "rejected" ? `/todo` : undefined,
    review: status == "open" ? `/todo` : undefined,
  };

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
            {
              href: `/post/${postId}/version/${mergeRequestId}`,
              label: "Contents",
            },
            {
              href: `/post/${postId}/version/${mergeRequestId}/files`,
              label: "Files",
            },
          ]}
        />

        {/* TODO actions */}
        <ContributeDropdown routes={contributeRoutes} />

        {/* TODO add review chips somewhere here */}

        <div className="grow" />

        <ChipWithTitle title="Completion">
          {capitalizeFirstLetter(data.updatedCompletionStatus)}
        </ChipWithTitle>

        <ChipWithTitle title="Status">
          {capitalizeFirstLetter(status)}
        </ChipWithTitle>

        <div className="flex-col">
          {status === "open" ? (
            <>
              <HeaderSubtle>Created on</HeaderSubtle>
              <HeaderSubtle>{data.createdAt}</HeaderSubtle>
            </>
          ) : (
            <>
              <HeaderSubtle>Created on {data.createdAt}</HeaderSubtle>
              <HeaderSubtle>
                {`${capitalizeFirstLetter(status)} on ${data.updatedAt}`}
              </HeaderSubtle>
            </>
          )}
        </div>
      </CardHeader>
    </>
  );
}
