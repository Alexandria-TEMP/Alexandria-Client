"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Radio,
  RadioGroup,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Input box for a new peer review
 */
export default function PeerReviewInput() {
  // Needed to navigate back when cancelling a review
  const router = useRouter();

  const [feedback, setFeedback] = useState<string | undefined>(undefined);
  const [approval, setApproval] = useState<string | undefined>(undefined); // TODO api typing

  return (
    <Card isBlurred className="sticky top-20 z-50">
      <CardBody>
        <Textarea
          value={feedback}
          onValueChange={setFeedback}
          isInvalid={feedback === ""}
          minRows={5}
          label="Your review"
          labelPlacement="outside"
          placeholder="Enter your feedback for this proposal..."
          variant="bordered"
          fullWidth
          classNames={{
            label: "text-lg font-semibold",
          }}
        />
      </CardBody>
      <CardFooter>
        <RadioGroup
          value={approval}
          onValueChange={setApproval}
          orientation="horizontal"
        >
          <Radio color="success" value="approve">
            Approve
          </Radio>
          <Radio color="danger" value="reject">
            Reject
          </Radio>
        </RadioGroup>
        {/* TODO submit functionality with forms */}
        <div className="grow" />
        <Button
          isDisabled={!approval || !feedback || feedback === ""}
          color="primary"
        >
          Submit review
        </Button>
        <Button className="ml-2" onPress={() => router.back()}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}