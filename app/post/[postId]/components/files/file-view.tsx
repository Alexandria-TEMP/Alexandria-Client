import { getFileContents } from "@/lib/api-calls/version-api";
import { parseId } from "@/lib/string-utils";
import { IdProp } from "@/lib/types/react-props/id-prop";

export default async function FileView({
  id,
  path,
}: IdProp &
  Readonly<{
    path: string;
  }>) {
  const data = await getFileContents(parseId(id), path);
  return (
    <div className="px-2 border-2 bg-default-100 rounded-md font-mono">
      {data}
    </div>
  );
}
