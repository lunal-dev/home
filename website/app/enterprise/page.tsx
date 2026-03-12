import { getMarkdownContent } from "@/lib/markdown";
import { MarkdownPage } from "@/components/markdown-page";

export default function EnterprisePage() {
  const content = getMarkdownContent("enterprise.md");
  return <MarkdownPage content={content} />;
}
