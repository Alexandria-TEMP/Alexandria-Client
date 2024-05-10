// TODO props should be just link to post
export default function PostCardMini({
  title,
  status,
}: Readonly<{ title: string; status: string }>) {
  return (
    <div>
      <h2>{title}</h2>
      {/* TODO tag */}
      <p>{status}</p>
    </div>
  );
}
