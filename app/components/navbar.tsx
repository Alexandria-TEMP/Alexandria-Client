"use client";

import {
  Avatar,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import ThemeSwitcher from "./theme-switcher";
import { usePathname } from "next/navigation";
import Logo from "./logo";

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
    href: "/newpost",
    label: "Publish",
  },
  {
    href: "/about",
    label: "About",
  },
];

export default function AlexandriaNavbar() {
  const pathname = usePathname();
  // TODO get this from somewhere, get user data and test the conditional render
  const isLoggedIn = false;

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
        {isLoggedIn ? (
          // Either a user avatar
          <NavbarItem>
            <Link href="/profile">
              <Avatar
                isBordered
                size="sm"
                src="/placeholders/Nikolaus_Kopernikus.jpg"
              />
            </Link>
          </NavbarItem>
        ) : (
          // Or 'log in' and 'sign up' buttons
          <>
            <NavbarItem>
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/sign-up">
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
