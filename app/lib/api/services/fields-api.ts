import { ScientificFieldTagT, idT } from "../../types/api-types";
import { baseUrl } from "../api-common";

/**
 * TODO jsdoc when properly implemented
 */
export async function getFields() {
  // TODO
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = [
    {
      id: "1",
      tag: "Computer Science",
      tagType: "ScientificField",
    },
    {
      id: "2",
      tag: "Mathematics",
      tagType: "ScientificField",
    },
    {
      id: "3",
      tag: "Psychology & Psychiatry",
      tagType: "ScientificField",
    },
    {
      id: "4",
      tag: "Medicine",
      tagType: "ScientificField",
    },
  ];

  return data;
}

/**
 * Fetches all scientific fields based on their IDs
 * @param ids scientific field IDs
 */
export async function fetchScientificFields(
  ids: idT[],
): Promise<ScientificFieldTagT[]> {
  let tags: ScientificFieldTagT[] = [];

  for (const id of ids) {
    const res = await fetch(`${baseUrl}/tags/scientific/${id}`);
    if (!res.ok) continue;
    const scientificField = (await res.json()) as ScientificFieldTagT;
    tags = [...tags, scientificField];
  }

  return tags;
}
