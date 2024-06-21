import { expect, describe, it } from "@jest/globals";
import { FormType, submitHandler } from "@/login/lib/submit";
import {
  destroySessionCookies,
  setSessionCookies,
} from "@/lib/cookies/cookie-utils";
import {
  AppRouterInstance,
  NavigateOptions,
  PrefetchOptions,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { postMembersLogin } from "@/lib/api/services/member-api";
import { MemberLoginFormT, MemberT } from "@/lib/types/api-types";
import { dummyMembers } from "~/__tests__/__utils__/dummys";
import { getMemberName } from "@/lib/get-format";

jest.mock("@/lib/cookies/cookie-utils");
jest.mock("@/lib/api/services/member-api");
jest.mock("@/lib/get-format");

describe("Submit login tests", () => {
  (destroySessionCookies as jest.Mock).mockImplementation(() => {});
  (setSessionCookies as jest.Mock).mockImplementation(
    (
      userId: string,
      userName: string,
      userEmail: string,
      accessToken: string,
      refreshToken: string,
      accessExp: number,
      refreshExp: number,
    ) => {},
  );
  (getMemberName as jest.Mock).mockImplementation((s: MemberT) => {
    "name";
  });
  const dummySetLoading = jest.fn();
  const dummyOnError = jest.fn();
  const dummySetErrorMsg = jest.fn();
  const dummyFormData: FormType = {
    email: "dumb@mail.com",
    password: "pass",
  };
  const dummyRouter: AppRouterInstance = {
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    push: jest.fn((href: string, options?: NavigateOptions) => {}),
    replace: jest.fn((href: string, options?: NavigateOptions) => {}),
    prefetch: jest.fn((href: string, options?: PrefetchOptions) => {}),
  };

  it("calls correct functions on error", async () => {
    (postMembersLogin as jest.Mock).mockImplementation(
      (data: MemberLoginFormT) =>
        Promise.resolve({
          member: dummyMembers[1],
          accessToken: "access",
          refreshToken: "refresh",
          accessExp: 123,
          refreshExp: 342,
        }),
    );

    await submitHandler(
      dummyFormData,
      dummySetLoading,
      dummyOnError,
      dummySetErrorMsg,
      dummyRouter,
    );

    expect(destroySessionCookies).toHaveBeenCalledTimes(1);
    expect(postMembersLogin).toHaveBeenCalledTimes(1);
    expect(postMembersLogin).toHaveBeenCalledWith(dummyFormData);
    expect(setSessionCookies).toHaveBeenCalled();
    expect(dummySetLoading).toHaveBeenCalledTimes(2);
    expect(dummyRouter.back).toHaveBeenCalled();
    expect(dummyOnError).not.toHaveBeenCalled();
  });

  it("calls correct functions on success", async () => {
    (postMembersLogin as jest.Mock).mockImplementationOnce(
      (data: MemberLoginFormT) => {
        throw Error("error");
      },
    );
    await submitHandler(
      dummyFormData,
      dummySetLoading,
      dummyOnError,
      dummySetErrorMsg,
      dummyRouter,
    );

    expect(destroySessionCookies).toHaveBeenCalledTimes(1);
    expect(postMembersLogin).toHaveBeenCalledTimes(1);
    expect(postMembersLogin).toHaveBeenCalledWith(dummyFormData);
    expect(dummySetLoading).toHaveBeenCalledTimes(2);
    expect(dummyRouter.back).not.toHaveBeenCalled();
    expect(dummyOnError).toHaveBeenCalled();
    expect(dummySetErrorMsg).toBeCalledTimes(1);
  });
});
