"use client";

import { Button, ButtonGroup, Divider } from "@nextui-org/react";
import { Fragment } from "react";

/**
 * Button group to perform arbitrary actions
 * @param actions list of objects that represent an action
 * @param action.label button's label
 * @param action.do called when button is pressed
 * @param action.isDisabled if button is disabled
 */
export default function ActionGroup({
  actions,
}: Readonly<{
  actions: { do: () => void; label: string; isDisabled: boolean }[];
}>) {
  return (
    <ButtonGroup>
      {actions.map((action, index) => (
        <Fragment key={action.label}>
          {index !== 0 && <Divider orientation="vertical" />}
          <Button isDisabled={action.isDisabled} onClick={action.do}>
            {action.label}
          </Button>
        </Fragment>
      ))}
    </ButtonGroup>
  );
}
