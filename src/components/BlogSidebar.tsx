import type { BlogCategory } from "@/lib/blog-data";
import Image from "next/image";
import NewBlogModal from "@/components/NewBlogModal";

type BlogSidebarProps = {
  categories: BlogCategory[];
};

export default function BlogSidebar({ categories }: BlogSidebarProps) {
  return (
    <aside className="w-full space-y-6 lg:sticky lg:top-8">
      <section aria-labelledby="blog-search-title">
        <h2
          id="blog-search-title"
          className="mb-3 text-right text-base font-black text-text-default"
        >
          جستجوی مجله
        </h2>
        <label className="relative block">
          <span className="sr-only">جستجوی مطالب مجله</span>
          <input
            className="h-10 w-full rounded-lg border border-neutral-gray-border bg-transparent px-4 pr-11 text-sm text-text-default outline-none transition placeholder:text-text-secondary/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="مثال: راهنمای خرید و فروش"
            type="search"
          />
          <span className="absolute top-2 right-9 w-px h-6 bg-neutral-gray-border" />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
            <Image src={'/icons/search.svg'} width={24} height={26} alt="Search" />
          </span>
        </label>
      </section>

      <section
        aria-labelledby="blog-categories-title"
        className="rounded-xl border border-neutral-gray-border bg-transparent p-6"
      >
        <h2
          id="blog-categories-title"
          className="mb-5 ext-right text-lg font-black text-primary"
        >
          دسته‌بندی‌ها
        </h2>
        <ul className="space-y-5">
          {categories.map((category) => (
            <li key={category.id}>
              <label className="flex cursor-pointer items-center gap-3 text-md font-bold text-text-secondary">
                <input
                  className="peer sr-only w-4 h-4"
                  name="category"
                  type="checkbox"
                />
                <span className="h-4 w-4 shrink-0 rounded-sm border border-primary transition peer-checked:bg-primary" />
                <span>
                  {category.title} ({category.count})
                </span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="add-blog-title">
        <h2
          id="add-blog-title"
          className="mb-3 text-right text-lg font-black text-text-secondary"
        >
          اضافه کردن بلاگ
        </h2>
        <NewBlogModal />
      </section>
    </aside>
  );
}
