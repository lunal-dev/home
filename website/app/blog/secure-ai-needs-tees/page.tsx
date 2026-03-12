import { getMarkdownContent } from "@/lib/markdown";
import { MarkdownPage } from "@/components/markdown-page";

export default function SecureAiNeedsTeesPage() {
  const content = getMarkdownContent("blog/secure-ai-needs-tees.md");
  return <MarkdownPage content={content} />;
}
