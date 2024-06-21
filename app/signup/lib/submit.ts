import { postMembers } from "@/lib/api/services/member-api";
import {
  destroySessionCookies,
  setSessionCookies,
} from "@/lib/cookies/cookie-utils";
import { getMemberName } from "@/lib/get-format";
import { MemberCreationFormtT, idT } from "@/lib/types/api-types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type FormType = {
  email: string;
  firstName: string;
  lastName: string;
  institution: string; // TODO might be nice to have some sort of list of institutions,
  scientificFieldTagIDs: idT[];
  password: string;
  confpass: string;
};

/**
 * Submit handler for member creation, in charge of making member creation form, calling post endpoint setting loading and error states
 * @param data member creation form data
 * @param setIsLoading setter for loading state
 * @param onError callback for when there is an error, used for modals
 * @param setErrorMsg setter for error message
 * @param router for redirect on success
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
    const memberForm: MemberCreationFormtT = {
      email: data.email,
      firstName: data.firstName,
      institution: data.institution,
      lastName: data.lastName,
      password: data.password,
      scientificFieldTagIDs: data.scientificFieldTagIDs,
    };

    const newMember = await postMembers(memberForm); // TODO when auth is merged, store the session and log the user in
    setSessionCookies(
      newMember.member.id.toString(),
      getMemberName(newMember.member),
      newMember.member.email,
      newMember.accessToken,
      newMember.refreshToken,
      newMember.accessExp,
      newMember.refreshExp,
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
