import { getMarkdownContent } from "@/lib/markdown";
import { MarkdownPage } from "@/components/markdown-page";

export default function TeamPage() {
  const content = getMarkdownContent("team.md");
  return <MarkdownPage content={content} />;
}
