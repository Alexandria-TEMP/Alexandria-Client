"use client";

import { Card, CardBody } from "@nextui-org/react";
import { idType } from "@/lib/types/api-types";
import VersionRender from "@/post/[postId]/components/version-render/component";
import { useState } from "react";
import MergeRequestCardHeader from "./merge-request-card-header";

// TODO jsdoc
export default function CompareVersionContentCard({
  footer,
  newVersionId,
  previousVersionId,
  postId,
  mergeRequestId,
}: Readonly<{
  footer?: React.ReactNode;
  newVersionId: idType;
  previousVersionId: idType;
  postId: idType;
  mergeRequestId: idType;
}>) {
  const [compare, setCompare] = useState(false);

  return (
    <Card>
      <MergeRequestCardHeader
        postId={postId}
        mergeRequestId={mergeRequestId}
        onCompare={setCompare}
      />

      {compare && (
        <CardBody className="flex flex-row w-full justify-evenly">
          <h3>New version</h3>
          <div></div>
          <h3>Replaced version</h3>
        </CardBody>
      )}

      <CardBody className="flex flex-row gap-3 w-full">
        <div className={compare ? "w-1/2" : "w-full"}>
          <VersionRender id={newVersionId.toString()} />
        </div>

        <div className={compare ? "w-1/2" : "hidden"}>
          <VersionRender id={previousVersionId.toString()} />
        </div>
      </CardBody>

      {footer}
    </Card>
  );
}
