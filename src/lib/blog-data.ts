export type BlogCategory = {
  id: string | number;
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