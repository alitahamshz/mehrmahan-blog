import Image from "next/image";
import type { BlogPost } from "@/lib/blog-data";

type FeaturedPostProps = {
  post: BlogPost;
};

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="grid gap-2 grid-cols-2 p-2 overflow-hidden rounded-xl border border-neutral-gray-border bg-transparent text-right lg:grid-cols-[1.05fr_0.95fr]">
      <div className="relative min-h-45 p-2 order-2 lg:order-2 lg:min-h-70">
        <Image
          alt={post.title}
          className="object-cover rounded-lg"
          fill
          priority
          sizes="(min-width: 1024px) 430px, 50vw"
          src={post.imageSrc}
        />
        <span className="absolute hidden md:block right-3 top-3 rounded-sm bg-secondary text-xs font-bold text-white lg:right-5 lg:top-5 lg:px-3 lg:py-1 lg:text-sm">
          {post.category}
        </span>
      </div>

      <div className="flex min-h-45 flex-col justify-between order-1 lg:order-1 lg:min-h-70">
        <div>
          <div className="mb-3 rounded-sm bg-lit-gray px-2 py-2 text-center text-xs font-bold text-text-secondary lg:mb-5 lg:px-4 lg:py-3 lg:text-sm">
            جدیدترین
          </div>
          <h1 className="text-sm font-black leading-[1.6] text-text-default lg:text-lg lg:leading-[1.8]">
            {post.title}
          </h1>
          <p className="mt-2 line-clamp-3 text-xs font-semibold leading-6 text-text-secondary lg:mt-5 lg:line-clamp-4 lg:text-base lg:leading-9">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-start gap-2 text-xs font-bold text-text-secondary lg:mt-6 lg:gap-3 lg:text-sm">
          <span className="flex h-8 w-8 items-center justify-center text-primary lg:h-11 lg:w-11">
            <Image
              src={"/icons/big-person.svg"}
              width={48}
              height={48}
              alt={post.author}
              className="h-full w-full"
            />
          </span>
          <span className="text-xs lg:text-sm">{post.author}</span>
        </div>
      </div>
    </article>
  );
}
