"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  CircleUserRound,
  BadgeQuestionMark,
  Briefcase,
  ClipboardList,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Profile", icon: CircleUserRound },
  { href: "/location", label: "Apply for Job", icon: Briefcase },
  { href: "/appliedJob", label: "Applied Jobs", icon: ClipboardList },
  { href: "/help", label: "Help & Support", icon: BadgeQuestionMark },
];

export default function Navbar() {
  const pathname = usePathname();

  const linkClasses = (isActive) =>
    `group flex items-center gap-3 px-4 py-3 text-sm font-medium border-r-4 transition-all
     ${
       isActive
         ? "bg-slate-800 text-white border-[#5723EC]"
         : "text-slate-300 border-transparent hover:bg-slate-800 hover:text-white"
     }`;

  return (
    <nav className="flex flex-col h-full pt-6 gap-2">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={linkClasses(isActive)}
            title={label} // tooltip when collapsed
          >
            <Icon className="h-5 w-5 shrink-0" />

            {/* Text (appears on sidebar hover) */}
            <span className="opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
