import type { Metadata } from "next";
import { Lora, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lunal",
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
      <body className={`${lora.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="px-6 md:px-10 py-16 max-w-[860px] mx-auto">
          {children}
        </main>
        <footer className="border-t border-border px-6 py-10 text-center text-xs text-muted tracking-wide">
          lunal &mdash; confidential compute
        </footer>
      </body>
    </html>
  );
}
