export default function Tag({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="rounded-lg px-3 bg-neutral-100 dark:bg-neutral-700 truncate text-nowrap hover:text-wrap">
      {children}
    </div>
  );
}
