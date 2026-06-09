import type { BlogCategory } from "@/lib/blog-data";

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
            className="h-11 w-full rounded-md border border-neutral-gray bg-transparent px-4 pr-11 text-sm text-text-default outline-none transition placeholder:text-text-secondary/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="مثال: راهنمای خرید و فروش"
            type="search"
          />
          <span className="absolute right-4 w-1 h-3"/>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
            </svg>
          </span>
        </label>
      </section>

      <section
        aria-labelledby="blog-categories-title"
        className="rounded-md border border-text-default bg-transparent p-6"
      >
        <h2
          id="blog-categories-title"
          className="mb-6 text-right text-lg font-black text-primary"
        >
          دسته‌بندی‌ها
        </h2>
        <ul className="space-y-5">
          {categories.map((category) => (
            <li key={category.id}>
              <label className="flex cursor-pointer items-center justify-between gap-3 text-sm font-bold text-text-secondary">
                <input
                  className="peer sr-only"
                  name="category"
                  type="checkbox"
                />
                <span>
                  {category.title} ({category.count})
                </span>
                <span className="h-4 w-4 rounded-[3px] border border-primary transition peer-checked:bg-primary" />
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="add-blog-title">
        <h2
          id="add-blog-title"
          className="mb-3 text-right text-base font-black text-text-secondary"
        >
          اضافه کردن بلاگ
        </h2>
        <button
          className="h-11 w-full rounded-md bg-primary px-4 text-sm font-bold text-white transition hover:bg-secondary"
          type="button"
        >
          نوشتن بلاگ جدید
        </button>
      </section>
    </aside>
  );
}
