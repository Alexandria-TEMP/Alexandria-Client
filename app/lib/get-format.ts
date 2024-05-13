import { Member, Tag } from "./api-types";

export function getMemberName(i: Member | undefined) {
  return i === undefined ? "Not found" : i.firstName + " " + i.lastName;
}
export function getFieldName(i: Tag | undefined) {
  return i === undefined ? "Not found" : i.tag;
}
