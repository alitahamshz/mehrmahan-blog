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
export type BlogFieldName = "title" | "content" | "category";

export type BlogFormErrors = {
  fields: Partial<Record<BlogFieldName, string>>;
  nonField: string[];
};

export type RawApiErrors = Record<string, unknown>;
