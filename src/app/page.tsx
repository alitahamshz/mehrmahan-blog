import type { Metadata } from "next";
import BlogHeader from "@/components/BlogHeader";
import BlogPagination from "@/components/BlogPagination";
import BlogSidebar from "@/components/BlogSidebar";
import FeaturedPost from "@/components/FeaturedPost";
import EmptyState from "@/components/ui/EmptyState";
import PostCard from "@/components/PostCard";
import { getBlogs, getBlogCategories } from "@/services";

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
type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
};

export default async function BlogHomePage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page || 1);
  const category = params.category ? Number(params.category) : undefined;

  const search = params.search;
  const blogList = await getBlogs({
    page,
    category,
    search,
  }).catch(() => ({
    count: 0,
    next: null,
    previous: null,
    posts: [],
  }));
  const totalPages = Math.ceil(blogList.count / 24);
  console.log({ blogList });

  const posts = blogList.posts.length > 0 ? blogList.posts : [];
  const [featuredPost, ...latestPosts] = posts;
  const categoryList = await getBlogCategories();
  console.log({ categoryList });
  const categories = categoryList.length > 0 ? categoryList : [];

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
    <main
      className="min-h-screen bg-bg px-5 py-5 text-right text-text-default"
      dir="rtl"
    >
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <BlogHeader />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <div className="lg:w-70 lg:shrink-0">
          <BlogSidebar categories={categories} />
        </div>

        <section
          aria-labelledby="latest-posts-title"
          className="min-w-0 flex-1"
        >
          <h2 id="latest-posts-title" className="sr-only">
            آخرین مطالب مجله
          </h2>
          {latestPosts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <FeaturedPost post={featuredPost} />

              <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-6 xl:grid-cols-3">
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
            </>
          )}
          <BlogPagination
            currentPage={page}
            totalPages={totalPages}
            search={search}
            category={category}
          />{" "}
        </section>
      </div>
    </main>
  );
}
