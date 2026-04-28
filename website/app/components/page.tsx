import { getMarkdownContent } from "@/lib/markdown";
import { MarkdownPage } from "@/components/markdown-page";

export const metadata = { title: "Components" };

export default function ComponentsPage() {
  const content = getMarkdownContent("components.md");
  return <MarkdownPage content={content} />;
}
