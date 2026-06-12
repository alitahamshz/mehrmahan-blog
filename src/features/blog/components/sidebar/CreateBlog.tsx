"use client";

import { useState } from "react";
import Modal from "@/shared/components/ui/Modal";
import NewBlogForm, { type NewBlogFormValues } from "../NewBlogForm";
import { createBlog } from "@/features/blog/services/blogs";
import type { BlogFormErrors } from "@/features/blog/types/blog-types";

type BlogCategory = {
  id: string | number;
  title: string;
  count: number;
};

type NewBlogModalProps = {
  categories: BlogCategory[];
  onCreated?: () => void;
};

export default function NewBlogModal({
  categories,
  onCreated,
}: NewBlogModalProps) {
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleOpen = () => {
    setFormKey((k) => k + 1);
    setOpen(true);
  };

  const handleSubmit = async (
    values: NewBlogFormValues,
  ): Promise<BlogFormErrors | null> => {
    const { errors } = await createBlog({
      category: values.category === "" ? null : Number(values.category),
      title: values.title,
      content: values.content,
    });

    if (errors) return errors;

    onCreated?.();
    return null;
  };

  return (
    <section>
      <span className="text-lg font-normal mb-3">اضافه کردن بلاگ</span>
      <button
        type="button"
        onClick={handleOpen}
        className="flex h-10 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white transition hover:bg-secondary"
      >
        نوشتن بلاگ جدید
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        labelledBy="modal-title"
      >
        <NewBlogForm
          key={formKey}
          categories={categories}
          onCancel={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      </Modal>
    </section>
  );
}
