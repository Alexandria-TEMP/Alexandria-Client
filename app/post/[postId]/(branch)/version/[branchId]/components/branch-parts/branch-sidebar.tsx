import ChipList from "@/components/common/chip-list";
import Sidebar from "@/components/layout/sidebar";
import {
  fetchBranchData,
  fetchBranchUpdatedFieldsFallback,
} from "@/lib/api/services/branch-api";
import { fetchBranchCollaboratorsMemberIDs } from "@/lib/api/services/collaborator-api";
import { fetchScientificFieldsFromContainer } from "@/lib/api/services/fields-api";
import { idT } from "@/lib/types/api-types";
import { idBranchUnionT } from "@/lib/types/branch-union";
import AuthorCardList from "@/post/[postId]/components/cards/author-card-list";
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
  const collaboratorMemberIDs = await fetchBranchCollaboratorsMemberIDs(
    id as idT,
  );
  const scientificFields = await fetchScientificFieldsFromContainer(
    (await fetchBranchUpdatedFieldsFallback(data))
      .scientificFieldTagContainerID,
  );

  return (
    <Sidebar
      items={[
        {
          title: "Version of",
          node: <PostCardMini id={data.branch.projectPostID} isProject />,
        },
        ...(scientificFields.length == 0
          ? []
          : [
              {
                title: "Updated scientific fields",
                node: (
                  <ChipList
                    labels={scientificFields.map((f) => f.scientificField)}
                  />
                ),
              },
            ]),
        ...(collaboratorMemberIDs.length == 0
          ? []
          : [
              {
                title: "Contributors",
                node: <AuthorCardList ids={collaboratorMemberIDs} />,
              },
            ]),
      ]}
    />
  );
}
