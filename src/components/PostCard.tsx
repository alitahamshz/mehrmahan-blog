import Image from "next/image";

type PostCardProps = {
  title: string;
  category: string;
  date: string;
  author: string;
  imageSrc: string;
};

export default function PostCard({
  title,
  category,
  date,
  author,
  imageSrc,
}: PostCardProps) {
  return (
    <article
      className="relative h-[360px] w-[322px] text-right drop-shadow-[0_22px_55px_rgba(42,54,72,0.16)]"
      dir="rtl"
    >
      <div className="absolute bottom-0 left-0 z-20 h-[52px] w-[52px] rounded-[8px] bg-white shadow-[0_16px_34px_rgba(42,54,72,0.16)]">
        <button
          type="button"
          aria-label="مشاهده پست"
          className="flex h-full w-full items-center justify-center rounded-[10px] text-text-default transition hover:bg-neutral-gray"
        >
          <svg
            aria-hidden="true"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.8 16s4.4-7.2 12.2-7.2S28.2 16 28.2 16 23.8 23.2 16 23.2 3.8 16 3.8 16Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.4"
            />
            <path
              d="M16 19.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.4"
            />
          </svg>
        </button>
      </div>

      <div className="post-card-inverted-radius relative z-10 h-full overflow-hidden bg-white">
        <div className="p-3 pb-0">
          <div className="relative h-[181px] overflow-hidden rounded-[7px]">
            <Image
              alt={title}
              className="h-full w-full object-cover"
              fill
              sizes="298px"
              src={imageSrc}
            />
            <span className="absolute left-3 top-3 rounded-sm bg-primary px-3 py-2 text-xs font-medium text-white shadow-sm">
              {category}
            </span>
          </div>
        </div>

        <div className="px-4 pt-3">
          <h2 className="text-[18px] font-medium leading-[1.9] text-text-default">
            {title}
          </h2>
        </div>

        <div className="absolute bottom-0 left-[87px] right-0 h-[64px] bg-white px-4 py-2">
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-primary text-primary">
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m5 8 5 5 5-5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            </span>
            <span>{date}</span>

          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-text-secondary">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-primary text-primary">
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 10a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.6"
                />
                <path
                  d="M4.2 17c.8-3 3-4.5 5.8-4.5s5 1.5 5.8 4.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.6"
                />
              </svg>
            </span>
            <span>{author}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
