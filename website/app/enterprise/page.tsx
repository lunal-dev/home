import { getMarkdownContent } from "@/lib/markdown";
import { MarkdownPage } from "@/components/markdown-page";

export const metadata = { title: "Enterprise" };

export default function EnterprisePage() {
  const content = getMarkdownContent("enterprise.md");
  return <MarkdownPage content={content} />;
}
