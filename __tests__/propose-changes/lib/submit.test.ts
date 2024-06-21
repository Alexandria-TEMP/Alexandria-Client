import { expect, describe, it } from "@jest/globals";
import { FormType, submitHandler } from "@/propose-changes/[postId]/lib/submit";
import {
  AppRouterInstance,
  NavigateOptions,
  PrefetchOptions,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  postBranchesIdUpload,
  postBranches,
} from "@/lib/api/services/branch-api";
import {
  dummyBranches,
  dummyPost,
  dummyProjectPost,
} from "~/__tests__/__utils__/dummys";

jest.mock("@/lib/api/services/branch-api");

describe("Submit new branch tests", () => {
  const dummySetLoading = jest.fn();
  const dummyOnError = jest.fn();
  const dummySetErrorMsg = jest.fn();
  const dummyAccessToken = "token";
  const dummyRouter: AppRouterInstance = {
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    push: jest.fn((href: string, options?: NavigateOptions) => {}),
    replace: jest.fn((href: string, options?: NavigateOptions) => {}),
    prefetch: jest.fn((href: string, options?: PrefetchOptions) => {}),
  };
  const dummyFormData: FormType = {
    branchTitle: "t",
    anonymous: true,
    collaboratingMemberIDs: [1, 2],
    projectPostID: 1,
    updatedPostTitle: "tite",
    updatedScientificFieldIDs: [3, 4],
    updatedCompletionStatus: "idea",
    updatedFeedbackPreferences: "formal feedback",
    newFile: new File([], "name.txt"),
  };

  (postBranches as jest.Mock).mockImplementation(
    () => dummyBranches.open.branch,
  );
  (postBranchesIdUpload as jest.Mock).mockImplementation(() => true);

  it("calls correct branch functions on success", async () => {
    await submitHandler(
      dummyFormData,
      dummyAccessToken,
      dummySetLoading,
      dummyOnError,
      dummySetErrorMsg,
      dummyRouter,
    );

    expect(postBranches).toHaveBeenCalledTimes(1);
    expect(postBranches).toHaveBeenCalledWith(
      {
        anonymous: dummyFormData.anonymous,
        collaboratingMemberIDs: dummyFormData.collaboratingMemberIDs,
        projectPostID: dummyFormData.projectPostID,
        branchTitle: dummyFormData.branchTitle,
        updatedCompletionStatus: dummyFormData.updatedCompletionStatus,
        updatedFeedbackPreferences: dummyFormData.updatedFeedbackPreferences,
        updatedPostTitle: dummyFormData.updatedPostTitle,
        updatedScientificFieldIDs: dummyFormData.updatedScientificFieldIDs,
      },
      dummyAccessToken,
    );
    expect(postBranchesIdUpload).toHaveBeenCalledTimes(1);
    expect(postBranchesIdUpload).toHaveBeenCalledWith(
      dummyBranches.open.branch.id,
      dummyFormData.newFile,
      dummyAccessToken,
    );
    expect(dummyRouter.push).toHaveBeenCalledWith(
      "/post/p-" +
        dummyProjectPost.id +
        "/version/o-" +
        dummyBranches.open.branch.id,
    );
    expect(dummySetLoading).toHaveBeenCalledTimes(2);
    expect(dummyOnError).not.toHaveBeenCalled();
    expect(dummySetErrorMsg).not.toHaveBeenCalled();
  });

  it("calls correct functions on error", async () => {
    (postBranches as jest.Mock).mockImplementationOnce(() => {
      throw Error("error");
    });

    await submitHandler(
      dummyFormData,
      dummyAccessToken,
      dummySetLoading,
      dummyOnError,
      dummySetErrorMsg,
      dummyRouter,
    );

    expect(dummySetLoading).toHaveBeenCalledTimes(2);
    expect(dummyRouter.push).not.toHaveBeenCalled();
    expect(dummyOnError).toHaveBeenCalled();
    expect(dummySetErrorMsg).toBeCalledTimes(1);
  });

  it("calls correct functions on no file", async () => {
    const dummyFormData: FormType = {
      branchTitle: "t",
      anonymous: true,
      collaboratingMemberIDs: [1, 2],
      projectPostID: 1,
      updatedPostTitle: "tite",
      updatedScientificFieldIDs: [3, 4],
      updatedCompletionStatus: "idea",
      updatedFeedbackPreferences: "formal feedback",
      newFile: null,
    };

    await submitHandler(
      dummyFormData,
      dummyAccessToken,
      dummySetLoading,
      dummyOnError,
      dummySetErrorMsg,
      dummyRouter,
    );

    expect(dummySetLoading).toHaveBeenCalledTimes(1);
    expect(dummyRouter.push).not.toHaveBeenCalled();
    expect(dummyOnError).toHaveBeenCalled();
    expect(dummySetErrorMsg).toBeCalledTimes(1);
  });

  it("calls correct functions on no access token", async () => {
    await submitHandler(
      dummyFormData,
      undefined,
      dummySetLoading,
      dummyOnError,
      dummySetErrorMsg,
      dummyRouter,
    );

    expect(dummySetLoading).toHaveBeenCalledTimes(1);
    expect(dummyRouter.push).not.toHaveBeenCalled();
    expect(dummyOnError).toHaveBeenCalled();
    expect(dummySetErrorMsg).toBeCalledTimes(1);
  });
});
