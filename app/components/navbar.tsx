"use client";

import { AcademicCapIcon } from "@heroicons/react/24/outline";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import ThemeSwitcher from "./theme-switcher";
import { usePathname } from "next/navigation";

export default function AlexandriaNavbar() {
  const pathname = usePathname();

  // Each item in this array becomes an available path in the navbar
  // href: path or URL to navigate to
  // label: text rendered in the link
  const navigationItems = [
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

  return (
    <Navbar isBordered>
      {/* Start contents */}
      <NavbarContent justify="start">
        {/* Branding */}
        <NavbarBrand as={Link} href="/">
          <AcademicCapIcon className="w-10 h-10 mr-4" />
          <h1>Alexandria</h1>
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
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
