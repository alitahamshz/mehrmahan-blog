export type BlogCategory = {
  id: string;
  title: string;
  count: number;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  imageSrc: string;
  slug: string;
};

export const categories: BlogCategory[] = [
  { id: "buying-guide", title: "راهنمای خرید", count: 32 },
  { id: "education", title: "آموزشی", count: 5 },
  { id: "entertainment", title: "سرگرمی", count: 8 },
  { id: "science", title: "علمی", count: 22 },
  { id: "news", title: "اخبار", count: 1 },
];

export const posts: BlogPost[] = Array.from({ length: 15 }, (_, index) => ({
  id: `post-${index + 1}`,
  title:
    "راهنمای کامل خرید و سرمایه‌گذاری در سایت ما | هرآنچه قبل از خرید...",
  excerpt:
    "خرید و فروش ریشه درختان یکی از روش‌های نوین سرمایه‌گذاری در آب و خاک است که امکان خرید و فروش آنلاین را فراهم می‌کند.",
  category: "راهنمای خرید",
  date: "۱۴۰۴/۰۹/۲۳",
  author: "تیم محتوای ما",
  imageSrc: "/post-cover.png",
  slug: `buying-guide-${index + 1}`,
}));
