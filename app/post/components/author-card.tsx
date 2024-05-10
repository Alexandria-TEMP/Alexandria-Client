import Image from "next/image";
import placeholderProfilePic from "~/public/placeholder-researchers.jpg";

export default function AuthorCard({
  name,
  subtitle,
}: Readonly<{
  name: string;
  subtitle: string;
}>) {
  return (
    <div className="flex flex-row content-center gap-x-2">
      <Image
        className={`rounded-full`}
        src={placeholderProfilePic}
        height={40}
        width={40}
        alt={`${name}'s profile picture`}
      />
      <div className="flex flex-col">
        <p className="font-semibold">{name}</p>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
