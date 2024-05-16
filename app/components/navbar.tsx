import { AcademicCapIcon } from "@heroicons/react/24/outline";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import ThemeSwitcher from "./theme-switcher";

export default function AlexandriaNavbar() {
  return (
    <Navbar isBordered>
      {/* Branding */}
      <NavbarBrand>
        <AcademicCapIcon className="w-10 h-10 mr-4" />
        <h1>Alexandria</h1>
      </NavbarBrand>
      {/* Main contents */}
      <NavbarContent>
        <NavbarItem>
          <Link href="/">Home</Link>
        </NavbarItem>
      </NavbarContent>
      {/* End contents */}
      <NavbarContent>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
