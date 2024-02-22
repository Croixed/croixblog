import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <nav className="relative flex items-center justify-between w-full max-w-4xl px-4 py-5 mx-auto">
      {/* link has client side navigation and pre fetching and more  */}
      <Link href="/" className="text-3xl font-bold">
        Croix <span className="text-primary">Blog</span>
      </Link>
      <ModeToggle />
    </nav>
  )
}