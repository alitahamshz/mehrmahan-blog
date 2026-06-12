import type { MetadataRoute } from "next";
import {
  getBlogs,
  getBlogCategories,
} from "@/features/blog/services";

const SITE_URL = "http://localhost:3000";
const PAGE_SIZE = 24;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  try {
    const firstPage = await getBlogs({
      page: 1,
    });

    const totalPages = Math.ceil(
      firstPage.count / PAGE_SIZE,
    );

    const allPosts = [...firstPage.posts];

    // دریافت تمام پست‌ها
    for (let page = 2; page <= totalPages; page++) {
      const result = await getBlogs({
        page,
      });

      allPosts.push(...result.posts);
    }

    // دریافت دسته‌بندی‌ها
    const categories = await getBlogCategories();

    const homePage: MetadataRoute.Sitemap[number] = {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    };

    const categoryUrls = categories
      .filter((category) => category.count > 0)
      .map((category) => ({
        url: `${SITE_URL}/?category=${category.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));

    const paginationUrls =
      totalPages > 1
        ? Array.from(
            { length: totalPages - 1 },
            (_, index) => ({
              url: `${SITE_URL}/?page=${index + 2}`,
              lastModified: now,
              changeFrequency: "daily" as const,
              priority: 0.6,
            }),
          )
        : [];

    const postUrls = allPosts.map((post) => ({
      url: `${SITE_URL}/${post.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    return [
      homePage,
      ...categoryUrls,
      ...paginationUrls,
      ...postUrls,
    ];
  } catch (error) {
    console.error("Sitemap generation failed:", error);

    return [
      {
        url: SITE_URL,
        lastModified: now,
        changeFrequency: "daily",
        priority: 1,
      },
    ];
  }
}