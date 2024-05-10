export default function HeaderSubtle({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <h6 className="text-neutral-400">{children}</h6>;
}
