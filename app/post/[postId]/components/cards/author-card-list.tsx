import AuthorCard from "./author-card";

export default function AuthorCardList({
  collaboratorIds,
}: Readonly<{ collaboratorIds: string[] }>) {
  return (
    <div className="flex flex-col gap-y-2">
      {collaboratorIds.map((id) => (
        <AuthorCard memberId={id} key={id} />
      ))}
    </div>
  );
}
