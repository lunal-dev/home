import { getMarkdownContent } from "@/lib/markdown";
import { MarkdownPage } from "@/components/markdown-page";

export default function BlogPage() {
  const content = getMarkdownContent("blog/README.md");
  return <MarkdownPage content={content} />;
}
