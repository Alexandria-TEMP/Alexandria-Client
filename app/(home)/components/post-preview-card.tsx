"use client"; // had to make this a client component because otherwise i could not have interleaved it inside more-posts

import { getPostById } from "@/lib/api-calls/post-api";
import { ScientificFieldT, idT } from "@/lib/types/api-types";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@nextui-org/react";
import ChipList from "./common/chip-list";
// import { getVersionData } from "@/lib/api-calls/version-api";
import { LuMessagesSquare } from "react-icons/lu";
import { HiMiniDocumentText } from "react-icons/hi2";
import { getFieldById } from "@/lib/api-calls/fields-api";
import getMemberData from "@/lib/api-calls/member-api";
import { getMemberName } from "@/lib/get-format";
// import HeaderSubtle from "./common/header-subtle";
// import { RxDividerVertical } from "react-icons/rx";
import { FaUserGraduate } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import PostPreviewCardSkeleton from "./post-preview-card-skeleton";
import { PostT } from "@/lib/types/api-types";

/**
 * Returns a card that displays basic information about a post, namely title, review status,
 * creation and last update date, author list, scientific tags, post type and reply count
 * @param postId the Id of the post from which to get the data
 * @returns a card containing the information mentioned above
 */
export default function PostPreviewCard({ postId }: { postId: idT }) {
  const [postData, setPostData] = useState<PostT | null>(null);
  // const [discusionData, setDiscussionData] = useState<BranchT | null>(null);
  const [tags, setTags] = useState<string[] | null>(null);
  const [authors, setAuthors] = useState<string[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const pdata = await getPostById(postId);
      setPostData(pdata);

      // setDiscussionData(await getVersionData(1));

      const tagsPromises = pdata.scientificFields.map(async (id) => {
        return getFieldById(Number(id));
      });
      const tagdata = (await Promise.all(tagsPromises)).map(
        (t: ScientificFieldT) => t.label,
      );
      setTags(tagdata);

      const authorsPromises = pdata.collaboratorIDs.map(
        async (
          id, // TODO change to get authors specifically
        ) => getMemberData(id),
      );
      const adata = (await Promise.all(authorsPromises)).map((a) =>
        getMemberName(a),
      );
      setAuthors(adata);
    };

    getData().catch((e) => console.log(e));
  }, [postId]);

  // || !discusionData
  if (!postData || !authors || !tags) return <PostPreviewCardSkeleton />;

  return (
    <div>
      <Link href={"/post/" + postId}>
        <Card className="p-3 w-full">
          <CardHeader className="flex justify-between flex-row-reverse space-y-3 items-start space-x-3">
            <div>
              <Chip
              // color={
              //   postData.renderStatus == "Open for review" // TODO this will need to be updated with the actual values returned from the api
              //     ? "default"
              //     : postData.renderStatus == "Revision needed"
              //       ? "danger"
              //       : "success"
              // }
              // TODO this needs to be completion status, not render status
              >
                {postData.renderStatus}
              </Chip>
            </div>
            <div className="flex-col">
              <h2>{postData.title}</h2>
              {/* <div className="flex-row flex flex-grow items-center">
                <HeaderSubtle>Created on {postData.createdAt}</HeaderSubtle>
                <RxDividerVertical />
                <HeaderSubtle>Last update on {postData.updatedAt}</HeaderSubtle>
              </div> */}
            </div>
          </CardHeader>
          <CardBody className="flex flex-col space-y-3">
            <div className="flex flex-row items-center space-x-2">
              <div>
                <FaUserGraduate />
              </div>
              <div>{authors.map((a) => a + ", ")}</div>
            </div>
            <ChipList labels={tags}></ChipList>
          </CardBody>
          <CardFooter className="flex flex-row flex-wrap justify-between">
            <div className="flex flex-row space-x-1 items-center">
              {/* TODO maybe make the icon change based on post type */}
              <div>
                <HiMiniDocumentText />
              </div>
              <div>{postData.postType}</div>
              {/* TODO maybe add icons for feedback preferences and completion type if its a project post, this would require an extra request to server and logic */}
            </div>
            <div className="flex flex-row space-x-1 items-center">
              <div>
                <LuMessagesSquare />
              </div>
              {/* <div>{discusionData.discussionIDs.length}</div> */}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
