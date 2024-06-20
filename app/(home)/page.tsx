import { Input, Tooltip } from "@nextui-org/react";
import PostFeed from "./components/post-feed";
import { FaSearch } from "react-icons/fa";
import BodyWithSidebar from "@/components/layout/body-with-sidebar";
import HomeSidebar from "./components/home-sidebar";

/**
 * Alexandrias's homepage.
 */
export default function Home() {
  return (
    <BodyWithSidebar sidebar={<HomeSidebar />}>
      <div className="flex flex-col content-center space-y-10 pr-60">
        <h1 className="align-start">Search for papers, projects, ideas...</h1>
        <Tooltip
          content="This feature is currently not implemented"
          isDisabled={false}
        >
          <Input
            placeholder="Search for a post..."
            startContent={<FaSearch />}
            isDisabled={true}
          />
        </Tooltip>
        <PostFeed />
      </div>
    </BodyWithSidebar>
  );
}
