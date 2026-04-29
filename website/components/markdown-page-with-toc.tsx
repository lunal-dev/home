import { MarkdownPage } from "./markdown-page";
import { TableOfContents, type TocItem } from "./table-of-contents";

/**
 * Extracts h2 and h3 headings from a markdown string.
 * IDs match what rehype-slug generates (lowercase, hyphens, no punctuation).
 */
function extractHeadings(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;

  while ((match = regex.exec(markdown)) !== null) {
    const level = match[1].length;
    // Strip markdown link syntax [text](url) → text
    const text = match[2].trim().replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

    // Replicate rehype-slug's ID generation
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    items.push({ id, text, level });
  }

  return items;
}

export function MarkdownPageWithToc({
  content,
  extraTocItems,
  insertAfterId,
}: {
  content: string;
  extraTocItems?: TocItem[];
  /** When set, splice extraTocItems into the heading list immediately after the heading with this id. Otherwise extras are appended. */
  insertAfterId?: string;
}) {
  const headings = extractHeadings(content);
  let items: TocItem[] = headings;
  if (extraTocItems && extraTocItems.length > 0) {
    if (insertAfterId) {
      const idx = headings.findIndex((h) => h.id === insertAfterId);
      items = idx >= 0
        ? [...headings.slice(0, idx + 1), ...extraTocItems, ...headings.slice(idx + 1)]
        : [...headings, ...extraTocItems];
    } else {
      items = [...headings, ...extraTocItems];
    }
  }

  return (
    <>
      {items.length > 0 && <TableOfContents items={items} />}
      <MarkdownPage content={content} />
    </>
  );
}

export { extractHeadings };
