import { CardHeader, Chip } from "@nextui-org/react";
import HeaderSubtle from "@/components/header-subtle";
import { IdProp } from "@/lib/id-prop";
import { getMergeRequestData } from "@/lib/api-calls/merge-request-api";
import { capitalizeFirstLetter } from "@/lib/string-utils";
import LinkGroup from "@/post/[postId]/components/buttons/link-group";
import ContributeDropdown from "@/post/[postId]/components/buttons/contribute-dropdown";

/**
 * Header for merge request contents card. Uses CardHeader, so it must be child of a Card.
 * Includes title, main metadata, and action buttons.
 *
 * @param id Merge request ID
 */
export default async function MergeRequestCardHeader({
  id,
  hideContribute,
}: IdProp & {
  hideContribute?: boolean;
}) {
  const data = await getMergeRequestData(id);

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
            { href: `/todo`, label: "Contents" },
            { href: `/todo`, label: "Files" },
          ]}
        />
        {!hideContribute && <ContributeDropdown />}

        <div className="grow" />

        <div className="flex-col">
          <HeaderSubtle>Completion</HeaderSubtle>
          <Chip>{data.updatedCompletionStatus}</Chip>
        </div>
        <div className="flex-col">
          <HeaderSubtle>Status</HeaderSubtle>
          <Chip>{data.status}</Chip>
        </div>
        <div className="flex-col">
          <HeaderSubtle>
            Created on {data.createdAt.toLocaleDateString()}
          </HeaderSubtle>
          {data.status !== "open" && (
            <HeaderSubtle>
              {`${capitalizeFirstLetter(data.status)} on ${data.closedAt.toLocaleDateString()}`}
            </HeaderSubtle>
          )}
        </div>
      </CardHeader>
    </>
  );
}
