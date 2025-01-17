import { fetchMemberData } from "@/lib/api/services/member-api";
import { getMemberName } from "@/lib/get-format";
import { idT } from "@/lib/types/api-types";
import { IdProp } from "@/lib/types/react-props/id-prop";
import { User } from "@nextui-org/react";

/**
 * Small card that represents a member.
 * @param id Member ID
 */
export default async function AuthorCard({ id }: IdProp) {
  const data = await fetchMemberData(id as idT);

  return (
    // div wrapper is needed for proper centering
    <div>
      <User name={getMemberName(data)} description={data.institution} />
    </div>
  );
}
