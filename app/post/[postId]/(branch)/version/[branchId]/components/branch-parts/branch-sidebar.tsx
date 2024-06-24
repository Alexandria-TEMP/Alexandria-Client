import ChipList from "@/components/common/chip-list";
import Sidebar from "@/components/layout/sidebar";
import { fetchBranchData } from "@/lib/api/services/branch-api";
import {
  fetchBranchCollaboratorsMemberIDs,
  fetchPostCollaboratorsMemberIDs,
} from "@/lib/api/services/collaborator-api";
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

  const branchCollaboratorMemberIDs = await fetchBranchCollaboratorsMemberIDs(
    id as idT,
  );
  const postCollaboratorMemberIDs = await fetchPostCollaboratorsMemberIDs(
    data.postIDs.postID as idT,
  );
  const scientificFields = await fetchScientificFieldsFromContainer(
    data.updated.scientificFieldTagContainerID as idT,
  );

  return (
    <Sidebar
      items={[
        {
          node: (
            <PostCardMini id={data.postIDs.projectPostID as idT} isProject />
          ),
        },
        ...(scientificFields.length == 0
          ? []
          : [
              {
                title: "Scientific fields",
                tooltip:
                  "If the version is accepted, these will be the post's scientific fields.",
                node: (
                  <ChipList
                    labels={scientificFields.map((f) => f.scientificField)}
                  />
                ),
              },
            ]),
        ...(branchCollaboratorMemberIDs.length == 0
          ? []
          : [
              {
                title: "Version contributors",
                tooltip:
                  "The members who have contributed to propose these changes.",
                node: <AuthorCardList ids={branchCollaboratorMemberIDs} />,
              },
            ]),
        ...(postCollaboratorMemberIDs.length == 0
          ? []
          : [
              {
                title: "Post collaborators",
                tooltip:
                  "The members who have authored and contributed to the post that originated this a version.",
                node: <AuthorCardList ids={postCollaboratorMemberIDs} />,
              },
            ]),
      ]}
    />
  );
}
