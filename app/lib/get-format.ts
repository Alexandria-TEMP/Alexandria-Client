import {
  MemberT,
  BranchOverallReviewStatusT,
  ScientificFieldTagT,
  BranchReviewDecisionT,
  ProjectReviewStatusT,
} from "./types/api-types";

/**
 * Parses member data to return some full name for them
 * @param i member, may be undefined
 * @returns member's "FirstName LastName" or "Not found"
 */
export function getMemberName(i: MemberT | undefined) {
  return i === undefined ? "Not found" : i.firstName + " " + i.lastName;
}

/**
 * TODO update jsdoc
 * Parses tag data to return its name
 * @param i tag, may be undefined
 * @returns tag's name/label or "Not found"
 */
export function getFieldName(i: ScientificFieldTagT | undefined) {
  return i === undefined ? "Not found" : i.scientificField;
}

/**
 * Maps type the different review status API types to a
 * standardized naming scheme, in a short or user-facing
 * descriptive version.
 * @param status the status returned from API
 */
export function getStandardReviewStatus(
  status:
    | BranchOverallReviewStatusT
    | BranchReviewDecisionT
    | ProjectReviewStatusT
    | undefined,
): {
  short: "open" | "accepted" | "rejected" | "unknown";
  descriptive: string;
} {
  if (status === "open for review" || status === "open") {
    return { descriptive: "open for review", short: "open" };
  }
  if (
    status === "approved" ||
    status === "peer reviewed" ||
    status === "reviewed"
  ) {
    return { descriptive: "peer reviewed", short: "accepted" };
  }
  if (status === "rejected" || status === "revision needed") {
    return { descriptive: "revision needed", short: "rejected" };
  }
  return { descriptive: "unknown review status", short: "unknown" };
}

/**
 * Converts a number in bytes into a string representation
 * of its closest byte multiple (B, kB, MB or GB)
 * @param n number of bytes
 * @returns string with number and unit or "invalid" on error
 */
export function getByteMultiple(n: number) {
  if (n < 0) {
    return "invalid";
  }

  const multiples: [string, number][] = [
    ["GB", 1_000_000_000],
    ["MB", 1_000_000],
    ["kB", 1_000],
    ["B", 1],
  ];

  for (const [symbol, value] of multiples) {
    if (n / value > 1) {
      return `${+(n / value).toFixed(2)} ${symbol}`;
    }
  }

  return `${n} B`;
}
