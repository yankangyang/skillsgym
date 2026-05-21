"use client";

import Link from "next/link";

interface ProtoNavProps {
  activePath?: string;
  variant?: "full" | "minimal" | "landing";
}

export default function ProtoNav({ activePath = "", variant = "full" }: ProtoNavProps) {
  const navLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Drills", href: "/drills" },
    { label: "Behavioral", href: "/behavioral" },
    { label: "Compete", href: "/compete/leaderboard" },
    { label: "Progress", href: "/progress" },
  ];

  return (
    <nav className="sticky top-0 z-50 h-14 bg-[#0f1020] border-b border-[#1d2540] flex items-center px-6">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-lg font-extrabold tracking-tight">
            Prep<span className="text-blue-400">Gym</span>
          </span>
        </Link>

        {/* Center nav */}
        {variant === "full" && (
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  activePath === link.href
                    ? "text-blue-400 bg-blue-400/10"
                    : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {variant === "landing" ? (
            <>
              <Link href="/dashboard" className="text-sm text-slate-400 hover:text-slate-100">
                Sign in
              </Link>
              <Link
                href="/onboarding"
                className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg transition-colors"
              >
                Get started
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-amber-400 font-semibold">🔥 14</span>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                YK
              </div>
              <Link
                href="/upgrade"
                className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors hidden md:block"
              >
                Upgrade
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
