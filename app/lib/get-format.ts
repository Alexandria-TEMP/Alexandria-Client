import { Member, MergeRequestReviewStatus, Tag } from "./types/api-types";

export function getMemberName(i: Member | undefined) {
  return i === undefined ? "Not found" : i.firstName + " " + i.lastName;
}

export function getFieldName(i: Tag | undefined) {
  return i === undefined ? "Not found" : i.tag;
}

export function reviewStatusToTensedVerb(status: MergeRequestReviewStatus) {
  switch (status) {
    case "open for review":
      return "open";
    case "peer reviewed":
      return "accepted";
    case "rejected":
      return "rejected";
  }
}
