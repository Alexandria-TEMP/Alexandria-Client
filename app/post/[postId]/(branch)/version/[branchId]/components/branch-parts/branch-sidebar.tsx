import ChipList from "@/components/common/chip-list";
import Sidebar from "@/components/layout/sidebar";
import { getBranchData } from "@/lib/api/services/branch-api";
import { idT } from "@/lib/types/api-types";
import { IdProp } from "@/lib/types/react-props/id-prop";
import AuthorCardList from "@/post/[postId]/components/cards/author-card-list";
import PostCardMini from "@/post/[postId]/components/cards/post-card-mini";

/**
 * Sidebar for a branch.
 * Displays its post, scientific field list and contributor list.
 * @param id branch ID
 */
export default async function BranchSidebar({ id }: IdProp) {
  const data = await getBranchData(id as idT);

  return (
    <Sidebar
      items={[
        {
          title: "Version of",
          node: <PostCardMini id={data.projectPostID.toString()} />,
        },
        {
          title: "Scientific fields",
          node: (
            <ChipList labels={data.updatedScientificFields.map(toString)} />
          ),
        },
        {
          title: "Contributors",
          node: <AuthorCardList ids={data.collaboratorIDs} />,
        },
      ]}
    />
  );
}
