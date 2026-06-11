'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import FieldError from './FieldError';

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  /** پیام خطا (مثلاً errors.title?.message) */
  error?: string;
  /** آیکون داخل فیلد (سمت راست در حالت rtl) */
  startIcon?: ReactNode;
  /** کلاس wrapper بیرونی */
  wrapperClassName?: string;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, startIcon, id, wrapperClassName = '', className = '', ...rest },
  ref,
) {
  const fieldId = id ?? rest.name;
  const errorId = error ? `${fieldId}-error` : undefined;

  const border = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
    : 'border-neutral-gray-border focus:border-primary focus:ring-primary/20';

  return (
    <div className={`mb-4 ${wrapperClassName}`}>
      <label
        htmlFor={fieldId}
        className="mb-2 block text-right text-sm font-bold text-text-default"
      >
        {label}
      </label>

      <div className="relative">
        {startIcon && (
            <>
            <span className='absolute right-10 top-1/2 w-px h-6 bg-neutral-gray-border -translate-y-1/2 opacity-40'></span>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40">
            {startIcon}
          </span>
            </>
        )}
        <input
          id={fieldId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={`h-10 w-full rounded-lg border bg-white text-sm text-text-default outline-none placeholder:text-text-secondary/60 focus:ring-2 ${
            startIcon ? 'pr-11' : 'pr-4'
          } pl-4 ${border} ${className}`}
          {...rest}
        />
      </div>

      <FieldError id={errorId} message={error} />
    </div>
  );
});

export default TextField;
