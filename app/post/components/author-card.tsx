import Image from "next/image";
import placeholderProfilePic from "~/public/placeholder-researchers.jpg";

export default function AuthorCard({
  name,
  contribution,
}: Readonly<{
  name: string;
  contribution: string;
}>) {
  return (
    <div className="flex flex-row content-center">
      <Image
        className="rounded-full size-[48px]"
        src={placeholderProfilePic}
        width={128}
        height={128}
        alt={`${name}'s profile picture`}
      />
      <div className="flex flex-col">
        <p className="font-semibold">{name}</p>
        <p>{contribution}</p>
      </div>
    </div>
  );
}
