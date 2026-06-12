"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

export type CustomSelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: CustomSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  emptyLabel?: string;
  ariaLabel?: string;
  hasError?: boolean;
  className?: string;
  id?: string;
  bgWhite? : boolean;
};

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "انتخاب کنید",
  emptyLabel,
  ariaLabel,
  hasError = false,
  className = "",
  id,
  bgWhite = false
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value);
  const displayLabel = selected ? selected.label : placeholder;

  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const border = hasError
    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
    : "border-neutral-gray-border focus:border-primary focus:ring-primary/20";

  const select = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        id={id}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={hasError}
        onClick={() => setOpen((o) => !o)}
        className={`flex h-10 w-full items-center justify-between rounded-lg border ${bgWhite ? 'bg-transparent' : "bg-white" } pl-9 pr-4 text-sm outline-none focus:ring-2 ${
          selected ? "text-text-default" : "text-text-secondary/60"
        } ${border}`}
      >
        <span className="truncate">{displayLabel}</span>
      </button>

      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
        <Image
          height={20}
          width={20}
          src={"/icons/chev-down.svg"}
          alt="dropdown"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </span>

      {open && (
        <ul
          role="listbox"
          id={listId}
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-neutral-gray-border bg-white py-1 shadow-lg"
        >
          {emptyLabel !== undefined && (
            <li role="option" aria-selected={value === ""}>
              <button
                type="button"
                onClick={() => select("")}
                className={`block w-full px-4 py-2 text-right text-sm transition hover:bg-neutral-gray ${
                  value === "" ? "font-bold text-primary" : "text-text-default"
                }`}
              >
                {emptyLabel}
              </button>
            </li>
          )}

          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li key={opt.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => select(opt.value)}
                  className={`block w-full px-4 py-2 text-right text-sm transition hover:bg-neutral-gray ${
                    isSelected ? "font-bold text-primary" : "text-text-default"
                  }`}
                >
                  {opt.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
