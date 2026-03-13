import fs from "fs";
import path from "path";

const CONTENT_ROOT = path.resolve(process.cwd(), "..");

/**
 * Validates that a resolved path stays within CONTENT_ROOT.
 * Prevents path traversal attacks.
 */
function safePath(relativePath: string): string {
  const resolved = path.resolve(CONTENT_ROOT, relativePath);
  if (!resolved.startsWith(CONTENT_ROOT + path.sep) && resolved !== CONTENT_ROOT) {
    throw new Error(`Path traversal detected: ${relativePath}`);
  }
  return resolved;
}

/**
 * Converts a file-system-relative markdown path to an absolute website route.
 * sourceDir is the directory of the markdown file being processed (relative to CONTENT_ROOT).
 */
function resolveLink(href: string, sourceDir: string): string {
  // Already absolute
  if (href.startsWith("/")) {
    // /README.md -> /
    if (href === "/README.md") return "/";
    // Strip .md extension
    href = href.replace(/\.md$/, "");
    // Strip trailing slash
    href = href.replace(/\/$/, "");
    return href;
  }

  // Relative link — resolve against the source file's directory
  const resolved = path.posix.normalize(path.posix.join("/", sourceDir, href));
  // Strip .md extension
  let route = resolved.replace(/\.md$/, "");
  // Strip trailing slash
  route = route.replace(/\/$/, "");
  return route;
}

/**
 * Reads a markdown file from the content root (the repo root),
 * strips the GitHub HTML nav header, and rewrites internal links
 * to work as website routes.
 *
 * @param relativePath - path to the markdown file relative to CONTENT_ROOT
 */
export function getMarkdownContent(relativePath: string): string {
  const filePath = safePath(relativePath);
  let content = fs.readFileSync(filePath, "utf-8");

  // The directory of this markdown file, relative to CONTENT_ROOT
  const sourceDir = path.posix.dirname(relativePath);

  // Strip the GitHub nav header block
  content = content.replace(
    /<div align="center">\s*<nav>[\s\S]*?<\/nav>\s*<\/div>\s*(?:<br\s*\/?>)?/,
    ""
  );

  // Rewrite markdown links: [text](href) -> [text](resolved route)
  // Matches (href) in markdown link syntax, but not image src or bare URLs
  content = content.replace(
    /\]\(([^)]+)\)/g,
    (_match, href: string) => {
      // Skip external links, anchors, mailto, and image files
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("#")
      ) {
        return `](${href})`;
      }

      // Skip non-markdown links (images, etc)
      if (!href.endsWith(".md") && !href.endsWith("/") && !href.includes(".md#")) {
        // Could be a relative directory link or an asset
        if (href.startsWith("./assets/") || href.startsWith("/assets/")) {
          return `](${href.replace("./assets/", "/assets/")})`;
        }
        // Leave as-is if not a markdown link
        return `](${href})`;
      }

      // Split href and anchor
      const [linkPath, anchor] = href.split("#");
      const route = resolveLink(linkPath, sourceDir);
      return `](${route}${anchor ? "#" + anchor : ""})`;
    }
  );

  // Handle image paths - ./assets/logo.png -> /assets/logo.png
  content = content.replace(/\(\.\/assets\//g, "(/assets/");
  // Handle HTML img src attributes - src="./assets/..." -> src="/assets/..."
  content = content.replace(/src="\.\/assets\//g, 'src="/assets/');

  return content;
}
