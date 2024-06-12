import { MemberT, BranchOverallReviewStatusT, Tag } from "./types/api-types";

/**
 * Parses member data to return some full name for them
 * @param i member, may be undefined
 * @returns member's "FirstName LastName" or "Not found"
 */
export function getMemberName(i: MemberT | undefined) {
  return i === undefined ? "Not found" : i.firstName + " " + i.lastName;
}

/**
 * Parses tag data to return its name
 * @param i tag, may be undefined
 * @returns tag's name/label or "Not found"
 */
export function getFieldName(i: Tag | undefined) {
  return i === undefined ? "Not found" : i.tag;
}

/**
 * Maps type BranchReviewStatusT to a verb in past or present tense
 */
export function reviewStatusToTensedVerb(status: BranchOverallReviewStatusT) {
  switch (status) {
    case "open for review":
      return "open";
    case "peer reviewed":
      return "accepted";
    case "rejected":
      return "rejected";
  }
}
