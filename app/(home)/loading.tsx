import { Input, Tooltip } from "@nextui-org/react";
import PostPreviewCard from "./components/post-preview-card";
import { FaSearch } from "react-icons/fa";
import BodyWithSidebar from "./components/layout/body-with-sidebar";
import Logo from "./components/theme/logo";
import Sidebar from "./components/layout/sidebar";
import Link from "next/link";
import { Suspense } from "react";
import PostPreviewCardSkeleton from "./components/post-preview-card-skeleton";

/**
 * Large spinner centered that fills all available space
 */
export default function HomeLoadingPage() {
  const arrOf20 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // TODO maybe make this cleaner? i just decided default num of items per page is 15

  // TODO should i factor out more of the sidebar contents and stuff here? cause i kind of copy pasted this from the home page
  // so that post card skeletons, description (that is currently not fetched), and search field appear even before the post ids have been fetched
  // this would lead to a component like "post card list" that would basically just do the calling of get post ids and maps them to either skeleton or post card
  return (
    <BodyWithSidebar
      sidebar={
        <Sidebar
          items={[
            {
              title: "",
              node: (
                // TODO maybe make the width of the logo adjustable? */
                <Logo width={300}></Logo>
              ),
            },
            {
              title: "",
              node: <h1>Welcome to Alexandria!</h1>,
            },
            {
              // TODO perhaps this text should be fetched from the database? i think that is technically how that should work
              title: "",
              node: (
                <div>
                  Alexandria is an open-source platform for scientific
                  collaboration. Its aim is to make science available for
                  everyone and to promote spontaneous, international
                  collaboration. Read more about it{" "}
                  <Link href="/about" className="text-primary">
                    here
                  </Link>
                  .
                </div>
              ),
            },
          ]}
        />
      }
    >
      <div className="flex flex-col content-center space-y-10 pr-60">
        <h1 className="align-start">Search for papers, projects, ideas...</h1>
        <Tooltip
          content="This feature has not been implemented yet :<"
          isDisabled={false}
        >
          <span>
            <Input
              placeholder="Search for a post..."
              startContent={<FaSearch />}
              isDisabled={true}
            />
          </span>
        </Tooltip>
        <div className="space-y-7 w-full">
          {arrOf20.map((id) => (
            <Suspense fallback={<PostPreviewCardSkeleton />} key={id}>
              <PostPreviewCard postId={id} key={id} />
            </Suspense>
          ))}
        </div>
      </div>
    </BodyWithSidebar>
  );
}
