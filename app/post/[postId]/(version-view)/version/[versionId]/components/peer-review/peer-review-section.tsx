// Needs to be a client component due to a bug in NextUI
// see https://github.com/nextui-org/nextui/issues/1342
"use client";

import { idType } from "@/lib/types/api-types";
import PeerReview from "./peer-review";
import { Tabs, Tab } from "@nextui-org/tabs";
import { useMemo } from "react";

/**
 * Shows a tabbed view of the current peer reviews
 * @param reviewIDs ID of displayed peer reviews
 */
export default function PeerReviewSection({
  reviewIDs,
}: Readonly<{ reviewIDs: idType[] }>) {
  const items = useMemo(
    () => reviewIDs.map((id, index) => ({ id, index: index + 1 })),
    [reviewIDs],
  );

  return (
    <Tabs items={items} fullWidth variant="light">
      {(item) => (
        <Tab key={item.id} title={`Review ${item.index}`} className="w-full">
          <PeerReview id={item.id.toString()} />
        </Tab>
      )}
    </Tabs>
  );
}
