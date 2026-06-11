import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "testalakiforsalar.s3.ir-thr-at1.arvanstorage.ir",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
