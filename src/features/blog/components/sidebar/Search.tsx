"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function BlogSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";

  const [value, setValue] = useState(currentSearch);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(
        searchParams.toString()
      );

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      params.set("page", "1");

      router.push(`/?${params.toString()}`);
    }, 500);

    return () => clearTimeout(handler);
  }, [value]);

  const clear = () => {
    setValue("");

    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.delete("search");
    params.set("page", "1");

    router.push(`/?${params.toString()}`);
  };

  return (
    <section aria-labelledby="blog-search-title" className="hidden lg:block">
      <h2 className="mb-3 text-right text-lg text-primary text-text-default">
        جستجوی مجله
      </h2>

      <label className="relative block">
        <input
          className="h-10 w-full rounded-lg border border-neutral-gray-border bg-transparent px-4 pr-10 text-sm text-text-default outline-none transition"
          placeholder="مثال: راهنمای خرید"
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <span className="absolute right-3 top-1/2 -translate-y-1/2">
          <Image
            src="/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
        </span>

        {value && (
          <button
            type="button"
            onClick={clear}
            className="absolute left-3 top-[57%] -translate-y-1/2 text-lg text-text-secondary hover:text-primary"
          >
            ✕
          </button>
        )}
      </label>
    </section>
  );
}