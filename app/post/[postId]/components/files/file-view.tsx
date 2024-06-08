import { idType } from "@/lib/types/api-types";

export default function FileView({
  versionId,
  path,
}: Readonly<{
  versionId: idType;
  path: string;
}>) {
  return (
    <div className="px-2 border-2 bg-default-100 rounded-md font-mono">{`I'll fetch ${path} from ${versionId}`}</div>
  );
}
