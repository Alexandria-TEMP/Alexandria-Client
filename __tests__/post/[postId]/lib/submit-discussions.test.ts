import { expect, describe, it } from "@jest/globals";
import {
  replyDiscussionSubmitHandler,
  rootDiscussionSubmitHandler,
} from "@/post/[postId]/lib/submit-discussion";
import {
  AppRouterInstance,
  NavigateOptions,
  PrefetchOptions,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  postDiscussionReply,
  postDiscussionRoot,
} from "@/lib/api/services/discussion-api";
import { DiscussionCreationFormT } from "@/lib/types/api-types";
import { dummyDiscussion } from "~/__tests__/__utils__/dummys";

jest.mock("@/lib/api/services/discussion-api");

const dummySetLoading = jest.fn();
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
const dummyFormData: DiscussionCreationFormT = {
  anonymous: true,
  text: "feedbakc",
};

describe("Submit new root discussion tests", () => {
  (postDiscussionRoot as jest.Mock).mockImplementation(() => dummyDiscussion);

  it("calls correct branch functions on success", async () => {
    await rootDiscussionSubmitHandler(
      dummyFormData,
      1,
      dummyAccessToken,
      dummySetLoading,
      dummySetErrorMsg,
      dummyRouter,
    );

    expect(postDiscussionRoot).toHaveBeenCalledTimes(1);
    expect(postDiscussionRoot).toHaveBeenCalledWith(
      {
        containerID: 1,
        discussion: dummyFormData,
      },
      dummyAccessToken,
    );
    expect(dummyRouter.refresh).toHaveBeenCalled();
    expect(dummySetLoading).toHaveBeenCalledTimes(2);
  });

  it("calls correct functions on error", async () => {
    (postDiscussionRoot as jest.Mock).mockImplementationOnce(() => {
      throw Error("error");
    });

    await rootDiscussionSubmitHandler(
      dummyFormData,
      1,
      dummyAccessToken,
      dummySetLoading,
      dummySetErrorMsg,
      dummyRouter,
    );

    expect(dummySetLoading).toHaveBeenCalledTimes(2);
    expect(dummyRouter.refresh).not.toHaveBeenCalled();
    expect(dummySetErrorMsg).toBeCalledTimes(1);
  });

  it("calls correct functions on no access token", async () => {
    await rootDiscussionSubmitHandler(
      dummyFormData,
      1,
      undefined,
      dummySetLoading,
      dummySetErrorMsg,
      dummyRouter,
    );

    expect(dummySetLoading).toHaveBeenCalledTimes(1);
    expect(dummyRouter.push).not.toHaveBeenCalled();
    expect(dummySetErrorMsg).toBeCalledTimes(1);
  });
});

describe("Submit new reply discussion tests", () => {
  (postDiscussionReply as jest.Mock).mockImplementation(() => dummyDiscussion);

  it("calls correct branch functions on success", async () => {
    await replyDiscussionSubmitHandler(
      dummyFormData,
      1,
      dummyAccessToken,
      dummySetLoading,
      dummySetErrorMsg,
      dummyRouter,
    );

    expect(postDiscussionReply).toHaveBeenCalledTimes(1);
    expect(postDiscussionReply).toHaveBeenCalledWith(
      {
        parentID: 1,
        discussion: dummyFormData,
      },
      dummyAccessToken,
    );
    expect(dummyRouter.refresh).toHaveBeenCalled();
    expect(dummySetLoading).toHaveBeenCalledTimes(2);
  });

  it("calls correct functions on error", async () => {
    (postDiscussionReply as jest.Mock).mockImplementationOnce(() => {
      throw Error("error");
    });

    await replyDiscussionSubmitHandler(
      dummyFormData,
      1,
      dummyAccessToken,
      dummySetLoading,
      dummySetErrorMsg,
      dummyRouter,
    );

    expect(dummySetLoading).toHaveBeenCalledTimes(2);
    expect(dummyRouter.refresh).not.toHaveBeenCalled();
    expect(dummySetErrorMsg).toBeCalledTimes(1);
  });

  it("calls correct functions on no access token", async () => {
    await replyDiscussionSubmitHandler(
      dummyFormData,
      1,
      undefined,
      dummySetLoading,
      dummySetErrorMsg,
      dummyRouter,
    );

    expect(dummySetLoading).toHaveBeenCalledTimes(1);
    expect(dummyRouter.push).not.toHaveBeenCalled();
    expect(dummySetErrorMsg).toBeCalledTimes(1);
  });
});
