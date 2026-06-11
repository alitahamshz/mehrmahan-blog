'use client';

import { useState } from 'react';
import Modal from '../ui/Modal';
import NewBlogForm, { type NewBlogFormValues } from '../NewBlogForm';
import { createBlog } from '@/services/blogs';
import type { BlogFormErrors } from '@/lib/blog-errors';

type BlogCategory = {
  id: string | number;
  title: string;
  count: number;
};

type NewBlogModalProps = {
  categories: BlogCategory[];
  /** پس از ساخت موفق بلاگ صدا زده می‌شود (مثلاً برای refresh لیست) */
  onCreated?: () => void;
};

export default function NewBlogModal({
  categories,
  onCreated,
}: NewBlogModalProps) {
  const [open, setOpen] = useState(false);
  // با هر بار باز شدن مقدار افزایش می‌یابد تا فرم کاملاً ری‌مونت (ریست) شود
  const [formKey, setFormKey] = useState(0);

  const handleOpen = () => {
    setFormKey((k) => k + 1); // فرم تازه و خالی
    setOpen(true);
  };

  const handleSubmit = async (
    values: NewBlogFormValues,
  ): Promise<BlogFormErrors | null> => {
    const { errors } = await createBlog({
      // مقدار select رشته است → به عدد تبدیل می‌کنیم
      category: values.category === '' ? null : Number(values.category),
      title: values.title,
      content: values.content,
    });

    if (errors) return errors; // خطاها در فرم نمایش داده می‌شوند

    // موفقیت: مودال را اینجا نمی‌بندیم؛ فرم پیام موفقیت را نشان می‌دهد و
    // پس از یک ثانیه با onCancel آن را می‌بندد.
    onCreated?.();
    return null;
  };

  return (
    <>
      <span className='text-lg font-normal mb-3'>اضافه کردن بلاگ</span>
      <button
        type="button"
        onClick={handleOpen}
        className="flex h-10 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white transition hover:bg-secondary"
      >
        نوشتن بلاگ جدید
      </button>

      <Modal open={open} onClose={() => setOpen(false)} labelledBy="modal-title">
        <NewBlogForm
          key={formKey}
          titleId="modal-title"
          categories={categories}
          onCancel={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
}
