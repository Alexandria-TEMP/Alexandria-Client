"use client";

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRef } from "react";

/**
 * Component which has the title and the available options for uploading content.
 * @return a div containing the title and cards for each type of file upload option
 */
export default function UploadContentCard() {
  const hiddenFile = useRef<HTMLInputElement>(null);

  const handleClick = () => hiddenFile.current?.click();

  return (
    <div className="space-y-2">
      <h2>Upload Content</h2>
      <div className="flex flex-row gap-x-5">
        <Card className="grow w-1/2" data-testid="upload-files-test-id">
          <CardHeader>Upload Files</CardHeader>
          <CardBody>
            <Button onClick={handleClick}>Add Files</Button>
            <input
              id="upload-files"
              type="file"
              accept=".zip"
              className="button"
              hidden
              ref={hiddenFile}
              style={{ display: "none" }}
            />
          </CardBody>
        </Card>
        <Card
          className="grow w-1/2"
          isDisabled={true}
          data-testid="import-github-test-id"
        >
          <CardHeader>Import From GitHub (disabled) </CardHeader>
          <CardBody>
            <Input
              placeholder="Input GitHub repository link..."
              isDisabled={true}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
