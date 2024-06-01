import ChipList from "@/components/chip-list";
import Sidebar from "@/components/sidebar";
import { getMergeRequestData } from "@/lib/api-calls/merge-request-api";
import { parseId } from "@/lib/string-utils";
import { IdProp } from "@/lib/types/react-props/id-prop";
import AuthorCardList from "@/post/[postId]/components/cards/author-card-list";
import PostCardMini from "@/post/[postId]/components/cards/post-card-mini";

export default async function MergeRequestSidebar({ id }: IdProp) {
  const data = await getMergeRequestData(parseId(id));

  return (
    <Sidebar
      items={[
        {
          title: "Version of",
          node: <PostCardMini id={data.projectPostID.toString()} />,
        },
        {
          title: "Scientific fields",
          node: <ChipList labels={data.updatedScientificFields} />,
        },
        {
          title: "Contributors",
          node: <AuthorCardList ids={data.collaboratorIDs} />,
        },
      ]}
    />
  );
}
