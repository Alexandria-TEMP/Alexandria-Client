import getMemberData from "../lib/member-api";
import { Avatar } from "@nextui-org/react";

//  TODO link to profile
export default async function AuthorCard({
  memberId,
}: Readonly<{
  memberId: string;
}>) {
  const data = await getMemberData(memberId);
  const fullName = `${data.firstName} ${data.lastName}`;

  return (
    <div className="flex flex-row gap-x-2">
      <div className="size-[60px] relative">
        <Avatar src={data.picture} size="lg" />
      </div>
      <div className="flex flex-col">
        <p className="font-semibold">{fullName}</p>
        <p>{data.institution}</p>
      </div>
    </div>
  );
}
