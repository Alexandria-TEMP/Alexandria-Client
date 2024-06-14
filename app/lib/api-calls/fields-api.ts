// methods in this file will be heavily changed once integration with back end it done
// just retrieve some dummy data for now

import { ScientificFieldTagT, idT } from "../types/api-types";

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
 * TODO
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function fetchScientificFields(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ids: idT[],
): Promise<ScientificFieldTagT[]> {
  // TODO
  return [];
}
