import getMemberData from "../lib/member-api";
import { Avatar } from "@nextui-org/react";

//  TODO link to profile

/**
 * Small card that represents a member.
 *
 * @param memberId Member ID
 */
export default async function AuthorCard({
  memberId,
}: Readonly<{
  memberId: string;
}>) {
  const data = await getMemberData(memberId);
  const fullName = `${data.firstName} ${data.lastName}`;

  return (
    <div className="flex gap-3">
      <Avatar radius="full" size="md" src={data.picture} />
      <div className="flex flex-col gap-1 items-start justify-center">
        <h4 className="text-small font-semibold leading-none text-default-600">
          {fullName}
        </h4>
        <h5 className="text-small tracking-tight text-default-400">
          {data.institution}
        </h5>
      </div>
    </div>
  );
}
