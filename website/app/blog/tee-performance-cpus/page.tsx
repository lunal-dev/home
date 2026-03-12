import { getMarkdownContent } from "@/lib/markdown";
import { MarkdownPage } from "@/components/markdown-page";

export default function TeePerformanceCpusPage() {
  const content = getMarkdownContent("blog/tee-performance-cpus.md");
  return <MarkdownPage content={content} />;
}
