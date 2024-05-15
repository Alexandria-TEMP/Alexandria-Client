import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

// TODO this will need some props for returning the files somehow
/**
 * Component which has the title and the available options for uploading content.
 * @return a div containing the title and cards for each type of file upload option
 */
export default function UploadContentCard() {
  return (
    <div className="space-y-2">
      <h2>Upload Content</h2>
      <div className="flex flex-row gap-x-5">
        <Card className="grow w-1/2" data-testid="upload-files-test-id">
          <CardHeader>Upload Files</CardHeader>
          <CardBody>
            <Button>Add Files</Button>
          </CardBody>
        </Card>
        <Card className="grow w-1/2" data-testid="import-github-test-id">
          <CardHeader>Import From GitHub (disabled) </CardHeader>
          <CardBody>
            <Input
              placeholder="Input GitHub repository link..."
              disabled={true} // TODO make it more clear that it is disabled cause it does not look like it atm
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
