import { idT } from "@/lib/types/api-types";
import BranchCard from "../../../components/cards/branch-card";
import { idBranchUnionT } from "@/lib/types/branch-union";
import { branchUnionIDToPathID } from "@/lib/id-parser";

/**
 * List of [BranchCards](./branch-card.tsx) with the given IDs.
 * @param branchUnionIDs branch IDs in idBranchUnionT format
 * @param postPathID branch's post ID, used only for routing
 * @param grid makes list a grid instead
 */
export default function BranchList({
  branchUnionIDs,
  postPathID,
  grid,
}: Readonly<{
  branchUnionIDs: idBranchUnionT[];
  postPathID: string;
  grid?: boolean;
}>) {
  return (
    <div className={"gap-5 " + (grid ? "grid grid-cols-4" : "flex flex-col")}>
      {branchUnionIDs.map((branchUnionID) => (
        <BranchCard
          short={grid}
          key={branchUnionIDToPathID(branchUnionID)}
          id={branchUnionID.id as idT}
          isClosed={branchUnionID.isClosed}
          postPathID={postPathID}
        />
      ))}
    </div>
  );
}
