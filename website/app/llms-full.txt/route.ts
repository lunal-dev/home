import { buildLlmsFullText } from "@/lib/llms";

export const revalidate = 3600;

export async function GET() {
  return new Response(buildLlmsFullText(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
