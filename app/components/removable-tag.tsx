export default function RemovableTag<Type>({
  tagtext,
  tagelem,
  remove,
}: {
  tagtext: string;
  tagelem: Type;
  remove: (a: Type) => void;
}) {
  return (
    <div
      style={{
        width: "fit-content",
        blockSize: "fit-content",
        backgroundColor: "white",
        borderWidth: "2px",
        borderBlockColor: "green",
        borderColor: "green",
        color: "black",
        borderRadius: "15px",
        padding: "1px 10px 1px 10px",
        fontSize: "13px",
      }}
    >
      <span> {tagtext} </span>
      <button onClick={(e) => remove(tagelem)}> x </button>
    </div>
  );
}
