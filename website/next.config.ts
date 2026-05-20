import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/components", destination: "/cloud", permanent: true },
      { source: "/enterprise", destination: "/cloud", permanent: true },
      { source: "/agents-api", destination: "/confidential-agents", permanent: true },
    ];
  },
};

export default nextConfig;
