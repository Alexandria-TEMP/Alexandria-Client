import { idT } from "./api-types";

export type QuartoContainerTypeT = "branch" | "post";

export type QuartoContainerT = {
  id: idT;
  type: QuartoContainerTypeT;
};
