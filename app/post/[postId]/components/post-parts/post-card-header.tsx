import { CardHeader } from "@nextui-org/react";
import HeaderSubtle from "@/components/common/header-subtle";
import LinkGroup from "../buttons/link-group";
import ContributeDropdown from "../buttons/contribute-dropdown";
import getPostData from "@/lib/api/services/post-api";
import ChipWithTitle from "@/components/common/chip-with-title";
import { PostT, idT } from "@/lib/types/api-types";
import DownloadButton from "../buttons/download-button";
import { IdProp } from "@/lib/types/react-props/id-prop";

/**
 * Header for post contents card. Uses CardHeader, so it must be child of a Card.
 * Includes title, main metadata, and action buttons.
 * @param id Post ID
 * @param hideContribute Hides contribute button and dropdown
 */
export default async function PostCardHeader({
  id,
  hideContribute,
}: IdProp & {
  hideContribute?: boolean;
}) {
  const data: PostT = await getPostData(id as idT);

  const contributeRoutes = {
    // TODO peer reviewed/rejected -> disable review & open -> disable contribute
    fork: `/todo`,
    contribute: `/propose-changes/${id}`,
    review: `/todo`,
  };

  return (
    <>
      {/* Title */}
      <CardHeader>
        <h1 className="font-semibold">{data.title}</h1>
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

        <ChipWithTitle title="Post type">{data.postType}</ChipWithTitle>
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
