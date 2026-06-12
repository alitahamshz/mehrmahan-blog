import type { Metadata } from "next";
import BlogHeader from "@/features/blog/components/BlogHeader";
import BlogPagination from "@/features/blog/components/BlogPagination";
import BlogSidebar from "@/features/blog/components/BlogSidebar";
import FeaturedPost from "@/features/blog/components/FeaturedPost";
import EmptyState from "@/shared/components/ui/EmptyState";
import PostCard from "@/features/blog/components/PostCard";
import { getBlogs, getBlogCategories } from "@/features/blog/services";

const SITE_URL = "http://localhost:3000";

type SearchParams = {
  page?: string;
  search?: string;
  category?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;

  const page = Number(params.page || 1);
  const search = params.search;
  const categoryId = params.category;

  const categories = await getBlogCategories();

  const category = categoryId
    ? categories.find((item) => item.id === Number(categoryId))
    : undefined;

  let title = "مجله مهرماهان | راهنمای خرید، آموزش و مطالب تخصصی";

  let description =
    "آخرین مطالب مجله مهرماهان درباره راهنمای خرید، آموزش، سرگرمی، اخبار و موضوعات علمی را بخوانید.";

  const query = new URLSearchParams();

  if (page > 1) {
    query.set("page", String(page));
  }

  if (categoryId) {
    query.set("category", categoryId);

    title = `مطالب دسته‌بندی ${category?.title ?? ""} | مجله مهرماهان`;

    description = `مطالب مرتبط با ${category?.title ?? ""} در مجله مهرماهان`;
  }

  if (search) {
    query.set("search", search);

    title = `نتایج جستجو برای "${search}" | مجله مهرماهان`;

    description = `نتایج جستجوی "${search}" در مجله مهرماهان`;
  }

  const canonical = query.toString() ? `/?${query.toString()}` : "/";

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    robots: search
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },

    openGraph: {
      title,
      description,
      locale: "fa_IR",
      type: "website",
      url: `${SITE_URL}${canonical}`,
    },
  };
}

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

  const posts = blogList.posts.length > 0 ? blogList.posts : [];
  const [featuredPost, ...latestPosts] = posts;
  const hasPosts = posts.length > 0;
  const categoryList = await getBlogCategories();
  const categories = categoryList.length > 0 ? categoryList : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "مجله مهرماهان",
    inLanguage: "fa-IR",
    description:
      "آخرین مطالب مجله مهرماهان درباره راهنمای خرید، آموزش، سرگرمی، اخبار و موضوعات علمی را بخوانید.",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      author: {
        "@type": "Person",
        name: post.author,
      },
      datePublished: post.date,
      image: post.imageSrc,
      url: `${SITE_URL}/${post.slug}`,
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
      <h1 className="sr-only">مجله مهرماهان</h1>
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
          {!hasPosts ? (
            <EmptyState />
          ) : (
            <>
              {featuredPost && <FeaturedPost post={featuredPost} />}

              {latestPosts.length > 0 && (
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
              )}
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
