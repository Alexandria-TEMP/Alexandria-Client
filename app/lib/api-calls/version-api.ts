import { baseUrl } from "./api-common";

/**
 * Fetches HTML render of a version's Quarto project.
 *
 * @async
 * @param id Version ID
 * @returns Text contents of the HTML render
 */
export async function getRenderedVersion(id: string): Promise<string> {
  const res = await fetch(`${baseUrl}/versions/${id}/render`);
  if (!res.ok) {
    // TODO
    throw new Error(await res.text());
  }

  // TODO

  return "";
}
