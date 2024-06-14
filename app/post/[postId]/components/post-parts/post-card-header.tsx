import { CardHeader } from "@nextui-org/react";
import HeaderSubtle from "@/components/common/header-subtle";
import LinkGroup from "../buttons/link-group";
import ContributeDropdown from "../buttons/contribute-dropdown";
import fetchPostData from "@/lib/api-calls/post-api";
import ChipWithTitle from "@/components/common/chip-with-title";
import { idT } from "@/lib/types/api-types";
import DownloadButton from "../buttons/download-button";
import { idPostUnionT } from "@/lib/types/post-union";

/**
 * Header for post contents card. Uses CardHeader, so it must be child of a Card.
 * Includes title, main metadata, and action buttons.
 * @param id Post ID
 * @param hideContribute Hides contribute button and dropdown
 */
export default async function PostCardHeader({
  id,
  isProject,
  hideContribute,
}: Readonly<
  idPostUnionT & {
    hideContribute?: boolean;
  }
>) {
  const data = await fetchPostData({ id: id as idT, isProject });

  const contributeRoutes = {
    // TODO peer reviewed/rejected -> disable review & open -> disable contribute
    fork: `/todo`,
    contribute: `/propose-changes/${id}`,
    review: `/todo`,
  };

  // TODO disable versions for non project post

  return (
    <>
      {/* Title */}
      <CardHeader>
        <h1 className="font-semibold">{data.post.title}</h1>
      </CardHeader>

      <CardHeader className="-mt-4 flex gap-8">
        {/* Buttons */}

        <LinkGroup
          links={[
            { label: "Contents", href: `/post/${id}` },
            { label: "Versions", href: `/post/${id}/version-list` },
            { label: "Files", href: `/post/${id}/files` },
          ]}
        />

        <DownloadButton
          id={0} // TODO {data.currentVersion.id}
        />

        {!hideContribute && <ContributeDropdown routes={contributeRoutes} />}

        <div className="grow" />

        {/* Metadata */}

        <ChipWithTitle title="Post type">{data.post.postType}</ChipWithTitle>
        <ChipWithTitle title="Status">
          {/* TODO */}
          {0}
          {/* {data.status} */}
        </ChipWithTitle>

        <div className="flex-col">
          <HeaderSubtle>
            Created on
            {/* TODO */}
            {0}
            {/* {data.createdAt} */}
          </HeaderSubtle>
          <HeaderSubtle>
            Last update on
            {/* TODO */}
            {0}
            {/* {data.updatedAt} */}
          </HeaderSubtle>
        </div>
      </CardHeader>
    </>
  );
}
