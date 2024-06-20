"use client";

import { idT } from "@/lib/types/api-types";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@nextui-org/react";
import { LuMessagesSquare } from "react-icons/lu";
import { HiMiniDocumentText } from "react-icons/hi2";
import { FaUserGraduate } from "react-icons/fa";
import PostPreviewCardSkeleton from "./post-preview-card-skeleton";
import { usePostPreviewData } from "@/lib/api/hooks/post-hooks";
import {
  capitalizeFirstLetter as cap,
  formatDateString,
} from "@/lib/string-utils";
import { getMemberName, getStandardReviewStatus } from "@/lib/get-format";
import HeaderSubtle from "@/components/common/header-subtle";
import ChipList from "@/components/common/chip-list";
import { useRouter } from "next/navigation";
import { postUnionIDToPathID } from "@/lib/id-parser";
import { MdTimelapse } from "react-icons/md";

/**
 * Returns a card that displays basic information about a post, namely title, review status,
 * creation and last update date, author list, scientific tags, post type and reply count
 * @param postID the Id of the post from which to get the data
 * @returns a card containing the information mentioned above
 */
export default function PostPreviewCard({ postID }: { postID: idT }) {
  const { data, isLoading, error } = usePostPreviewData(postID);
  const router = useRouter();

  if (isLoading) return <PostPreviewCardSkeleton />;

  if (!data || error) {
    console.warn(
      `homepage failed to load post ${postID} for reason ${error?.message ?? "data is undefined"}`,
    );
    return <></>;
  }

  // Shorthand for some values
  const reviewStatus = getStandardReviewStatus(
    data.projectPost?.postReviewStatus,
  );
  const scientificFields = data.scientificFields.map((i) => i.scientificField);
  const authors = data.authors.map(getMemberName);

  return (
    <Card
      className="p-3 w-full m-b-7"
      isPressable
      onPress={() => router.push(`/post/${postUnionIDToPathID(data.id)}`)}
    >
      <CardHeader className="flex flex-row justify-between -mb-5 items-start space-x-3">
        {/* Title */}
        <h2 className="text-start">{data.post.title}</h2>
        {/* Review status */}
        {data.projectPost && (
          <Chip
            color={
              reviewStatus.short === "accepted"
                ? "success"
                : reviewStatus.short === "rejected"
                  ? "danger"
                  : "default"
            }
          >
            {cap(reviewStatus.descriptive)}
          </Chip>
        )}
      </CardHeader>
      <CardBody className="flex flex-col space-y-3">
        {/* Dates */}
        <HeaderSubtle>
          Created on {formatDateString(data.post.createdAt)} | Last update on{" "}
          {formatDateString(data.post.updatedAt)}
        </HeaderSubtle>
        {/* Scientific fields */}
        <ChipList labels={scientificFields} />
        {/* Authors */}
        <div className="flex flex-row space-x-2">
          <FaUserGraduate />
          <p>{authors.reduceRight((name, accum) => `${accum}, ${name}`)}</p>
        </div>
      </CardBody>
      <CardFooter className="flex flex-row flex-wrap gap-5">
        {/* Post type */}
        <div className="flex flex-row space-x-1 items-center">
          <HiMiniDocumentText />
          <p>{cap(data.post.postType)}</p>
        </div>
        {/* Project post only settings */}
        {data.projectPost && (
          // Completion status
          <div className="flex flex-row space-x-1 items-center">
            <MdTimelapse />
            <p>{cap(data.projectPost.projectCompletionStatus)}</p>
          </div>
        )}
        <div className="grow" />
        {/* Number of discussions */}
        <div className="flex flex-row space-x-1 items-center">
          <LuMessagesSquare />
          <p>{data.numDiscussions}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
