export default function ContentBox({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-6 -mx-2 flex-col max-w-full rounded-lg bg-white text-slate-900">
      {children}
    </div>
  );
}
