import fetchPostData from "@/lib/api/services/post-api";
import ChipList from "@/components/common/chip-list";
import AuthorCardList from "../cards/author-card-list";
import Sidebar from "@/components/layout/sidebar";
import { idT } from "@/lib/types/api-types";
import { idPostUnionT } from "@/lib/types/post-union";
import { fetchScientificFieldsFromContainer } from "@/lib/api/services/fields-api";
import { fetchPostCollaboratorsAsSortedMemberIDs } from "@/lib/api/services/collaborator-api";

/**
 * Sidebar that is shown in a Post's page. Includes most of post's metadata.
 * @param id Post ID
 */
export default async function PostSidebar({
  id,
  isProject,
}: Readonly<idPostUnionT>) {
  const data = await fetchPostData({ id: id as idT, isProject });

  const scientificFields = await fetchScientificFieldsFromContainer(
    data.post.scientificFieldTagContainerID,
  );
  const collaborators = await fetchPostCollaboratorsAsSortedMemberIDs(
    id as idT,
  );

  return (
    <Sidebar
      items={[
        ...(scientificFields.length == 0
          ? []
          : [
              {
                title: "Scientific fields",
                node: (
                  <ChipList
                    labels={scientificFields.map((f) => f.scientificField)}
                  />
                ),
              },
            ]),
        ...(collaborators.author.length == 0
          ? []
          : [
              {
                title: "Authors",
                node: <AuthorCardList ids={collaborators.author} />,
              },
            ]),
        ...(collaborators.contributor.length == 0
          ? []
          : [
              {
                title: "Contributors",
                node: <AuthorCardList ids={collaborators.contributor} />,
              },
            ]),
        ...(collaborators.reviewer.length == 0
          ? []
          : [
              {
                title: "Reviewers",
                node: <AuthorCardList ids={collaborators.reviewer} />,
              },
            ]),
      ]}
    />
  );
}
