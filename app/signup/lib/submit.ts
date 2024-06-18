import { postMembers } from "@/lib/api/services/member-api";
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

export const submitHandler = async (
  data: FormType,
  setIsLoading: (v: boolean) => void,
  onError: () => void,
  setErrorMsg: (e: string) => void,
  router: AppRouterInstance,
) => {
  try {
    setIsLoading(true);
    const memberForm: MemberCreationFormtT = {
      email: data.email,
      firstName: data.firstName,
      institution: data.institution,
      lastName: data.lastName,
      password: data.password,
      scientificFieldTagIDs: data.scientificFieldTagIDs,
    };

    await postMembers(memberForm); // TODO when auth is merged, store the session and log the user in
    router.push("/"); // route to home page

    setIsLoading(false);
  } catch (error) {
    if (error instanceof Error) {
      setErrorMsg(error.message);
    }
    setIsLoading(false);
    onError();
  }
};
