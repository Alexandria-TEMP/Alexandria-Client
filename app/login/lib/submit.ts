import { postMembersLogin } from "@/lib/api/services/member-api";
import {
  destroySessionCookies,
  setSessionCookies,
} from "@/lib/cookies/cookie-utils";
import { getMemberName } from "@/lib/get-format";
import { MemberLoginFormT } from "@/lib/types/api-types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type FormType = {
  email: string;
  password: string;
};

/**
 * TODO jsdoc when properly implemented
 */
export async function submitHandler(
  data: FormType,
  setIsLoading: (v: boolean) => void,
  onError: () => void,
  setErrorMsg: (e: string) => void,
  router: AppRouterInstance,
) {
  try {
    setIsLoading(true);
    destroySessionCookies();

    const loginForm: MemberLoginFormT = {
      email: data.email,
      password: data.password,
    };

    const loggedMember = await postMembersLogin(loginForm);
    // TODO encrypt data?
    setSessionCookies(
      loggedMember.member.id.toString(),
      getMemberName(loggedMember.member),
      loggedMember.member.email,
      loggedMember.accessToken,
      loggedMember.refreshToken,
      loggedMember.accessExp,
      loggedMember.refreshExp,
    );

    router.push("/");
    setIsLoading(false);
  } catch (error) {
    if (error instanceof Error) {
      setErrorMsg(error.message);
    }
    setIsLoading(false);
    onError();
  }
}
