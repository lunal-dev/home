import { getMarkdownContent } from "@/lib/markdown";
import { MarkdownPageWithToc } from "@/components/markdown-page-with-toc";

export const metadata = { title: "Docs" };

export default function DocsPage() {
  const content = getMarkdownContent("docs/README.md");
  return <MarkdownPageWithToc content={content} />;
}
