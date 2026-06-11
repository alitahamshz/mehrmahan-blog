import Link from "next/link";

type EmptyStateProps = {
  title?: string;
  description?: string;
  showReset?: boolean;
};

export default function EmptyState({
  title = "بلاگی پیدا نشد",
  description = "نتیجه‌ای برای جستجوی شما وجود ندارد",
  showReset = true,
}: EmptyStateProps) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center text-center text-text-secondary">
      <p className="text-lg font-bold text-text-default">
        {title}
      </p>

      <p className="mt-2 text-sm">{description}</p>

      {showReset && (
        <Link
          href="/"
          className="mt-5 rounded-md border border-primary px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
        >
          نمایش همه مطالب
        </Link>
      )}
    </div>
  );
}