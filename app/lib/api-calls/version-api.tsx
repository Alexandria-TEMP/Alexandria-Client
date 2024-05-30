/**
 * Fetches HTML render of a version's Quarto project.
 *
 * @async
 * @param id Version ID
 * @returns Text contents of the HTML render
 */
export async function getRenderedVersion(id: string): Promise<string> {
  console.log(`fetching render for ${id}`);
  return (await (await fetch("http://localhost:8000/")).blob()).text();
}
