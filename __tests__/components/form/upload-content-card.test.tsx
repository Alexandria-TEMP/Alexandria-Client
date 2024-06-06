import { expect, describe, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import UploadContentCard from "@/components/form/upload-content-card";
import { useForm, FormProvider } from "react-hook-form";

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

describe("Upload content", () => {
  it("renders correct elements", () => {
    render(
      <Wrapper defaults={null}>
        <UploadContentCard name="files" />
      </Wrapper>,
    );

    const titleElem = screen.getByText("Upload Content");
    const fileCard = screen.getByTestId("upload-files-test-id");
    const githubCard = screen.getByTestId("import-github-test-id");

    expect(titleElem).toBeInTheDocument();
    expect(fileCard).toBeInTheDocument();
    expect(githubCard).toBeInTheDocument();
  });
});
