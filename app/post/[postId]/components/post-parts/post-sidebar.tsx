import fetchPostData from "@/lib/api-calls/post-api";
import ChipList from "@/components/common/chip-list";
// import AuthorCardList from "../cards/author-card-list";
import Sidebar from "@/components/layout/sidebar";
import { idT } from "@/lib/types/api-types";
import { idPostUnionT } from "@/lib/types/post-union";
import { fetchScientificFields } from "@/lib/api-calls/fields-api";

/**
 * Sidebar that is shown in a Post's page. Includes most of post's metadata.
 * @param id Post ID
 */
export default async function PostSidebar({
  id,
  isProject,
}: Readonly<idPostUnionT>) {
  const data = await fetchPostData({ id: id as idT, isProject });
  const scientificFields = await fetchScientificFields(
    data.post.scientificFieldTagIDs,
  );

  return (
    <Sidebar
      items={[
        {
          title: "Scientific fields",
          node: (
            <ChipList labels={scientificFields.map((f) => f.scientificField)} />
          ),
        },
        // TODO
        // {
        //   title: "Authors",
        //   node: <AuthorCardList ids={data.post.collaboratorIDs} />,
        // },
        // {
        //   title: "Contributors",
        //   node: <AuthorCardList ids={data.post.collaboratorIDs} />,
        // },
        // {
        //   title: "Reviewers",
        //   node: <AuthorCardList ids={data.post.collaboratorIDs} />
        // }
      ]}
    />
  );
}
