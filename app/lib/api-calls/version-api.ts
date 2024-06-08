import { idType } from "../types/api-types";
import { baseUrl } from "./api-common";

/**
 * Fetches HTML render of a version's Quarto project.
 * @async
 * @param id Version ID
 * @returns Text contents of the HTML render
 */
export async function getRenderedVersion(id: string): Promise<string> {
  const res = await fetch(`${baseUrl}/versions/${id}/render`);
  if (res.status === 202) {
    return "pending";
  }
  if (!res.ok) {
    const error = res.headers.get("error") ?? undefined;
    throw new Error(error);
  }

  return res.text();
}

/**
 * TODO jsdoc when properly implemented
 */
export async function getVersionData(id: idType) {
  // TODO
  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    id,
    discussionIDs: [0, 1, 2, 3],
    renderStatus: "success",
  };
}
