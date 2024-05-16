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
import Image from "next/image";

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
    <Navbar isBordered>
      {/* Start contents */}
      <NavbarContent justify="start">
        {/* Branding */}
        <NavbarBrand as={Link} href="/">
          <Image
            alt="Alexandria logo"
            src="/logo/logo32.svg"
            width={48}
            height={48}
            className="my-4"
          />
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
            <Avatar
              size="sm"
              as="link"
              href="/profile"
              src="/placeholders/Nikolaus_Kopernikus.jpg"
            />
          </NavbarItem>
        ) : (
          // Or 'log in' and 'sign up' buttons
          <>
            <NavbarItem>
              <Link href="/log-in">
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
