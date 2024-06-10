import { IdProp } from "@/lib/types/react-props/id-prop";
import { CloudArrowDownIcon } from "@heroicons/react/20/solid";
import { Button } from "@nextui-org/react";

/**
 * Small download button, that downloads projects files on click
 * @param id TODO which id
 */
export default function DownloadButton({ id }: IdProp) {
  // TODO downloading functionality

  return (
    <Button isIconOnly onPress={() => console.log("donwloading " + id)}>
      <CloudArrowDownIcon className="size-6" />
    </Button>
  );
}
