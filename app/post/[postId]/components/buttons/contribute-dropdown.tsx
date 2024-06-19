"use client";

import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export type ContributeOptions = "contribute" | "review" | "fork";

/**
 * Dropdown style button group for post contribution options.
 * @param routes Defines route to redirect to when each button is pressed.
 *               If a route is not included, the button is disabled.
 * @param descriptions The tooltip that accompanies each button. If a description
 *                     is not included, falls back to the default ones.
 */
export default function ContributeDropdown({
  routes,
  descriptions,
}: Readonly<{
  routes: { [key in ContributeOptions]?: string };
  descriptions?: { [key in ContributeOptions]?: string };
}>) {
  const router = useRouter();

  // Currently selected option
  const [selectedOptionKey, setSelectedOptionKey] = useState(
    new Set(["contribute"]),
  );

  // Available options
  const [options, setOptions] = useState<
    {
      key: ContributeOptions;
      label: string;
      description: string;
      href: string;
    }[]
  >([
    {
      key: "contribute",
      label: "Contribute",
      description:
        descriptions?.contribute ??
        "Suggest changes to this post, which might be incorporated after a peer review.",
      href: "",
    },
    {
      key: "review",
      label: "Review",
      description:
        descriptions?.review ??
        "Peer review this version. If the version is accepted by three peers, it'll become the post's main version.",
      href: "",
    },
    {
      key: "fork",
      label: "Fork",
      description:
        descriptions?.fork ?? "Start a new post, using this one as a base.",
      href: "",
    },
  ]);

  // Update options based on contents of 'routes'
  useEffect(() => {
    const updatedOptions = options
      // Filters options that are not disabled
      .filter((option) => !!routes[option.key])
      // Update hrefs in 'options'
      .map((option) => ({
        ...option,
        href: routes[option.key] as string,
      }));

    // All are disabled!
    if (updatedOptions.length == 0) {
      throw new Error("all options in contribute dropdown are disabled");
    }

    // Set default option as first enabled one
    setSelectedOptionKey(new Set([updatedOptions[0].key]));
    // Set available options
    setOptions(updatedOptions);

    // disable reason: it wishes to add 'options' as a dependency, but since we
    // use setOptions within the hook, this would trigger an infinite rerender loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routes]);

  // Get currently selected option from option array
  const selectedOption = useMemo(() => {
    // Find selected option
    const ret = options.find(
      (option) => option.key === Array.from(selectedOptionKey)[0],
    );
    // Prefetch it's href to make navigation smoother
    if (ret && typeof window != "undefined") router.prefetch(ret.href);

    return ret;
  }, [selectedOptionKey, options, router]);

  // Main button defined here since it is reused twice
  const mainButton = (
    <Button
      onPress={() => router.push(selectedOption!.href)}
      isDisabled={selectedOption!.key === "fork"} // Forking is not currently implemented
    >
      {selectedOption!.label}
    </Button>
  );

  // If there's only one option, don't render dropdown
  if (options.length == 1) {
    return (
      <Tooltip content={selectedOption!.description}>{mainButton}</Tooltip>
    );
  }

  return (
    <ButtonGroup>
      {mainButton}
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Contribution options"
          selectedKeys={selectedOptionKey}
          selectionMode="single"
          // @ts-expect-error ts doesn't see setState as type (string[]) => void
          onSelectionChange={setSelectedOptionKey}
          className="max-w-[300px]"
          items={options}
        >
          {(option) => (
            <DropdownItem key={option.key} description={option.description}>
              {option.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}
