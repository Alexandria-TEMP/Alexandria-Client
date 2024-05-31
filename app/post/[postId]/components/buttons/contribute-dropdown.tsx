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
import { useEffect, useState } from "react";

export type ContributeOptions = "contribute" | "review" | "fork";

/**
 * Dropdown style button group for post contribution options.
 *
 * @param disabled Disables specific options in dropdown
 */
export default function ContributeDropdown({
  disabled,
}: Readonly<{ disabled?: ContributeOptions[] }>) {
  const [selectedOptionKey, setSelectedOptionKey] = useState(
    new Set(["contribute"]),
  );

  const [options, setOptions] = useState([
    {
      key: "contribute",
      label: "Contribute",
      description:
        "Suggest changes to this post, which might be incorporated after a peer review.",
    },
    {
      key: "review",
      label: "Review",
      description:
        "Peer review this version. If the version is accepted by three peers, it'll become the post's main version.",
    },
    {
      key: "fork",
      label: "Fork",
      description: "Start a new post, using this one as a base.",
    },
  ]);

  // Set options based on what is disabled
  useEffect(() => {
    if (!disabled) return;
    // Filters options that are not disabled
    const enabledOptions = options.filter(
      (option) =>
        !disabled.some((disabledOption) => disabledOption === option.key),
    );
    // All are disabled!
    if (enabledOptions.length == 0) {
      throw new Error("all options in contribute dropdown are disabled");
    }
    // Set default option as first enabled one
    setSelectedOptionKey(new Set([enabledOptions[0].key]));
    // Set available options
    setOptions(enabledOptions);
  }, [options, disabled]);

  // Get currently selected option from option array
  const selectedOption = options.filter(
    (option) => option.key === Array.from(selectedOptionKey)[0],
  )[0];

  // If there's only one option, don't render dropdown
  if (options.length == 1) {
    return (
      <Tooltip content={selectedOption.description}>
        <Button>{selectedOption.label}</Button>
      </Tooltip>
    );
  }

  // TODO actions
  return (
    <ButtonGroup>
      <Button>{selectedOption.label}</Button>
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
