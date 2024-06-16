import getPostData from "@/lib/api/services/post-api";
import ChipList from "@/components/common/chip-list";
import AuthorCardList from "../cards/author-card-list";
import Sidebar from "@/components/layout/sidebar";
import { IdProp } from "@/lib/types/react-props/id-prop";
import { idT } from "@/lib/types/api-types";
// import PostCardMini from "../cards/post-card-mini";

/**
 * Sidebar that is shown in a Post's page. Includes most of post's metadata.
 * @param id Post ID
 */
export default async function PostSidebar({ id }: IdProp) {
  const data = await getPostData(id as idT);

  return (
    <Sidebar
      items={[
        {
          title: "Scientific fields",
          node: <ChipList labels={data.scientificFields} />,
        },
        // TODO render this conditionally
        // {
        //   title: "Forked from",
        //   node: <PostCardMini id="2" />,
        // },
        // TODO distinguish between authors and collaborators
        {
          title: "Authors",
          node: <AuthorCardList ids={data.collaboratorIDs} />,
        },
        {
          title: "Collaborators",
          node: <AuthorCardList ids={data.collaboratorIDs} />,
        },
      ]}
    />
  );
}
