// Needs to be a client component due to a bug in NextUI
// see https://github.com/nextui-org/nextui/issues/1342
"use client";

import { Tab, Tabs } from "@nextui-org/react";

/**
 * Renders a tabbed list view of post branches.
 * Includes the tabs "Version history", "Proposed changes" and "Rejected changes".
 * @param historyList Component that gets rendered on the "Version history" tab
 * @param openList Component that gets rendered on the "Proposed changes" tab
 * @param rejectedList Component that gets rendered on the "Rejected changes" tab
 */
export default function BranchTabs({
  // Since this has to be a client component, including `BranchList`s  or `BranchCard`s
  // here as children of <Tab> would force those component to also be client components
  // As a workaround, we take in `BranchList`s as props here
  historyList,
  openList,
  rejectedList,
}: Readonly<{
  historyList: React.ReactNode;
  openList: React.ReactNode;
  rejectedList: React.ReactNode;
}>) {
  return (
    <Tabs>
      <Tab key="history" title="Version history">
        {historyList}
      </Tab>
      <Tab key="open" title="Proposed changes">
        {openList}
      </Tab>
      <Tab key="rejected" title="Rejected changes">
        {rejectedList}
      </Tab>
    </Tabs>
  );
}
