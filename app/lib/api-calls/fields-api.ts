import { ScientificFieldT } from "../types/api-types";
import { baseUrl, validateResponse } from "./api-common";

/**
 * TODO jsdoc when properly implemented
 */
export async function getScientificFields() {
  const response = await fetch(baseUrl + "/tags/scientific");
  await validateResponse(response);
  //disable reason: idk how to fix this and still get the correct type cause typescript
  // i have to look into this
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const scientificFieldTags: ScientificFieldT[] = await response.json();
  return scientificFieldTags;
}
