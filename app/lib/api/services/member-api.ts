import { MemberT, idT } from "../../types/api-types";
import { baseUrl, validateResponse } from "../api-common";

/**
 * Gets data for a Member given their ID.
 * @async
 * @param id Member ID
 */
export default async function fetchMemberData(id: idT): Promise<MemberT> {
  const res = await fetch(`${baseUrl}/members/${id}`);
  await validateResponse(res);
  return (await res.json()) as MemberT;
}
