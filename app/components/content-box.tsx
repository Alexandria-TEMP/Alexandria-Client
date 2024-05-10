export default function ContentBox({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-6 -mx-2 max-w-full rounded-lg bg-white dark:bg-black">
      {children}
    </div>
  );
}
