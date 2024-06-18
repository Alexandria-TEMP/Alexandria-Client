import BranchCardMini from "./branch-card-mini";
import { idBranchUnionT } from "@/lib/types/branch-union";
import { branchUnionIDToPathID } from "@/lib/id-parser";
import { fetchOrderedBranches } from "@/lib/api/services/branch-api";
import { Suspense } from "react";
import BranchCardMiniSkeleton from "./branch-card-mini-skeleton";

/**
 * List of [BranchCards](./branch-card.tsx) with the given IDs.
 * @param branchUnionIDs branch IDs in idBranchUnionT format
 * @param postPathID branch's post ID, used only for routing
 * @param grid makes list a grid instead
 */
export default async function BranchList({
  branchUnionIDs,
  postPathID,
  grid,
}: Readonly<{
  branchUnionIDs: idBranchUnionT[];
  postPathID: string;
  grid?: boolean;
}>) {
  const orderedBranches = await fetchOrderedBranches(branchUnionIDs);

  if (orderedBranches.length === 0) {
    return (
      <h3 className="text-foreground-500">
        Looks like there are no versions here
      </h3>
    );
  }

  return (
    <div className={"gap-5 " + (grid ? "grid grid-cols-4" : "flex flex-col")}>
      {orderedBranches.map((branch) => (
        <Suspense
          key={branchUnionIDToPathID(branch.id)}
          fallback={<BranchCardMiniSkeleton />}
        >
          <BranchCardMini
            branchUnion={branch}
            postPathID={postPathID}
            short={grid}
          />
        </Suspense>
      ))}
    </div>
  );
}
