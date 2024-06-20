import { useState } from "react";

/**
 * Allows one to force a client component to rerender by calling its
 * returned function. Wrraper for useState
 * @returns
 *  triggerRerender - function that forces a component rerender,
 *  watch - boolean value that is flipped when a rerender is triggered
 */
export default function useTriggerRerender() {
  const [rerender, setRerender] = useState(false);
  const triggerRerender = () => setRerender(!rerender);
  return { triggerRerender, watch: rerender };
}
