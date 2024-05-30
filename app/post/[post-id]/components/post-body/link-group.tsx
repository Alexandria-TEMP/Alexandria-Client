"use client";

import { Button, ButtonGroup, Divider } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Button group that links to different Post views.
 *
 * @param postId ID of Post the links refer to
 */
export default function LinkGroup({
  links,
}: Readonly<{ links: { href: string; label: string }[] }>) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ButtonGroup>
      {links.map((link, index) => (
        <div key={link.href}>
          {index !== 0 && <Divider orientation="vertical" />}
          <Button
            isDisabled={pathname === link.href}
            onClick={() => router.replace(link.href)}
          >
            {link.label}
          </Button>
        </div>
      ))}
    </ButtonGroup>
  );
}
