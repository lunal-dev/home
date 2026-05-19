import { getMarkdownContent } from "@/lib/markdown";
import { MarkdownPage } from "@/components/markdown-page";

export const metadata = { title: "Agents API" };

export default function AgentsApiPage() {
  const content = getMarkdownContent("agents-api.md");
  return <MarkdownPage content={content} />;
}
