"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";


const NAV_ITEMS = [
  { label: "enterprise", href: "/enterprise" },
  { label: "cloud", href: "/cloud" },
  { label: "pricing", href: "/pricing" },
  { label: "docs", href: "/docs" },
];

const DEMO_ITEMS = [
  { label: "simulator", href: "https://simulator.confidential.ai/" },
  { label: "private inference", href: "https://private-inference-demo.confidential.ai/" },
];

const COMPANY_ITEMS = [
  { label: "team", href: "/team" },
  { label: "careers", href: "/careers" },
  { label: "blog", href: "/blog" },
];

const BOTTOM_NAV_ITEMS = [
  { label: "components", href: "/components" },
  { label: "blog", href: "/blog" },
  { label: "team", href: "/team" },
  { label: "careers", href: "/careers" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  return (
    <header className="border-b border-border sticky top-0 bg-background z-50">
      <nav className="max-w-[860px] mx-auto px-4 md:px-10 h-14 flex items-center justify-between text-sm">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="hover:opacity-70 transition-opacity"
          >
            <img src="/assets/logo.png" alt="Confidential" width={28} height={28} />
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
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="hidden sm:block relative"
            onMouseEnter={() => setCompanyOpen(true)}
            onMouseLeave={() => setCompanyOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCompanyOpen((v) => !v)}
              className="flex items-center gap-1 text-muted transition-colors hover:text-accent"
            >
              company
              <svg aria-hidden="true" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {companyOpen && (
              <div className="absolute right-0 top-full pt-2">
                <div className="min-w-[180px] border border-border bg-background rounded-md py-1 shadow-lg">
                  {COMPANY_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-3 py-2 hover:text-accent hover:bg-border/40 transition-colors ${
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
            )}
          </div>
          <div
            className="hidden sm:block relative"
            onMouseEnter={() => setDemoOpen(true)}
            onMouseLeave={() => setDemoOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDemoOpen((v) => !v)}
              className="flex items-center gap-1 text-muted transition-colors hover:text-accent"
            >
              demos
              <svg aria-hidden="true" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {demoOpen && (
              <div className="absolute right-0 top-full pt-2">
                <div className="min-w-[180px] border border-border bg-background rounded-md py-1 shadow-lg">
                  {DEMO_ITEMS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-2 text-muted hover:text-accent hover:bg-border/40 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
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
          {[{ label: "home", href: "/" }, ...NAV_ITEMS, ...BOTTOM_NAV_ITEMS].map((item) => (
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
          {DEMO_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="py-2 text-muted hover:text-accent transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
