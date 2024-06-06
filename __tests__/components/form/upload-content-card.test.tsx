import { expect, describe, it } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import UploadContentCard from "@/components/form/upload-content-card";
import { useForm, FormProvider } from "react-hook-form";
import userEvent from "@testing-library/user-event";

const Wrapper = ({
  children,
  defaults,
}: {
  children: React.ReactNode;
  defaults: File | null;
}) => {
  const methods = useForm({
    defaultValues: {
      dumItem: defaults,
    },
    mode: "onTouched",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("Upload content tests", () => {
  beforeEach(() => {
    render(
      <Wrapper defaults={null}>
        <UploadContentCard name="files" />
      </Wrapper>,
    );
  });

  it("renders title and cards", () => {
    const titleElem = screen.getByText("Upload Content");
    const fileCard = screen.getByTestId("upload-files-test-id");
    const githubCard = screen.getByTestId("import-github-test-id");

    expect(titleElem).toBeInTheDocument();
    expect(fileCard).toBeInTheDocument();
    expect(githubCard).toBeInTheDocument();
  });

  it("renders correct elements inside upload files card", () => {
    const title = screen.getByTestId("upload-title");
    const btn = screen.getByTestId("upload-btn");
    const hiddenInput = screen.getByTestId("upload-hidden-input");
    const desc = screen.getByTestId("upload-desc");
    const noFilesMessage = screen.getByText("No zip archive selected.");

    expect(title).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(hiddenInput).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
    expect(noFilesMessage).toBeInTheDocument();
  });

  it("clicks on hidden input when button is clicked", async () => {
    const btn = screen.getByTestId("upload-btn");
    const hiddenInput = screen.getByTestId("upload-hidden-input");

    jest.spyOn(hiddenInput, "click");

    fireEvent.click(btn);

    expect(hiddenInput.click).toHaveBeenCalledTimes(1);
  });

  it("displays file name when uploaded", async () => {
    const hiddenInput = screen.getByTestId("upload-hidden-input");

    await userEvent.upload(hiddenInput, new File([""], "test.zip"));

    const fileName = screen.getByText("test.zip");
    expect(fileName).toBeInTheDocument();
  });
});

describe("Upload content is required tests", () => {
  beforeEach(() => {
    render(
      <Wrapper defaults={null}>
        <UploadContentCard
          name="files"
          rules={{
            required: {
              value: true,
              message: "Please upload a zipped version of your project.",
            },
          }}
        />
      </Wrapper>,
    );
  });

  it("shows danger asterisk", () => {
    const asterisk = screen.getByText("*");
    expect(asterisk).toBeInTheDocument();
  });
});
