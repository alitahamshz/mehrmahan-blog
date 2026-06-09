import type { Metadata } from "next";
import BlogHeader from "@/components/BlogHeader";
import BlogPagination from "@/components/BlogPagination";
import BlogSidebar from "@/components/BlogSidebar";
import FeaturedPost from "@/components/FeaturedPost";
import PostCard from "@/components/PostCard";
import { categories, posts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "مجله مهرماهان | راهنمای خرید، آموزش و مطالب تخصصی",
  description:
    "آخرین مطالب مجله مهرماهان درباره راهنمای خرید، آموزش، سرگرمی، اخبار و موضوعات علمی را بخوانید.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "مجله مهرماهان",
    description:
      "صفحه اصلی مجله مهرماهان با جستجو، دسته‌بندی‌ها و آخرین مطالب.",
    type: "website",
    locale: "fa_IR",
  },
};

export default function BlogHomePage() {
  const [featuredPost, ...latestPosts] = posts;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "مجله مهرماهان",
    inLanguage: "fa-IR",
    description: metadata.description,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      author: {
        "@type": "Organization",
        name: post.author,
      },
      datePublished: post.date,
      image: post.imageSrc,
      url: `/${post.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-bg px-5 py-5 text-right text-text-default" dir="rtl">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <BlogHeader />
      <div className="mx-auto grid max-w-[1360px] gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="lg:col-start-1 lg:row-start-1">
          <BlogSidebar categories={categories} />
        </div>

        <section
          aria-labelledby="latest-posts-title"
          className="min-w-0 lg:col-start-2 lg:row-start-1"
        >
          <h2 id="latest-posts-title" className="sr-only">
            آخرین مطالب مجله
          </h2>
          <FeaturedPost post={featuredPost} />

          <div className="mt-7 grid justify-items-center gap-x-6 gap-y-7 md:grid-cols-2 xl:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard
                key={post.id}
                author={post.author}
                category={post.category}
                date={post.date}
                imageSrc={post.imageSrc}
                title={post.title}
              />
            ))}
          </div>

          <BlogPagination />
        </section>
      </div>
    </main>
  );
}
