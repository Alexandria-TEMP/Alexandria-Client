import { Input, Tooltip } from "@nextui-org/react";
import { getPostsByPage } from "./lib/api-calls/post-api";
import BodyWithSidebar from "./components/layout/body-with-sidebar";
import Logo from "./components/theme/logo";
import Sidebar from "./components/layout/sidebar";
import Link from "next/link";
import MorePosts from "./components/more-posts";
import { FaSearch } from "react-icons/fa";

/**
 * Alexandrias's homepage.
 */
export default async function Home() {
  const posts = await getPostsByPage(1);

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
          <MorePosts initPage={1} initPosts={posts} />
        </div>
      </div>
    </BodyWithSidebar>
  );
}
