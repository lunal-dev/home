import { getMarkdownContent } from "@/lib/markdown";
import { MarkdownPage } from "@/components/markdown-page";

export default function DocsPage() {
  const content = getMarkdownContent("docs/README.md");
  return <MarkdownPage content={content} />;
}
