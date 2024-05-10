"use client";

// TODO better styling for this
export default function ButtonInline({
  label,
  onClick,
}: Readonly<{ label: string; onClick: () => void }>) {
  return (
    <button onClick={onClick}>
      <p className="underline">{label}</p>
    </button>
  );
}
