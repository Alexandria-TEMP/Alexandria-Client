// Needs to be a client component due to a bug in NextUI
// see https://github.com/nextui-org/nextui/issues/1342
"use client";

import { IdProp } from "@/lib/id-prop";
import { Tab, Tabs } from "@nextui-org/react";
import VersionCard from "./version-card";

/**
 * Renders a tabbed list view of post versions.
 * Includes the tabs "Version history", "Proposed changes" and "Rejected changes".
 *
 * @param id ID of Post to get version from
 */
export default function VersionTabs({ id }: IdProp) {
  return (
    <Tabs>
      <Tab key="history" title="Version history">
        <VersionCard id={"placeholder"} />
        <VersionCard id={"placeholder"} />
        <VersionCard id={"placeholder"} />
        <VersionCard id={"placeholder"} />
      </Tab>
      <Tab key="open" title="Proposed changes">
        <VersionCard id={"placeholder"} />
      </Tab>
      <Tab key="rejected" title="Rejected changes">
        <VersionCard id={"placeholder"} />
      </Tab>
    </Tabs>
  );
}
