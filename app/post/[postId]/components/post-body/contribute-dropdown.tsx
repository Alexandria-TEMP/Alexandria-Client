"use client";

import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useState } from "react";

/**
 * Dropdown style button group for post contribution options.
 *
 */
export default function ContributeDropdown() {
  const [selectedOption, setSelectedOption] = useState(new Set(["contribute"]));

  const descriptionsMap = {
    contribute:
      "Suggest changes to this post, which might be incorporated after a peer review.",
    review:
      "Peer review this version. If the version is accepted by three peers, it'll become the post's main version.",
    fork: "Start a new post, using this one as a base.",
  };

  const labelsMap: {
    [index: string]: string;
  } = {
    contribute: "Contribute",
    review: "Review",
    fork: "Fork",
  };

  // Convert the Set to an Array and get the first value.
  const selectedOptionValue = Array.from(selectedOption)[0];

  // TODO actions
  // TODO disable 'review' and 'contribute' when appropriate
  return (
    <ButtonGroup>
      <Button>{labelsMap[selectedOptionValue]}</Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Contribution options"
          selectedKeys={selectedOption}
          selectionMode="single"
          // @ts-expect-error ts doesn't see setState as type (string[]) => void
          onSelectionChange={setSelectedOption}
          className="max-w-[300px]"
        >
          <DropdownItem
            key="contribute"
            description={descriptionsMap["contribute"]}
          >
            {labelsMap["contribute"]}
          </DropdownItem>
          <DropdownItem key="review" description={descriptionsMap["review"]}>
            {labelsMap["review"]}
          </DropdownItem>
          <DropdownItem key="fork" description={descriptionsMap["fork"]}>
            {labelsMap["fork"]}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}
