import ContentBox from "@/components/content-box";

// TODO contents as props
export default function Discussion() {
  const someText: string =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ea, consequatur quibusdam earum reiciendis voluptatem commodi, possimus nemo facere consequuntur ipsum placeat minus excepturi nulla, doloremque quia! Molestiae, natus quasi.";

  return (
    <ContentBox>
      <p>{someText}</p>
      <button>Reply</button>
    </ContentBox>
  );
}
