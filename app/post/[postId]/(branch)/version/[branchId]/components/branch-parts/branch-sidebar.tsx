import ChipList from "@/components/common/chip-list";
import Sidebar from "@/components/layout/sidebar";
import { fetchBranchData } from "@/lib/api/services/branch-api";
import { fetchScientificFields } from "@/lib/api/services/fields-api";
import { idT } from "@/lib/types/api-types";
import { idBranchUnionT } from "@/lib/types/branch-union";
import PostCardMini from "@/post/[postId]/components/cards/post-card-mini";

/**
 * Sidebar for a branch.
 * Displays its post, scientific field list and contributor list.
 * @param id branch ID
 * @param isClosed indicates if branch is a closed branch
 */
export default async function BranchSidebar({
  id,
  isClosed,
}: Readonly<idBranchUnionT>) {
  const data = await fetchBranchData({ id: id as idT, isClosed });
  const scientificFields = await fetchScientificFields(
    data.branch.updatedScientificFieldTagIDs,
  );

  return (
    <Sidebar
      items={[
        {
          title: "Version of",
          node: <PostCardMini id={data.branch.projectPostID} isProject />,
        },
        {
          title: "Updated scientific fields",
          node: (
            <ChipList labels={scientificFields.map((f) => f.scientificField)} />
          ),
        },
        // TODO
        // {
        //   title: "Contributors",
        //   node: <AuthorCardList ids={data.collaboratorIDs} />,
        // },
      ]}
    />
  );
}
