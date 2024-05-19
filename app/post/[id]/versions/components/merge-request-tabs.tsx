// Needs to be a client component due to a bug in NextUI
// see https://github.com/nextui-org/nextui/issues/1342
"use client";

import { IdProp } from "@/lib/id-prop";
import { Tab, Tabs } from "@nextui-org/react";
import MergeRequestCard from "./merge-request-card";

/**
 * Renders a tabbed list view of post versions.
 * Includes the tabs "Version history", "Proposed changes" and "Rejected changes".
 *
 * @param id ID of Post to get version from
 */
export default function MergeRequestTabs({ id }: IdProp) {
  return (
    <Tabs>
      <Tab key="history" title="Version history">
        <MergeRequestCard id={"placeholder"} />
        <MergeRequestCard id={"placeholder"} />
        <MergeRequestCard id={"placeholder"} />
        <MergeRequestCard id={"placeholder"} />
      </Tab>
      <Tab key="open" title="Proposed changes">
        <MergeRequestCard id={"placeholder"} />
      </Tab>
      <Tab key="rejected" title="Rejected changes">
        <MergeRequestCard id={"placeholder"} />
      </Tab>
    </Tabs>
  );
}
