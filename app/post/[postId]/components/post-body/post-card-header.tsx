import { CardHeader, Chip } from "@nextui-org/react";
import HeaderSubtle from "@/components/header-subtle";
import LinkGroup from "./link-group";
import ContributeDropdown, { ContributeOptions } from "./contribute-dropdown";
import getPostData from "@/lib/api-calls/post-api";

/**
 * Header for post contents card. Uses CardHeader, so it must be child of a Card.
 * Includes title, main metadata, and action buttons.
 *
 * @param postId Post ID
 * @param hideContribute Hides contribute button and dropdown
 * @param disabledContribute Disables specific options in contribute dropdown
 */
export default async function PostCardHeader({
  postId,
  hideContribute,
  disabledContribute,
}: {
  postId: string;
  hideContribute?: boolean;
  disabledContribute?: ContributeOptions[];
}) {
  const data = await getPostData(postId);

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

        <div className="flex-col">
          <HeaderSubtle>Post type</HeaderSubtle>
          <Chip>{data.postType}</Chip>
        </div>
        <div className="flex-col">
          <HeaderSubtle>Status</HeaderSubtle>
          <Chip>{data.status}</Chip>
        </div>
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
