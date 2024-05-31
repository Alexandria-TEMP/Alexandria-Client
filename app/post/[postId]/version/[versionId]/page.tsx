import { getVersionData } from "@/lib/api-calls/version-api";

export default async function PostVersion({
  params,
}: {
  params: { id: string };
}) {
  const data = await getVersionData(params.id);

  return <p>HELLLO! {data.renderStatus}</p>;
}
