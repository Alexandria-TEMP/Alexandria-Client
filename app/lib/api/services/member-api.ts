import { MemberCreationFormtT, MemberT, idT } from "../../types/api-types";
import { baseUrl, validateResponse } from "../api-common";

/**
 * Gets data for a Member given their ID.
 * @async
 * @param id Member ID
 */
export async function fetchMemberData(id: idT): Promise<MemberT> {
  const res = await fetch(`${baseUrl}/members/${id}`);
  await validateResponse(res);
  return (await res.json()) as MemberT;
}

/**
 * Method for creating a new member
 * @param memberCreationForm the data for creating a new member, according to API spec
 * @returns the newly created member
 */
export async function postMembers(
  memberCreationForm: MemberCreationFormtT,
): Promise<MemberT> {
  const jsonMember = JSON.stringify(memberCreationForm);
  const res = await fetch(`${baseUrl}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonMember,
  });
  await validateResponse(res);
  const newMember = (await res.json()) as MemberT;
  return newMember;
}
