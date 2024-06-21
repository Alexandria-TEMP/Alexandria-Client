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
 * Submit method for login form, in charge of making login creation form, post request, loading and error states
 * @param data the login credentials
 * @param setIsLoading setter for the loading state
 * @param onError method called on error
 * @param setErrorMsg setter for error message when there is one
 * @param router router for redirect on successful login
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

    router.back();
    setIsLoading(false);
  } catch (error) {
    if (error instanceof Error) {
      setErrorMsg(error.message);
    }
    setIsLoading(false);
    onError();
  }
}
