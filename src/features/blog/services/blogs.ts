import { api, ApiError } from "@/shared/lib/api-client";
import {
  BlogFormErrors,
  RawApiErrors,
  BlogCategory,
  BlogPost,
} from "@/features/blog/types/blog-types";
import { parseBlogErrors } from "@/features/blog/utils/blog-errors";

const BLOGS_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}blog/blogs/`;
const BLOG_CATEGORIES_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}blog/blog-categories/`;
const CREATE_BLOG_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}blog/blog/`;
const DEFAULT_AUTHOR = "تیم محتوای ما";
const FALLBACK_IMAGE = "/post-cover.png";

type BlogApiCategory = {
  id: number;
  title: string;
};

type BlogApiItem = {
  id: number;
  category: BlogApiCategory;
  image: string | null;
  title: string;
  content: string;
  created_datetime: string;
};

type BlogApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: BlogApiItem[];
};

type BlogCategoryApiItem = {
  id: number;
  title: string;
  blog_count: number;
};

export type GetBlogsParams = {
  category?: number;
  page?: number;
  search?: string;
};

export type BlogList = {
  count: number;
  next: string | null;
  previous: string | null;
  posts: BlogPost[];
};

function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

function toBlogPost(item: BlogApiItem): BlogPost {
  return {
    id: String(item.id),
    title: item.title,
    excerpt: item.content,
    category: item.category.title,
    date: formatBlogDate(item.created_datetime),
    author: DEFAULT_AUTHOR,
    imageSrc: item.image || FALLBACK_IMAGE,
    slug: `blog-${item.id}`,
  };
}

export async function getBlogs(params: GetBlogsParams = {}): Promise<BlogList> {
  const response = await api.get<BlogApiResponse>(BLOGS_ENDPOINT, {
    next: { revalidate: 60 },
    query: {
      category: params.category,
      page: params.page ?? 1,
      search: params.search,
    },
  });

  return {
    count: response.count,
    next: response.next,
    previous: response.previous,
    posts: response.results.map(toBlogPost),
  };
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const response = await api.get<BlogCategoryApiItem[]>(
    BLOG_CATEGORIES_ENDPOINT,
    {
      next: { revalidate: 300 },
    },
  );

  return response.map((category) => ({
    id: category.id,
    title: category.title,
    count: category.blog_count,
  }));
}

export type CreateBlogInput = {
  category: number | null;
  title: string;
  content: string;
};

export type CreateBlogResult = {
  data: BlogPost | null;
  errors: BlogFormErrors | null;
};

export async function createBlog(
  input: CreateBlogInput,
): Promise<CreateBlogResult> {
  try {
    const item = await api.post<BlogApiItem | null>(CREATE_BLOG_ENDPOINT, {
      category: input.category,
      title: input.title,
      content: input.content,
    });
    const data =
      item && typeof item === "object" && "id" in item
        ? toBlogPost(item)
        : null;

    return { data, errors: null };
  } catch (error) {
    if (error instanceof ApiError) {
      if (
        error.status === 400 &&
        error.data &&
        typeof error.data === "object"
      ) {
        const parsed = parseBlogErrors(error.data as RawApiErrors);
        if (parsed.nonField.length || Object.keys(parsed.fields).length) {
          return { data: null, errors: parsed };
        }
        return {
          data: null,
          errors: { fields: {}, nonField: [error.message] },
        };
      }

      return {
        data: null,
        errors: { fields: {}, nonField: [error.message] },
      };
    }

    return {
      data: null,
      errors: {
        fields: {},
        nonField: ["ارسال بلاگ با خطا مواجه شد. لطفاً بعداً دوباره تلاش کنید."],
      },
    };
  }
}
