import Link from "next/link";
import ThemeSwitcher from "./components/theme-switcher";

export default function Home() {
  return (
    <div>
      <ThemeSwitcher />
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  );
}
