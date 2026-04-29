import type { Metadata } from "next";
import Script from "next/script";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Confidential AI",
    template: "Confidential AI ･ %s",
  },
  description: "The AI confidential compute platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          src="https://plausible.io/js/pa-fe_AMrp4xlNmw8myKYHux.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
        </Script>
      </head>
      <body className={`${sourceSerif.variable} ${sourceSerif.className} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="px-4 md:px-10 py-12 w-full max-w-[860px] mx-auto flex-1">
          {children}
        </main>
        <footer className="border-t border-border px-6 py-10 text-xs text-muted tracking-wide">
          <div className="max-w-[860px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="text-heading font-medium mb-3">Resources</h4>
                <ul className="flex flex-col gap-2">
                  <li><a href="/enterprise" className="text-muted hover:text-foreground transition-colors">Enterprise</a></li>
                  <li><a href="/components" className="text-muted hover:text-foreground transition-colors">Components</a></li>
                  <li><a href="/docs" className="text-muted hover:text-foreground transition-colors">Docs</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-heading font-medium mb-3">Platform</h4>
                <ul className="flex flex-col gap-2">
                  <li><a href="/cloud" className="text-muted hover:text-foreground transition-colors">Cloud</a></li>
                  <li><a href="/pricing" className="text-muted hover:text-foreground transition-colors">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-heading font-medium mb-3">Company</h4>
                <ul className="flex flex-col gap-2">
                  <li><a href="/team" className="text-muted hover:text-foreground transition-colors">Team</a></li>
                  <li><a href="/careers" className="text-muted hover:text-foreground transition-colors">Careers</a></li>
                  <li><a href="/blog" className="text-muted hover:text-foreground transition-colors">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-heading font-medium mb-3">Demos</h4>
                <ul className="flex flex-col gap-2">
                  <li><a href="https://simulator.confidential.ai/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors">Simulator</a></li>
                  <li><a href="https://private-inference-demo.confidential.ai/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors">Private Inference</a></li>
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-border">
              <span>confidential ai</span>
              <a
                href="https://www.linkedin.com/company/confi-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted hover:text-foreground transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://x.com/Confi_AI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-muted hover:text-foreground transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
