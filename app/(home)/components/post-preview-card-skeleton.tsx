import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Skeleton,
} from "@nextui-org/react";
import { LuMessagesSquare } from "react-icons/lu";
import { HiMiniDocumentText } from "react-icons/hi2";
import { FaUserGraduate } from "react-icons/fa";
import HeaderSubtle from "@/components/common/header-subtle";
import ChipList from "@/components/common/chip-list";

/**
 * Skeleton for the post preview card
 * @returns a very similar looking card to the post preview one, with only icons in place and loading elements for the rest
 */
export default function PostPreviewCardSkeleton() {
  return (
    <Card className="p-3 w-full m-b-7">
      <CardHeader className="flex flex-row justify-between -mb-5 items-start space-x-3">
        {/* Title */}
        <Skeleton className="rounded-lg">
          <h2 className="text-start">
            This post title is currently loading...
          </h2>
        </Skeleton>
      </CardHeader>
      <CardBody className="flex flex-col space-y-3">
        {/* Dates */}
        <Skeleton className="rounded-lg">
          <HeaderSubtle>Created on DATE | Last update on DATE</HeaderSubtle>
        </Skeleton>
        {/* Scientific fields */}
        <Skeleton className="rounded-lg">
          <ChipList labels={["Field 1", "Field 2"]} />
        </Skeleton>
        {/* Authors */}
        <div className="flex flex-row space-x-2">
          <FaUserGraduate />
          <Skeleton className="rounded-lg">
            <p>Nikolaus Copernicus, Marie Curie, Albert Einstein</p>
          </Skeleton>
        </div>
      </CardBody>
      <CardFooter className="flex flex-row flex-wrap gap-5">
        {/* Post type */}
        <div className="flex flex-row space-x-1 items-center">
          <HiMiniDocumentText />
          <Skeleton className="rounded-lg">
            <p>Post type</p>
          </Skeleton>
        </div>
        <div className="grow" />
        {/* Number of discussions */}
        <div className="flex flex-row space-x-1 items-center">
          <LuMessagesSquare />
          <Skeleton className="rounded-lg">
            <p>0</p>
          </Skeleton>
        </div>
      </CardFooter>
    </Card>
  );
}
