"use client";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import ThemeSwitcher from "@/components/theme/theme-switcher";
import { usePathname } from "next/navigation";
import Logo from "@/components/theme/logo";
import { destroySessionCookies } from "@/lib/cookies/cookie-utils";
import { useCookieWithRefresh } from "@/lib/cookies/cookie-hooks";

/**
 * Each item in this array becomes an available path in the navbar
 * href: path or URL to navigate to
 * label: text rendered in the link
 */
export const navigationItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/new-post",
    label: "Publish",
  },
  {
    href: "/about",
    label: "About",
  },
];

/**
 * Website navbar
 */
export default function AlexandriaNavbar() {
  const pathname = usePathname();
  const uname = useCookieWithRefresh("user-name"); // technically dont need the refresh here but i need the hook

  return (
    <Navbar
      isBordered
      maxWidth="full"
      classNames={{
        // These are applied to NavbarItems' className
        item: [
          // Adds a line under the active route
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
          // Changes text color of active route
          "data-[active=true]:text-primary",
          // Changes text color when hovering over a route
          "hover:text-primary",
        ],
      }}
    >
      {/* Start contents */}
      <NavbarContent justify="start">
        {/* Branding */}
        <NavbarBrand as={Link} href="/">
          <Logo width={48} height={48} className="my-4 mr-2" />
          <p className="text-4xl">Alexandria</p>
        </NavbarBrand>
      </NavbarContent>
      {/* Center contents */}
      <NavbarContent justify="center">
        {
          // Render each navigation item with its label, setting them as
          // active when their link is open
          navigationItems.map(({ href, label }) => (
            <NavbarItem key={href} isActive={pathname === href}>
              <Link href={href}>{label}</Link>
            </NavbarItem>
          ))
        }
      </NavbarContent>
      {/* End contents */}
      <NavbarContent justify="end">
        {/* Conditionally render based on log in status */}
        {uname ? (
          // Either a user avatar
          <>
            <NavbarItem>
              <Link href="/todo">
                <h3>{uname}</h3>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/">
                <Button variant="ghost" onClick={destroySessionCookies}>
                  Log out
                </Button>
              </Link>
            </NavbarItem>
          </>
        ) : (
          // Or 'log in' and 'sign up' buttons
          <>
            <NavbarItem>
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/signup">
                <Button variant="ghost">Sign up</Button>
              </Link>
            </NavbarItem>
          </>
        )}
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
