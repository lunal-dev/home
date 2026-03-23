"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { GitHubStars } from "./github-stars";

const NAV_ITEMS = [
  { label: "components", href: "/components" },
  { label: "enterprise", href: "/enterprise" },
  { label: "docs", href: "/docs" },
  { label: "blog", href: "/blog" },
  { label: "careers", href: "/careers" },
  { label: "team", href: "/team" },
];

const DEMO_ITEMS = [
  { label: "private inference", href: "https://private-inference-demo.lunal.dev/" },
  { label: "simulator", href: "https://simulator.lunal.dev/" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [demosOpen, setDemosOpen] = useState(false);
  const [mobileDemosOpen, setMobileDemosOpen] = useState(false);
  const demosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (demosRef.current && !demosRef.current.contains(e.target as Node)) {
        setDemosOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="border-b border-border sticky top-0 bg-background z-50">
      <nav className="max-w-[860px] mx-auto px-4 md:px-10 h-14 flex items-center justify-between text-sm">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-accent tracking-wider hover:opacity-70 transition-opacity"
          >
            lunal
          </Link>
          <div className="hidden sm:flex items-center gap-5">
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
            <div ref={demosRef} className="relative">
              <button
                onClick={() => setDemosOpen(!demosOpen)}
                className={`transition-colors hover:text-accent text-muted flex items-center gap-1`}
              >
                demos
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform ${demosOpen ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {demosOpen && (
                <div className="absolute top-full left-0 mt-2 min-w-[160px] bg-background border border-border rounded-md py-1 shadow-lg">
                  {DEMO_ITEMS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setDemosOpen(false)}
                      className="block px-3 py-2 text-muted hover:text-accent hover:bg-border/30 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
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
        <div className="sm:hidden border-t border-border px-4 py-4 flex flex-col gap-1">
          {[{ label: "home", href: "/" }, ...NAV_ITEMS].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`py-2 transition-colors hover:text-accent ${
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"))
                  ? "text-heading"
                  : "text-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => setMobileDemosOpen(!mobileDemosOpen)}
            className="py-2 text-left text-muted hover:text-accent transition-colors flex items-center gap-1"
          >
            demos
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform ${mobileDemosOpen ? "rotate-180" : ""}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {mobileDemosOpen && (
            <div className="pl-4 flex flex-col gap-1">
              {DEMO_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { setOpen(false); setMobileDemosOpen(false); }}
                  className="py-2 text-muted hover:text-accent transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
