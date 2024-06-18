import {
  ScientificFieldTagContainerT,
  ScientificFieldTagT,
  idT,
} from "../../types/api-types";
import { baseUrl, validateResponse } from "../api-common";

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

/**
 * Fetch scientific field tag container
 * @param id of the container
 * @returns container object
 */
export async function fetchScientificFieldContainer(
  id: idT,
): Promise<ScientificFieldTagContainerT> {
  const res = await fetch(`${baseUrl}/tags/scientific/containers/${id}`);
  await validateResponse(res);
  const container = (await res.json()) as ScientificFieldTagContainerT;
  return container;
}

/**
 * Method that gets the scientific fiels from a container
 * @param id container id
 * @returns a list of scientific field tags in that container
 */
export async function fetchScientificFieldsFromContainer(
  id: idT,
): Promise<ScientificFieldTagT[]> {
  const container = await fetchScientificFieldContainer(id);
  return await fetchScientificFields(container.scientificFieldTagIDs);
}
