import Link from "next/link";
import { navLinks } from "@/src/lib/domain/mockups";

export function SiteShell({
  children,
  active
}: Readonly<{
  children: React.ReactNode;
  active: (typeof navLinks)[number]["href"];
}>) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" href="/">
          <span className="brand-mark">SG</span>
          <span>
            <strong>Skills Gym</strong>
          </span>
        </Link>
        <nav className="nav-row" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              className={link.href === active ? "nav-link active" : "nav-link"}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
