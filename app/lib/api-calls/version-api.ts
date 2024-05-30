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

export async function getVersionData(id: string) {
  // TODO
  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    id,
    discussionIDs: [0, 1, 2, 3],
    renderStatus: "success",
  };
}
