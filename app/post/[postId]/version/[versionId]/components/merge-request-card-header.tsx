import { CardHeader, Chip } from "@nextui-org/react";
import HeaderSubtle from "@/components/header-subtle";
import { getMergeRequestData } from "@/lib/api-calls/merge-request-api";
import { capitalizeFirstLetter } from "@/lib/string-utils";
import LinkGroup from "@/post/[postId]/components/buttons/link-group";
import ContributeDropdown, {
  ContributeOptions,
} from "@/post/[postId]/components/buttons/contribute-dropdown";
import { reviewStatusToTensedVerb } from "@/lib/get-format";
import { idType } from "@/lib/types/api-types";

/**
 * Header for merge request contents card. Uses CardHeader, so it must be child of a Card.
 * Includes title, main metadata, and action buttons.
 *
 * TODO update jsdoc
 */
export default async function MergeRequestCardHeader({
  postId,
  mergeRequestId,
  hideContribute,
}: {
  postId: idType;
  mergeRequestId: idType;
  hideContribute?: boolean;
}) {
  const data = await getMergeRequestData(mergeRequestId);
  const status = reviewStatusToTensedVerb(data.mergeRequestDecision);

  const disabledContribute: ContributeOptions[] = (() => {
    switch (status) {
      case "accepted":
        return ["contribute", "review"];
      case "rejected":
        return ["review"];
      case "open":
        return ["contribute"];
    }
  })();

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
        {!hideContribute && (
          <ContributeDropdown disabled={disabledContribute} />
        )}

        <div className="grow" />

        <div className="flex-col">
          <HeaderSubtle>Completion</HeaderSubtle>
          <Chip>{capitalizeFirstLetter(data.updatedCompletionStatus)}</Chip>
        </div>

        <div className="flex-col">
          <HeaderSubtle>Status</HeaderSubtle>
          <Chip>{capitalizeFirstLetter(status)}</Chip>
        </div>

        <div className="flex-col">
          <HeaderSubtle>Created on {data.createdAt}</HeaderSubtle>
          {status !== "open" && (
            <HeaderSubtle>
              {`${capitalizeFirstLetter(status)} on ${data.updatedAt}`}
            </HeaderSubtle>
          )}
        </div>
      </CardHeader>
    </>
  );
}
