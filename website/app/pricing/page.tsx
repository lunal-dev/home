import { getMarkdownContent } from "@/lib/markdown";
import { MarkdownPage } from "@/components/markdown-page";

export const metadata = { title: "Pricing" };

export default function PricingPage() {
  const content = getMarkdownContent("pricing.md");
  return <MarkdownPage content={content} />;
}
