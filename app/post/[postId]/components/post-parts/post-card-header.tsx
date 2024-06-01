import { CardHeader } from "@nextui-org/react";
import HeaderSubtle from "@/components/header-subtle";
import LinkGroup from "../buttons/link-group";
import ContributeDropdown, {
  ContributeOptions,
} from "../buttons/contribute-dropdown";
import getPostData from "@/lib/api-calls/post-api";
import ChipWithTitle from "@/components/chip-with-title";

/**
 * Header for post contents card. Uses CardHeader, so it must be child of a Card.
 * Includes title, main metadata, and action buttons.
 *
 * @param postId Post ID
 * @param hideContribute Hides contribute button and dropdown
 */
export default async function PostCardHeader({
  postId,
  hideContribute,
}: {
  postId: string;
  hideContribute?: boolean;
}) {
  const data = await getPostData(postId);

  // TODO peer reviewed/rejected -> disable review & open -> disable contribute
  const disabledContribute: ContributeOptions[] = [];

  return (
    <>
      {/* Title */}
      <CardHeader>
        <h1 className="font-semibold">{data.title}</h1>
      </CardHeader>

      {/* (part of) Metadata */}
      <CardHeader className="-mt-4 flex gap-12">
        <LinkGroup
          links={[
            { label: "Contents", href: `/post/${postId}` },
            { label: "Versions", href: `/post/${postId}/version-list` },
            { label: "Files", href: `/post/${postId}/files` },
          ]}
        />

        {!hideContribute && (
          <ContributeDropdown disabled={disabledContribute} />
        )}

        <div className="grow" />

        <ChipWithTitle title="Post type">{data.postType}</ChipWithTitle>
        <ChipWithTitle title="Status">{data.status}</ChipWithTitle>

        <div className="flex-col">
          <HeaderSubtle>
            Created on {data.createdAt.toLocaleDateString()}
          </HeaderSubtle>
          <HeaderSubtle>
            Last update on {data.updatedAt.toLocaleDateString()}
          </HeaderSubtle>
        </div>
      </CardHeader>
    </>
  );
}
