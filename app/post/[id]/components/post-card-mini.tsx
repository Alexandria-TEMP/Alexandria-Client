"use client";

import getPostData from "../lib/post-api";
import { Card, CardBody, CardFooter, Chip, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PostCardMini({ postId }: Readonly<{ postId: string }>) {
  const router = useRouter();
  const [data, setData] = useState<any>(null); // TODO don't use 'any'!
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    getPostData(postId).then((data) => {
      setData(data);
      setLoaded(true);
    });
  }, [postId]);

  return (
    <Card
      isPressable={data !== null}
      onPress={() => router.push(`/post/${data.id}`)}
      fullWidth
    >
      <CardBody>
        <Skeleton isLoaded={isLoaded}>
          <h2>{data !== null ? data.title : "Failed to get post data"}</h2>
        </Skeleton>
      </CardBody>
      <CardFooter>
        <Chip>{data !== null ? data.status : "No status"}</Chip>
      </CardFooter>
    </Card>
  );
}
