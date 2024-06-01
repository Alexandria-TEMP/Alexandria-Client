"use client";

import getPostData from "@/lib/api-calls/post-api";
import { Card, CardBody, CardFooter, Chip, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IdProp } from "@/lib/types/react-props/id-prop";

/**
 * Mini card that represents a post. Clicking it redirects to the post page.
 *
 * @param id ID of post in card
 */
export default function PostCardMini({ id }: IdProp) {
  const router = useRouter();
  const [data, setData] = useState<
    | {
        id: string;
        title: string;
        status: string;
      }
    | undefined
  >(undefined); // TODO use the proper type
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    getPostData(id)
      .then((data) => {
        setData(data);
      })
      .catch(() => {
        setData(undefined);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [id]);

  return (
    <Card
      isPressable={data !== undefined}
      onPress={() => router.push(`/post/${data ? data.id : "missing"}`)}
      fullWidth
    >
      <CardBody>
        <Skeleton isLoaded={isLoaded}>
          <h2>{data !== undefined ? data.title : "Failed to get post data"}</h2>
        </Skeleton>
      </CardBody>
      <CardFooter>
        <Skeleton isLoaded={isLoaded}>
          <Chip>{data !== undefined ? data.status : "No status"}</Chip>
        </Skeleton>
      </CardFooter>
    </Card>
  );
}
