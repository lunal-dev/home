import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

function isInternalLink(href: string): boolean {
  return (href.startsWith("/") && !href.startsWith("//")) || href.startsWith("#");
}

function MarkdownLink(props: ComponentPropsWithoutRef<"a">) {
  const { href, children, ...rest } = props;
  if (href && isInternalLink(href)) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

export function MarkdownPage({ content }: { content: string }) {
  return (
    <article className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          a: MarkdownLink,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
