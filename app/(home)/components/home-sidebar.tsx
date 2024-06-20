import Sidebar from "@/components/layout/sidebar";
import Logo from "@/components/theme/logo";
import Link from "next/link";

/**
 * Sidebar for the homepage
 */
export default function HomeSidebar() {
  return (
    <Sidebar
      items={[
        {
          node: (
            // TODO make the width of the logo adjustable
            <Logo width={300}></Logo>
          ),
        },
        {
          node: <h1>Welcome to Alexandria!</h1>,
        },
        {
          node: (
            <div className="text-justify">
              TODO: Change this text. Alexandria is an open-source platform for
              scientific collaboration. Its aim is to make science available for
              everyone and to promote spontaneous, international collaboration.
              Read more about it{" "}
              <Link href="/about" className="text-primary">
                here
              </Link>
              .
            </div>
          ),
        },
      ]}
    />
  );
}
