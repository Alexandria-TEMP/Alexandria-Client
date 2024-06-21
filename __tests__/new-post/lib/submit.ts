import { expect, describe, it } from "@jest/globals";
import { FormType, submitHandler } from "@/new-post/lib/submit";
import {
  AppRouterInstance,
  NavigateOptions,
  PrefetchOptions,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { postPosts, postPostsIdUpload } from "@/lib/api/services/post-api";
import { postProjectPost } from "@/lib/api/services/project-post-api";
import { postBranchesIdUpload } from "@/lib/api/services/branch-api";
import { dummyPost, dummyProjectPost } from "~/__tests__/__utils__/dummys";

jest.mock("@/lib/api/services/project-post-api");
jest.mock("@/lib/api/services/post-api");
jest.mock("@/lib/api/services/branch-api");

describe("Submit new post tests", () => {
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

  (postPosts as jest.Mock).mockImplementation(() => dummyPost);
  (postProjectPost as jest.Mock).mockImplementation(() => dummyProjectPost);
  (postBranchesIdUpload as jest.Mock).mockImplementation(() => true);
  (postPostsIdUpload as jest.Mock).mockImplementation(() => true);

  it("calls correct post functions on success", async () => {
    const dummyFormData: FormType = {
      title: "t",
      anonymous: true,
      authorMemberIDs: [1, 2],
      scientificFieldTagIDs: [3, 4],
      postType: "question",
      projectCompletionStatus: "idea",
      projectFeedbackPreference: "formal feedback",
      file: new File([], "name.txt"),
    };

    await submitHandler(
      dummyFormData,
      dummyAccessToken,
      dummySetLoading,
      dummyOnError,
      dummySetErrorMsg,
      dummyRouter,
    );

    expect(postPosts).toHaveBeenCalledTimes(1);
    expect(postPosts).toHaveBeenCalledWith(
      {
        anonymous: dummyFormData.anonymous,
        authorMemberIDs: dummyFormData.authorMemberIDs,
        postType: dummyFormData.postType,
        scientificFieldTagIDs: dummyFormData.scientificFieldTagIDs,
        title: dummyFormData.title,
      },
      dummyAccessToken,
    );
    expect(postPostsIdUpload).toHaveBeenCalledTimes(1);
    expect(postPostsIdUpload).toHaveBeenCalledWith(
      dummyPost.id,
      dummyFormData.file,
      dummyAccessToken,
    );
    expect(dummyRouter.push).toHaveBeenCalledWith("/post/r-" + dummyPost.id);
    expect(dummySetLoading).toHaveBeenCalledTimes(2);
    expect(dummyOnError).not.toHaveBeenCalled();
    expect(dummySetErrorMsg).not.toHaveBeenCalled();
  });

  it("calls correct project post functions on success", async () => {
    const dummyFormData: FormType = {
      title: "t",
      anonymous: true,
      authorMemberIDs: [1, 2],
      scientificFieldTagIDs: [3, 4],
      postType: "project",
      projectCompletionStatus: "idea",
      projectFeedbackPreference: "formal feedback",
      file: new File([], "name.txt"),
    };

    await submitHandler(
      dummyFormData,
      dummyAccessToken,
      dummySetLoading,
      dummyOnError,
      dummySetErrorMsg,
      dummyRouter,
    );

    expect(postProjectPost).toHaveBeenCalledTimes(1);
    expect(postProjectPost).toHaveBeenCalledWith(
      {
        anonymous: dummyFormData.anonymous,
        authorMemberIDs: dummyFormData.authorMemberIDs,
        postType: dummyFormData.postType,
        scientificFieldTagIDs: dummyFormData.scientificFieldTagIDs,
        title: dummyFormData.title,
        projectCompletionStatus: dummyFormData.projectCompletionStatus,
        projectFeedbackPreference: dummyFormData.projectFeedbackPreference,
      },
      dummyAccessToken,
    );
    expect(postBranchesIdUpload).toHaveBeenCalledTimes(1);
    expect(postBranchesIdUpload).toHaveBeenCalledWith(
      dummyProjectPost.openBranchIDs[0],
      dummyFormData.file,
      dummyAccessToken,
    );
    expect(dummyRouter.push).toHaveBeenCalledWith(
      "/post/p-" + dummyProjectPost.id,
    );
    expect(dummySetLoading).toHaveBeenCalledTimes(2);
    expect(dummyOnError).not.toHaveBeenCalled();
    expect(dummySetErrorMsg).not.toHaveBeenCalled();
  });

  it("calls correct functions on error", async () => {
    (postProjectPost as jest.Mock).mockImplementationOnce(() => {
      throw Error("error");
    });
    const dummyFormData: FormType = {
      title: "t",
      anonymous: true,
      authorMemberIDs: [1, 2],
      scientificFieldTagIDs: [3, 4],
      postType: "project",
      projectCompletionStatus: "idea",
      projectFeedbackPreference: "formal feedback",
      file: new File([], "name.txt"),
    };

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
      title: "t",
      anonymous: true,
      authorMemberIDs: [1, 2],
      scientificFieldTagIDs: [3, 4],
      postType: "project",
      projectCompletionStatus: "idea",
      projectFeedbackPreference: "formal feedback",
      file: null,
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
    const dummyFormData: FormType = {
      title: "t",
      anonymous: true,
      authorMemberIDs: [1, 2],
      scientificFieldTagIDs: [3, 4],
      postType: "project",
      projectCompletionStatus: "idea",
      projectFeedbackPreference: "formal feedback",
      file: new File([], "name.txt"),
    };

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
