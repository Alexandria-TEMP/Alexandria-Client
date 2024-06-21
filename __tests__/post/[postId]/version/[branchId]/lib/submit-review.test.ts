import { expect, describe, it } from "@jest/globals";
import {
  FormType,
  reviewSubmitHandler,
} from "@/post/[postId]/(branch)/version/[branchId]/lib/submit-review";
import { postBranchesReviews } from "@/lib/api/services/branch-api";
import {
  AppRouterInstance,
  NavigateOptions,
  PrefetchOptions,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { DiscussionCreationFormT } from "@/lib/types/api-types";
import { dummyDiscussion } from "~/__tests__/__utils__/dummys";

jest.mock("@/lib/api/services/branch-api");

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
const dummyFormData: FormType = {
  branchReviewDecision: "approved",
  feedback: "feedbakc",
};

describe("Submit new root discussion tests", () => {
  (postBranchesReviews as jest.Mock).mockImplementation(() => dummyDiscussion);

  it("calls correct branch functions on success", async () => {
    await reviewSubmitHandler(
      dummyFormData,
      1,
      1,
      dummyAccessToken,
      dummySetLoading,
      dummySetErrorMsg,
      dummyRouter,
    );

    expect(postBranchesReviews).toHaveBeenCalledTimes(1);
    expect(postBranchesReviews).toHaveBeenCalledWith(
      {
        branchID: 1,
        feedback: dummyFormData.feedback,
        branchReviewDecision: dummyFormData.branchReviewDecision,
      },
      dummyAccessToken,
    );
    expect(dummyRouter.push).toHaveBeenCalled();
    expect(dummySetLoading).toHaveBeenCalledTimes(2);
  });

  it("calls correct functions on error", async () => {
    (postBranchesReviews as jest.Mock).mockImplementationOnce(() => {
      throw Error("error");
    });

    await reviewSubmitHandler(
      dummyFormData,
      1,
      1,
      dummyAccessToken,
      dummySetLoading,
      dummySetErrorMsg,
      dummyRouter,
    );

    expect(dummySetLoading).toHaveBeenCalledTimes(2);
    expect(dummyRouter.push).not.toHaveBeenCalled();
    expect(dummySetErrorMsg).toBeCalledTimes(1);
  });

  it("calls correct functions on no access token", async () => {
    await reviewSubmitHandler(
      dummyFormData,
      1,
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
