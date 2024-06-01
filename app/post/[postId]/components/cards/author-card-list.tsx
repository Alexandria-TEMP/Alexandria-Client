import { idType } from "@/lib/types/api-types";
import AuthorCard from "./author-card";

export default function AuthorCardList({ ids }: Readonly<{ ids: idType[] }>) {
  return (
    <div className="flex flex-col gap-y-2">
      {ids.map((id) => (
        <AuthorCard id={id.toString()} key={id} />
      ))}
    </div>
  );
}
