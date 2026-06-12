import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/*?search="],
      },
    ],
    sitemap: "http://localhost:3003/sitemap.xml",
  };
}