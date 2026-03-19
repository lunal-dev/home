import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { getMarkdownContent } from "@/lib/markdown";
import { MarkdownPage } from "@/components/markdown-page";

const BLOG_DIR = path.resolve(process.cwd(), "..", "blog");

export function generateStaticParams() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") && f !== "README.md");
  return files.map((f) => ({ slug: f.replace(/\.md$/, "") }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const content = getMarkdownContent(`blog/${slug}.md`);
  return <MarkdownPage content={content} />;
}
