"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">
          مشکلی پیش آمد
        </h1>

        <p className="text-muted-foreground">
          در بارگذاری اطلاعات خطایی رخ داده است.
        </p>

        <button
          onClick={reset}
          className="rounded-md border px-4 py-2 transition hover:bg-muted"
        >
          تلاش مجدد
        </button>
      </div>
    </main>
  );
}