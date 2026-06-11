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
      className="relative h-auto w-full text-right drop-shadow-[0_22px_55px_rgba(42,54,72,0.16)] md:h-90"
      dir="rtl"
    >
      <div className="absolute bottom-0 left-0 z-20 h-[52px] w-[52px] rounded-[8px] bg-white shadow-[0_16px_34px_rgba(42,54,72,0.16)]">
        <button
          type="button"
          aria-label="مشاهده پست"
          className="flex h-full w-full items-center justify-center rounded-[10px] text-text-default transition hover:bg-neutral-gray"
        >
          <Image
            alt="View Post"
            width={28}
            height={28}
            src={'/icons/eye.svg'}
          />
        </button>
      </div>

      <div className="post-card-inverted-radius relative z-10 overflow-hidden bg-white md:h-full">
        <div className="p-3 pb-0">
          <div className="relative h-32.5 overflow-hidden rounded-[7px] md:h-45.25">
            <Image
              alt={title}
              className="h-full w-full object-cover"
              fill
              src={imageSrc}
            />
            <span className="absolute left-3 top-3 rounded-sm bg-secondary px-3 py-1.5 text-xs font-medium text-white shadow-sm">
              {category}
            </span>
          </div>
        </div>

        <div className="px-4 pt-3">
          <h2 className="text-sm font-medium leading-[1.7] text-text-default md:text-[18px] md:leading-[1.9]">
            {title}
          </h2>
        </div>

        <div className="px-4 py-3 md:absolute md:bottom-0 md:left-21.75 md:right-0 md:h-16 md:bg-white md:py-2">
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <span className="flex h-5 w-5 items-center justify-center text-primary">
              <Image
                alt="Date"
                width={20}
                height={20}
                src={'/icons/time.svg'}
              />
            </span>
            <span>{date}</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-text-secondary">
            <span className="flex h-5 w-5 items-center justify-center text-primary">
              <Image
                alt={author}
                width={20}
                height={20}
                src={'/icons/small-person.svg'}
              />
            </span>
            <span>{author}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
