import { validateResponse } from "@/lib/api/api-common";
import { postBranchesIdUpload } from "@/lib/api/services/branch-api";
import { expect, describe, it } from "@jest/globals";
import { dummyFile } from "~/__tests__/__utils__/dummys";

jest.mock("@/lib/api/api-common");

describe("Upload files to Branch", () => {
  it("gives back ok", async () => {
    (validateResponse as jest.Mock).mockImplementation(() => {});
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(true),
      }),
    ) as jest.Mock;
    const post = await postBranchesIdUpload(1, dummyFile);
    expect(post).toBe(true);
  });
});
