import { Card, CardBody, CardFooter, Chip, Skeleton } from "@nextui-org/react";

/**
 * Placeholder card for [PostCardMini](./post-card-mini.tsx), which
 * can be rendered while it loads.
 */
export default function PostCardMiniSkeleton() {
  return (
    <Card isPressable={false} fullWidth>
      <CardBody>
        <Skeleton>
          <h2>Loading post data</h2>
        </Skeleton>
      </CardBody>
      <CardFooter>
        <Skeleton>
          <Chip>No status</Chip>
        </Skeleton>
      </CardFooter>
    </Card>
  );
}
