"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GitHubStars } from "./github-stars";

const NAV_ITEMS = [
  { label: "components", href: "/components" },
  { label: "enterprise", href: "/enterprise" },
  { label: "docs", href: "/docs" },
  { label: "blog", href: "/blog" },
  { label: "careers", href: "/careers" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border sticky top-0 bg-background z-50">
      <nav className="max-w-[860px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between text-sm">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-accent text-base font-medium tracking-wider hover:opacity-70 transition-opacity"
          >
            Lunal
          </Link>
          <div className="hidden sm:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-accent ${
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "text-heading"
                    : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <GitHubStars />
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden text-muted hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>
      {open && (
        <div className="sm:hidden border-t border-border px-6 py-4 flex flex-col gap-1">
          {[{ label: "home", href: "/" }, ...NAV_ITEMS].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`text-base py-2 transition-colors hover:text-accent ${
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"))
                  ? "text-heading"
                  : "text-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
