'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  /** اگر مقدار داشته باشد به‌عنوان کنترل بیرونی استفاده می‌شود (controlled) */
  open: boolean;
  /** زمانی که مودال باید بسته شود (کلیک روی بک‌دراپ، دکمه‌ی بستن، Esc) */
  onClose: () => void;
  children: ReactNode;
  /** برچسب عنوان برای دسترسی‌پذیری (aria-labelledby) */
  labelledBy?: string;
  /** کلاس اضافه برای پنل داخلی */
  panelClassName?: string;
};

export default function Modal({
  open,
  onClose,
  children,
  labelledBy = 'modal-title',
  panelClassName = '',
}: ModalProps) {
  // mounted: آیا در DOM رندر شود (برای انیمیشن خروج تأخیر می‌دهیم)
  const [mounted, setMounted] = useState(false);
  // visible: وضعیت ظاهری برای انیمیشن (fade/scale)
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // در دو فریم بعد، حالت visible را فعال می‌کنیم تا ترنزیشن اجرا شود
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true)),
      );
      return () => cancelAnimationFrame(raf);
    }

    // بستن: ابتدا انیمیشن خروج، سپس unmount
    setVisible(false);
    const timer = setTimeout(() => setMounted(false), 200);
    return () => clearTimeout(timer);
  }, [open]);

  // بستن با کلید Esc + قفل اسکرول بدنه هنگام باز بودن
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className={`fixed inset-0 z-9999 flex items-center justify-center p-4 transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{ backgroundColor: visible ? 'rgba(0,0,0,0.65)' : 'rgba(0,0,0,0)' }}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-180 rounded-2xl bg-bg p-8 transition-all duration-200 ${
          visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } ${panelClassName}`}
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
