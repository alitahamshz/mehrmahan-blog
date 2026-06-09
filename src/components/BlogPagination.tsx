const pages = ["‹", "۱", "۲", "۳", "۴", "۱۰", "›"];

export default function BlogPagination() {
  return (
    <nav
      aria-label="صفحه‌بندی مطالب"
      className="mt-8 flex items-center justify-center gap-2"
    >
      {pages.map((page) => {
        const isActive = page === "۱";

        return (
          <button
            key={page}
            aria-current={isActive ? "page" : undefined}
            className={`flex h-10 w-10 items-center justify-center rounded-md border text-sm font-bold transition ${
              isActive
                ? "border-primary bg-primary text-white"
                : "border-primary/50 bg-transparent text-primary hover:bg-primary hover:text-white"
            }`}
            type="button"
          >
            {page}
          </button>
        );
      })}
    </nav>
  );
}
