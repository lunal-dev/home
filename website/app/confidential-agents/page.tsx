import { getMarkdownContent } from "@/lib/markdown";
import { MarkdownPage } from "@/components/markdown-page";

export const metadata = { title: "Confidential Agents" };

export default function ConfidentialAgentsPage() {
  const content = getMarkdownContent("confidential-agents.md");
  return <MarkdownPage content={content} />;
}
