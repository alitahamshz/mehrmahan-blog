'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@/shared/components/ui/TextField';
import SelectField from '@/shared/components/ui/SelectField';
import TextareaField from '@/shared/components/ui/TextareaField';
import FormAlert from '@/shared/components/ui/FormAlert';
import FormSuccess from '@/shared/components/ui/FormSuccess';
import type { BlogFormErrors } from '@/features/blog/types/blog-types';

type BlogCategory = {
  id: string | number;
  title: string;
  count: number;
};

export type NewBlogFormValues = {
  title: string;
  category: string;
  content: string;
};

const schema: yup.ObjectSchema<NewBlogFormValues> = yup.object({
  title: yup
    .string()
    .trim()
    .required('عنوان بلاگ الزامیست')
    .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد'),
  category: yup.string().required('انتخاب دسته بندی الزامیست '),
  content: yup
    .string()
    .trim()
    .required('بدنه بلاگ الزامیست')
});

type NewBlogFormProps = {
  title?: string;
  onCancel?: () => void;
  onSubmit: (
    values: NewBlogFormValues,
  ) => Promise<BlogFormErrors | null | void>;
  categories: BlogCategory[];
};

export default function NewBlogForm({
  title = 'اضافه کردن بلاگ جدید',
  onCancel,
  onSubmit,
  categories,
}: NewBlogFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<NewBlogFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { title: '', category: '', content: '' },
    mode: 'onBlur',
  });

  const [nonFieldErrors, setNonFieldErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const submit = handleSubmit(async (values) => {
    setNonFieldErrors([]);
    clearErrors(['title', 'category', 'content']);

    const result = await onSubmit(values);

    if (!result) {
      setSuccess(true);
      closeTimer.current = setTimeout(() => {
        onCancel?.();
      }, 1000);
      return;
    }

    (Object.keys(result.fields) as (keyof BlogFormErrors['fields'])[]).forEach(
      (field) => {
        const message = result.fields[field];
        if (message) {
          setError(field, { type: 'server', message });
        }
      },
    );

    if (result.nonField.length) {
      setNonFieldErrors(result.nonField);
    }
  });

  return (
    <>
      <h2
        className="mb-6 text-center text-xl font-black text-text-default"
      >
        {title}
      </h2>

      <FormSuccess show={success} message="بلاگ با موفقیت ثبت شد" />

      <FormAlert messages={nonFieldErrors} />

      <form className='text-primary' onSubmit={submit} noValidate>
        <TextField
          id="blog-title"
          label="عنوان بلاگ"
          placeholder="عنوان بلاگ را وارد نمایید..."
          error={errors.title?.message}
          startIcon={
            <Image src="/icons/person-border.svg" width={22} height={22} alt="" />
          }
          {...register('title')}
        />

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <SelectField
              bgWhite={true}
              id="blog-category"
              name={field.name}
              label="دسته بندی"
              placeholder="مثال: عشق"
              error={errors.category?.message}
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.title,
              }))}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />

        <TextareaField
          id="blog-body"
          label="بدنه بلاگ"
          placeholder="متن بدنه بلاگ خودرا بنویسید"
          rows={5}
          wrapperClassName="mb-8"
          error={errors.content?.message}
          {...register('content')}
        />

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting || success}
            className="flex order-2 lg:order-1 h-10 w-full items-center justify-center rounded-lg border border-secondary bg-white font-bold text-text-default transition hover:bg-neutral-gray disabled:opacity-60 xs:w-full sm:flex-1"
          >
            انصراف
          </button>
          <button
            type="submit"
            disabled={isSubmitting || success}
            className="flex order-1 lg:order-2 h-10 w-full items-center justify-center rounded-lg bg-secondary font-bold text-white transition hover:opacity-90 disabled:opacity-60 xs:w-full sm:flex-1"
          >
            {success
              ? 'ثبت شد'
              : isSubmitting
                ? 'در حال ارسال...'
                : 'ثبت و انتشار بلاگ'}
          </button>
        </div>
      </form>
    </>
  );
}
