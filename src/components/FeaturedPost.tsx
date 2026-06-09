import Image from "next/image";
import type { BlogPost } from "@/lib/blog-data";

type FeaturedPostProps = {
  post: BlogPost;
};

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="grid overflow-hidden rounded-md border border-white bg-black text-right shadow-[0_22px_55px_rgba(42,54,72,0.16)] lg:grid-cols-[1.05fr_0.95fr]">
      <div className="relative min-h-[280px] lg:order-2">
        <Image
          alt={post.title}
          className="object-cover"
          fill
          priority
          sizes="(min-width: 1024px) 430px, 100vw"
          src={post.imageSrc}
        />
        <span className="absolute right-5 top-5 rounded-sm bg-primary px-4 py-2 text-sm font-bold text-white">
          {post.category}
        </span>
      </div>

      <div className="flex min-h-[280px] flex-col justify-between p-6 lg:order-1">
        <div>
          <div className="mb-5 rounded-sm bg-neutral-gray px-4 py-3 text-center text-sm font-bold text-text-secondary">
            جدیدترین
          </div>
          <h1 className="text-2xl font-black leading-[1.8] text-text-default">
            {post.title}
          </h1>
          <p className="mt-5 line-clamp-4 text-base font-semibold leading-9 text-text-secondary">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 text-sm font-bold text-text-secondary">
          <span>{post.author}</span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary text-primary">
            <svg
              aria-hidden="true"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M4.5 21c1.1-4 3.8-6 7.5-6s6.4 2 7.5 6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}
