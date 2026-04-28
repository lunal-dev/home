"use client";

import { useEffect, useState, useRef } from "react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is intersecting (visible)
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the one closest to the top
          visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    headings.forEach((h) => observerRef.current!.observe(h));

    return () => observerRef.current?.disconnect();
  }, [items]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
      history.replaceState(null, "", `#${id}`);
    }
  }

  return (
    <nav
      aria-label="Table of contents"
      className="hidden xl:block fixed top-24 left-6 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto text-xs leading-relaxed"
    >
      <ul className="flex flex-col gap-0.5 border-l border-border pl-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`block py-0.5 transition-colors no-underline hover:text-foreground ${
                item.level === 3 ? "pl-3" : ""
              } ${
                activeId === item.id
                  ? "text-accent"
                  : item.level === 2 ? "text-heading" : "text-muted"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
