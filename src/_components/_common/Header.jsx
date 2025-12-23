import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black text-white">
      <div className="h-16 px-6 flex items-center justify-between shadow-sm">

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
            Job<span className="text-[#5723EC]">Portal</span>
          </span>
        </div>

        {/* Right Actions (optional) */}
        <div className="hidden sm:flex items-center gap-4 text-sm text-gray-300">
          <span className="cursor-pointer hover:text-white transition">
           <Link href="/help">Help </Link> 
          </span>
          <span className="cursor-pointer hover:text-white transition">
            <Link href="/">Profile</Link>
          
          </span>
        </div>
      </div>
    </header>
  );
}
