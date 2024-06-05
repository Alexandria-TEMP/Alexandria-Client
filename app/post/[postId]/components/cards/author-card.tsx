import getMemberData from "@/lib/api-calls/member-api";
import { getMemberName } from "@/lib/get-format";
import { IdProp } from "@/lib/types/react-props/id-prop";
import { User } from "@nextui-org/react";

//  TODO link to profile

/**
 * Small card that represents a member.
 * @param id Member ID
 */
export default async function AuthorCard({ id }: IdProp) {
  const data = await getMemberData(id);

  return (
    <div>
      <User
        name={getMemberName(data)}
        description={data.institution}
        avatarProps={{ src: data.picture }}
      />
    </div>
  );
}
