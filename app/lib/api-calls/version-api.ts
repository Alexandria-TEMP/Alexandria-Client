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
  if (res.status === 202) {
    return "pending";
  }
  if (!res.ok) {
    const error = (await res.json()) as { code: number; message: string };
    throw new Error(error.message);
  }

  return res.text();
}
