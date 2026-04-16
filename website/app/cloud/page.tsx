import { getMarkdownContent } from "@/lib/markdown";
import { MarkdownPage } from "@/components/markdown-page";

export default function CloudPage() {
  const content = getMarkdownContent("cloud.md");
  return <MarkdownPage content={content} />;
}
