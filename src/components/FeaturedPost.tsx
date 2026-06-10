import Image from "next/image";
import type { BlogPost } from "@/lib/blog-data";

type FeaturedPostProps = {
  post: BlogPost;
};

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="grid overflow-hidden rounded-xl border border-neutral-gray-border bg-transparent text-right lg:grid-cols-[1.05fr_0.95fr]">
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

      <div className="flex min-h-[280px] flex-col justify-between p-4 lg:order-1">
        <div>
          <div className="mb-5 bg-gray-300 rounded-sm px-4 py-3 text-center text-sm font-bold text-text-secondary">
            جدیدترین
          </div>
          <h1 className="text-lg font-black leading-[1.8] text-text-default">
            {post.title}
          </h1>
          <p className="mt-5 line-clamp-4 text-base font-semibold leading-9 text-text-secondary">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-start gap-3 text-sm font-bold text-text-secondary">
          <span className="flex h-11 w-11 items-center justify-center text-primary">
            <Image src={'/icons/big-person.svg'} width={48} height={48} alt={post.author} />
          </span>
          <span className="text-sm">{post.author}</span>
        </div>
      </div>
    </article>
  );
}
