"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import FieldError from "./FieldError";

export type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  wrapperClassName?: string;
};

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  function TextareaField(
    { label, error, id, wrapperClassName = "", className = "", ...rest },
    ref,
  ) {
    const fieldId = id ?? rest.name;
    const errorId = error ? `${fieldId}-error` : undefined;

    const border = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : "border-neutral-gray-border focus:border-primary focus:ring-primary/20";

    return (
      <div className={`mb-4 ${wrapperClassName}`}>
        <label
          htmlFor={fieldId}
          className="mb-2 block text-right text-sm font-bold text-text-default"
        >
          {label}
        </label>

        <textarea
          id={fieldId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={`w-full resize-none rounded-lg border bg-white lg:bg-transparent px-4 py-3 text-sm text-text-default outline-none placeholder:text-text-secondary/60 focus:ring-2 ${border} ${className}`}
          {...rest}
        />

        <FieldError id={errorId} message={error} />
      </div>
    );
  },
);

export default TextareaField;
