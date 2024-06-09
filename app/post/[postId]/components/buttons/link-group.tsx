"use client";

import { Button, ButtonGroup, Divider } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";

/**
 * Button group with arbitrary links and labels
 * @param links list of href and their button's label
 */
export default function LinkGroup({
  links,
}: Readonly<{ links: { href: string; label: string }[] }>) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ButtonGroup>
      {links.map((link, index) => (
        <Fragment key={link.href}>
          {index !== 0 && <Divider orientation="vertical" />}
          <Button
            isDisabled={pathname === link.href}
            onClick={() => router.replace(link.href)}
          >
            {link.label}
          </Button>
        </Fragment>
      ))}
    </ButtonGroup>
  );
}
