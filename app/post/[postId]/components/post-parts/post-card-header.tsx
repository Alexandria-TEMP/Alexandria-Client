import { CardHeader } from "@nextui-org/react";
import HeaderSubtle from "@/components/common/header-subtle";
import LinkGroup from "../buttons/link-group";
import ContributeDropdown from "../buttons/contribute-dropdown";
import fetchPostData from "@/lib/api/services/post-api";
import ChipWithTitle from "@/components/common/chip-with-title";
import { idT } from "@/lib/types/api-types";
import DownloadButton from "../buttons/download-button";
import { idPostUnionT } from "@/lib/types/post-union";
import { branchUnionIDToPathID, postUnionIDToPathID } from "@/lib/id-parser";
import { capitalizeFirstLetter as cap } from "@/lib/string-utils";
import { getStandardReviewStatus } from "@/lib/get-format";

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

  // Parsed data for conciser naming
  const reviewStatus = data.projectPost
    ? getStandardReviewStatus(data.projectPost.postReviewStatus)
    : undefined;

  const pathID = postUnionIDToPathID({ id: id as idT, isProject });

  const openBranchPathID =
    data.projectPost && data.projectPost.openBranchIDs.length > 0
      ? branchUnionIDToPathID({
          id: data.projectPost.openBranchIDs[0],
          isClosed: false,
        })
      : undefined;

  // Set up which routes will be in contribute button (if present)
  const contributeRoutes =
    !data.projectPost || hideContribute
      ? {}
      : {
          // Enabled buttons per status:
          // Accepted -> Fork, Contribute
          // Rejected -> Fork, Contribute
          // Open     -> Fork, Review
          fork: `/fork/${pathID}`,
          contribute:
            reviewStatus!.short === "open"
              ? undefined
              : `/propose-changes/${pathID}`,
          review:
            openBranchPathID === undefined ||
            reviewStatus!.short === "rejected" ||
            reviewStatus!.short === "accepted"
              ? undefined
              : `/post/${pathID}/version/${openBranchPathID}/review`,
        };

  // Set up which links will be in header's link group
  const links = [
    { label: "Contents", href: `/post/${pathID}` },
    // Only project posts have version list page
    ...(data.projectPost
      ? [{ label: "Versions", href: `/post/${pathID}/version-list` }]
      : []),
    { label: "Files", href: `/post/${pathID}/files` },
  ];

  return (
    <>
      {/* Title */}
      <CardHeader>
        <h1 className="font-semibold">{data.post.title}</h1>
      </CardHeader>

      <CardHeader className="-mt-4 flex gap-8">
        {/* Buttons */}

        <LinkGroup links={links} />
        <DownloadButton
          id={id as idT}
          container="post"
          projectTitle={data.post.title}
        />
        {!hideContribute && <ContributeDropdown routes={contributeRoutes} />}

        <div className="grow" />

        {/* Metadata */}

        <ChipWithTitle title="Post type">
          {cap(data.post.postType)}
        </ChipWithTitle>

        {data.projectPost && (
          <>
            <ChipWithTitle title="Status">
              {cap(reviewStatus!.descriptive)}
            </ChipWithTitle>

            <ChipWithTitle title="Completion">
              {cap(data.projectPost.projectCompletionStatus)}
            </ChipWithTitle>

            <ChipWithTitle title="Feedback">
              {cap(data.projectPost.projectFeedbackPreference)}
            </ChipWithTitle>
          </>
        )}

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
