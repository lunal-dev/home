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
 * Reads a markdown file from the content root (the repo root),
 * strips the GitHub HTML nav header, and rewrites internal links
 * to work as website routes.
 */
export function getMarkdownContent(relativePath: string): string {
  const filePath = safePath(relativePath);
  let content = fs.readFileSync(filePath, "utf-8");

  // Strip the GitHub nav header block (the <div align="center"><nav>...</nav></div> and optional <br>)
  content = content.replace(
    /<div align="center">\s*<nav>[\s\S]*?<\/nav>\s*<\/div>\s*(?:<br\s*\/?>)?/,
    ""
  );

  // Rewrite internal markdown links to website routes:
  // /README.md -> /
  content = content.replace(/\(\/README\.md\)/g, "(/)");
  // /foo.md -> /foo (root-level .md files become top-level routes)
  content = content.replace(/\(\/([\w-]+)\.md\)/g, "(/$1)");
  // /path/to/file.md -> /path/to/file (nested .md files)
  content = content.replace(/\(\/([\w-]+(?:\/[\w-]+)+)\.md\)/g, "(/$1)");
  // /path/to/dir/ -> /path/to/dir (trailing slash on directories)
  content = content.replace(/\(\/([\w-]+(?:\/[\w-]+)*)\/(\.\.\/[\w-]+(?:\/[\w-]+)*\/?)?\)/g, (match, p) => {
    // Only strip trailing slash from directory links, not relative links
    if (match.includes("../")) return match;
    return `(/${p})`;
  });

  // Generic: convert relative .md links in docs (e.g., intro-to-tees.md -> intro-to-tees)
  content = content.replace(/\((\.\.\/)?([\w-]+)\.md\)/g, (_match, prefix, name) => {
    if (prefix === "../") {
      return `(/docs/${name})`;
    }
    return `(${name})`;
  });

  // Convert relative links within the same directory (01-threat-model.md -> 01-threat-model)
  content = content.replace(/\(([\d][\w-]+)\.md\)/g, "($1)");

  // Handle image paths - ./assets/logo.png -> /assets/logo.png
  content = content.replace(/\(\.\/assets\//g, "(/assets/");

  return content;
}
