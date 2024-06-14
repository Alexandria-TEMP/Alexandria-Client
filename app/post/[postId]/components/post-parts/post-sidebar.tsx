import fetchPostData from "@/lib/api-calls/post-api";
import ChipList from "@/components/common/chip-list";
// import AuthorCardList from "../cards/author-card-list";
import Sidebar from "@/components/layout/sidebar";
import { idT } from "@/lib/types/api-types";
import { idPostUnionT } from "@/lib/types/post-union";

/**
 * Sidebar that is shown in a Post's page. Includes most of post's metadata.
 * @param id Post ID
 */
export default async function PostSidebar({
  id,
  isProject,
}: Readonly<idPostUnionT>) {
  const data = await fetchPostData({ id: id as idT, isProject });

  return (
    <Sidebar
      items={[
        {
          title: "Scientific fields",
          node: <ChipList labels={data.post.scientificFields} />,
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
