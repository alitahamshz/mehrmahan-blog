"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CustomSelect from "@/components/ui/CustomSelect";

type BlogCategory = {
  id: string | number;
  title: string;
  count: number;
};

export default function BlogCategories({
  categories,
}: {
  categories: BlogCategory[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "";

  /** انتخاب یک دسته (toggle). خالی = حذف فیلتر (نمایش همه) */
  const applyCategory = (id: string | number | "") => {
    const params = new URLSearchParams(searchParams.toString());

    if (id === "" || String(id) === currentCategory) {
      params.delete("category");
    } else {
      params.set("category", String(id));
    }

    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      {/* موبایل (زیر md): فقط سلکت باکس، بدون کادر و عنوان */}
      <div className="md:hidden">
        <CustomSelect
          ariaLabel="انتخاب دسته‌بندی"
          value={currentCategory}
          onChange={(v) => applyCategory(v)}
          emptyLabel="همه‌ی دسته‌ها"
          placeholder="همه‌ی دسته‌ها"
          options={categories.map((c) => ({
            value: String(c.id),
            label: `${c.title} (${c.count})`,
          }))}
        />
      </div>

      {/* دسکتاپ (md به بالا): کادر + عنوان + لیست چک‌باکس */}
      <section className="hidden rounded-xl border border-neutral-gray-border bg-transparent p-6 md:block">
        <h2 className="mb-5 text-lg font-black text-primary">دسته‌بندی‌ها</h2>

        <ul className="space-y-5">
          {categories.map((c) => {
            const isActive = String(c.id) === currentCategory;

            return (
              <li key={c.id}>
                <label className="flex cursor-pointer items-center gap-3 text-md font-bold text-text-secondary">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={isActive}
                    onChange={() => applyCategory(c.id)}
                  />

                  <span className="h-4 w-4 rounded-sm border border-primary peer-checked:bg-primary" />

                  <span>
                    {c.title} ({c.count})
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
