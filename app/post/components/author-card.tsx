import Image from "next/image";

export default function AuthorCard({
  name,
  contribution,
}: Readonly<{
  name: string;
  contribution: string; // TODO make enum for CRediT roles
}>) {
  return (
    <div className="flex flex-row items-center gap-x-2">
      <div className="size-[60px] relative">
        <Image
          className="rounded-full"
          src="/placeholders/Marie_Curie.jpg"
          alt={`${name}'s profile picture`}
          fill
        />
      </div>
      <div className="flex flex-col">
        <p className="font-semibold">{name}</p>
        <p>{contribution}</p>
      </div>
    </div>
  );
}
