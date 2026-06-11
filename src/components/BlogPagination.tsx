import Link from "next/link";

type BlogPaginationProps = {
  currentPage: number;
  totalPages: number;
  search?: string;
  category?: number;
};

export default function BlogPagination({
  currentPage,
  totalPages,
  search,
  category,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const buildUrl = (page: number) => {
    const params = new URLSearchParams();

    params.set("page", String(page));

    if (search) params.set("search", search);
    if (category) params.set("category", String(category));

    return `?${params.toString()}`;
  };

  const page = Number(currentPage);
  const total = Number(totalPages);

  const pages: (number | string)[] = [];

  const siblingCount = 1;

  const startPage = Math.max(2, page - siblingCount);
  const endPage = Math.min(total - 1, page + siblingCount);

  pages.push(1);

  if (startPage > 2) {
    pages.push("...");
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < total - 1) {
    pages.push("...");
  }

  if (total > 1) {
    pages.push(total);
  }

  const goPrev = page > 1 ? page - 1 : 1;
  const goNext = page < total ? page + 1 : total;

  return (
    <nav
      aria-label="صفحه‌بندی مطالب"
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
    >
      <Link
        href={buildUrl(goPrev)}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/50 text-primary hover:bg-primary hover:text-white"
      >
        {"<"}
      </Link>

      {pages.map((p, idx) => {
        if (p === "...") {
          return (
            <span
              key={`dots-${idx}`}
              className="flex h-10 w-10 items-center justify-center text-text-secondary"
            >
              ...
            </span>
          );
        }

        const isActive = p === page;

        return (
          <Link
            key={p}
            href={buildUrl(p as number)}
            aria-current={isActive ? "page" : undefined}
            className={`flex h-10 min-w-10 items-center justify-center rounded-md border px-3 text-sm font-bold transition ${
              isActive
                ? "border-primary bg-primary text-white"
                : "border-primary/50 text-primary hover:bg-primary hover:text-white"
            }`}
          >
            {String(p).toLocaleString()}
          </Link>
        );
      })}

      <Link
        href={buildUrl(goNext)}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/50 text-primary hover:bg-primary hover:text-white"
      >
        {">"}
      </Link>
    </nav>
  );
}
