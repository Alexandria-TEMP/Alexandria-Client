"use client";

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRef } from "react";
import { UploadContentT } from "@/lib/types/custom-autocomplete-types";
import { FieldValues, useController } from "react-hook-form";

/**
 * Component which has the title and the available options for uploading content.
 * @returns a div containing the title and cards for each type of file upload option
 */
export default function UploadContentCard<FormType extends FieldValues>({
  name,
  control,
  rules,
}: UploadContentT<FormType>) {
  /* Register the field with the parent form */
  const { field, fieldState } = useController({ name, control, rules });

  /* I need a reference to the hidden html input elem so that i can simulate a click on it , whenever i click the add files button */
  const hiddenFile = useRef<HTMLInputElement | null>(null);

  /* when the button is clicked, also click the hidden input elem to actually open the select file prompt */
  const handleClick = () => {
    hiddenFile.current?.click();
  };

  /* when a file is selected, add it to the field in the form */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      field.onChange(file);
      field.onBlur();
    }
  };

  return (
    <div className={"space-y-2".concat(fieldState.error ? " text-danger" : "")}>
      <span>
        {/* title of the upload card, make red if validation does not pass */}
        <span
          className={"inline-block".concat(
            !fieldState.error ? "" : " text-danger",
          )}
        >
          <h2>Upload Content</h2>
        </span>
        {/* if uploading files is required, display required asterisk */}
        {rules?.required && (
          <span className="inline-block text-danger text-small">*</span>
        )}
      </span>
      <div className="flex flex-row gap-x-5">
        {/* card for uploading files from computer */}
        <Card
          className={"grow w-1/2".concat(
            !fieldState.error ? "" : " bg-danger-50",
          )}
          data-testid="upload-files-test-id"
        >
          <CardHeader aria-label={name}>Upload Files</CardHeader>

          <CardBody className={"space-y-2"}>
            {/* paragagraph diplaying the name of the uploaded file */}
            <p data-testid="upload-title">
              {field.value ? field.value.name : "No zip archive selected."}
            </p>

            {/* paragraph displaying the erorr message if the rules are not met */}
            {fieldState.error && (
              <p data-testid="upload-error">{fieldState.error.message}</p>
            )}

            {/* the button for opening file manager */}
            <Button onClick={handleClick} data-testid="upload-btn">
              {field.value ? "Change Project Zip" : "Upload Project Zip"}
            </Button>

            {/* the actual html input field where the file gets stored, 
            this is needed to actually store the file and handle opening the file explorer
            but it is hidden because it is ugly so i am using the other components to mask it */}
            <input
              ref={(e) => {
                field.ref(e);
                hiddenFile.current = e;
              }}
              id="upload-files"
              type="file"
              accept=".zip"
              hidden
              style={{ opacity: 0 }}
              onChange={handleChange}
              data-testid="upload-hidden-input"
            />
            {/* the description for uploading files */}
            {/* TODO be more explicit about what a user has to do */}
            <p
              className="text-tiny text-foreground-400"
              data-testid="upload-desc"
            >
              Please zip the files in your Quarto project before uploading. Do
              not zip the entire folder, zip directly the files and subfolders.
            </p>
          </CardBody>
        </Card>

        {/* card for importing project from GitHub, currently disabled, so no work was done on it */}
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
