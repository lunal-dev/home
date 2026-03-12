import { getMarkdownContent } from "@/lib/markdown";
import { MarkdownPage } from "@/components/markdown-page";

export default function CareersPage() {
  const content = getMarkdownContent("careers/README.md");
  return <MarkdownPage content={content} />;
}
