import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

// TODO this will need some props for returning the files somehow
export default function UploadContentCard() {
  return (
    <div className="space-y-2">
      <h2>Input Content</h2>
      <div className="flex flex-row gap-x-5">
        <Card className="grow w-1/2">
          <CardHeader>Upload Files</CardHeader>
          <CardBody>
            <Button>Add Files</Button>
          </CardBody>
        </Card>
        <Card className="grow w-1/2">
          <CardHeader>Import From GitHub</CardHeader>
          <CardBody>
            <Input placeholder="Input GitHub repository link..."></Input>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
