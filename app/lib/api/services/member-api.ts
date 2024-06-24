import {
  MemberCreationFormtT,
  MemberLoginFormT,
  MemberT,
  TokensT,
  TokensWithMemberT,
  idT,
} from "../../types/api-types";
import { baseUrl, validateResponse } from "../api-common";

/**
 * Gets data for a Member given their ID.
 * @async
 * @param id Member ID
 */
export async function fetchMemberData(id: idT): Promise<MemberT> {
  const res = await fetch(`${baseUrl}/members/${id}`);
  await validateResponse(res);
  const member: MemberT = (await res.json()) as MemberT;
  return member;
}

/**
 * Method for creating a new member
 * @param memberCreationForm the data for creating a new member, according to API spec
 * @returns the newly created member along with refresh and access tokens
 */
export async function postMembers(
  memberCreationForm: MemberCreationFormtT,
): Promise<TokensWithMemberT> {
  const jsonMember = JSON.stringify(memberCreationForm);
  const res = await fetch(`${baseUrl}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonMember,
    // If someone uploads the exact same contents, we don't want the same response
    next: { revalidate: 0 },
  });
  await validateResponse(res);
  const newMember = (await res.json()) as TokensWithMemberT;
  return newMember;
}

/**
 * Log a user in by sending credentials
 * @param memberLoginForm the credentials necessary for logging in
 * @returns the logged in user, as well as refresh and access tokens
 */
export async function postMembersLogin(
  memberLoginForm: MemberLoginFormT,
): Promise<TokensWithMemberT> {
  const res = await fetch(`${baseUrl}/members/login`, {
    method: "POST",
    body: JSON.stringify(memberLoginForm),
  });
  await validateResponse(res);
  return (await res.json()) as TokensWithMemberT;
}

/**
 * Method that calls the token refresh endpoint, to generate new tokens for the logged in user
 * @param refreshToken currently loggen in user's refresh token
 * @returns the new refresh and access tokens
 */
export async function postMembersToken(refreshToken: string): Promise<TokensT> {
  const res = await fetch(`${baseUrl}/members/token`, {
    method: "POST",
    body: JSON.stringify({ refreshToken: refreshToken }),
  });
  await validateResponse(res);
  return (await res.json()) as TokensT;
}
