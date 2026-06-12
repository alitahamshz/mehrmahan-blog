import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-6xl font-bold">404</h1>

        <h2 className="text-2xl font-semibold">
          صفحه پیدا نشد
        </h2>

        <p className="text-muted-foreground">
          صفحه‌ای که به دنبال آن هستید وجود ندارد.
        </p>

        <Link
          href="/"
          className="inline-block rounded-md border px-4 py-2 transition hover:bg-muted"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </main>
  );
}