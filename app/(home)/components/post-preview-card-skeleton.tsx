import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Skeleton,
} from "@nextui-org/react";
import { LuMessagesSquare } from "react-icons/lu";
import { HiMiniDocumentText } from "react-icons/hi2";
import { FaUserGraduate } from "react-icons/fa";

/**
 * Skeleton for the post preview card
 * @returns a very similar looking card to the post preview one, with only icons in place and loading elements for the rest
 */
export default function PostPreviewCardSkeleton() {
  return (
    <Card className="p-3 w-full">
      <CardHeader className="flex flex-wrap justify-between flex-row-reverse space-y-5">
        <Skeleton className="rounded-lg">
          <Chip>Status of the post</Chip>
        </Skeleton>
        <div className="flex-col space-y-3">
          <Skeleton className="rounded-lg">
            <h2>
              The post title that is loading... and loading... and loading...
            </h2>
          </Skeleton>
          <Skeleton className="rounded-lg">
            <div className="flex-row flex flex-grow items-center">
              creatinodata date | lastupdate date
            </div>
          </Skeleton>
        </div>
      </CardHeader>
      <CardBody className="flex flex-col space-y-3">
        <div className="flex flex-row items-center space-x-2">
          <div>
            <FaUserGraduate />
          </div>
          <Skeleton className="rounded-lg">
            <div className="flex flex-row flex-grow w-full">
              Author 1, author 2, author 3, authors loading...
            </div>
          </Skeleton>
        </div>
      </CardBody>
      <CardFooter className="flex flex-row flex-wrap justify-between">
        <div className="flex flex-row space-x-1 items-center">
          <div>
            <HiMiniDocumentText />
          </div>
          <Skeleton className="rounded-lg">
            <div>Post type</div>
          </Skeleton>
        </div>
        <div className="flex flex-row space-x-1 items-center">
          <div>
            <LuMessagesSquare />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
