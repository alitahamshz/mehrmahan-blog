export default function BlogHeader() {
  return (
    <header className="mx-auto mb-6 flex max-w-[1360px] items-center justify-start px-0">
      <nav
        aria-label="مسیر"
        className="flex items-center gap-3 text-sm font-semibold text-text-secondary"
      >
        <span className="flex h-5 w-5 items-center justify-center text-primary">
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9.5Z"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </svg>
        </span>
        <span>خانه</span>
        <span className="text-text-secondary/50">‹</span>
        <span aria-current="page">مجله</span>

      </nav>
    </header>
  );
}
