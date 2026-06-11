'use client';

import FieldError from './FieldError';
import CustomSelect, { type CustomSelectOption } from './CustomSelect';

export type SelectOption = {
  value: string | number;
  label: string;
};

export type SelectFieldProps = {
  label: string;
  error?: string;
  options: SelectOption[];
  /** متن placeholder وقتی چیزی انتخاب نشده */
  placeholder?: string;
  /** اگر بدهید، یک گزینه‌ی «خالی» (مقدار "") در بالای لیست اضافه می‌شود */
  emptyLabel?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  id?: string;
  name?: string;
  wrapperClassName?: string;
};

/**
 * فیلد select برای فرم‌ها. به‌جای <select> native از CustomSelect استفاده می‌کند
 * تا فونت و استایلِ آیتم‌های باز شده هم درست اعمال شود.
 * با react-hook-form از طریق <Controller> استفاده کنید.
 */
export default function SelectField({
  label,
  error,
  options,
  placeholder = 'انتخاب کنید',
  emptyLabel,
  value,
  onChange,
  id,
  name,
  wrapperClassName = '',
}: SelectFieldProps) {
  const fieldId = id ?? name;
  const errorId = error ? `${fieldId}-error` : undefined;

  const mapped: CustomSelectOption[] = options.map((o) => ({
    value: String(o.value),
    label: o.label,
  }));

  return (
    <div className={`mb-4 ${wrapperClassName}`}>
      <label
        htmlFor={fieldId}
        className="mb-2 block text-right text-sm font-bold text-text-default"
      >
        {label}
      </label>

      <CustomSelect
        id={fieldId}
        options={mapped}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        emptyLabel={emptyLabel}
        hasError={!!error}
        ariaLabel={label}
      />

      <FieldError id={errorId} message={error} />
    </div>
  );
}
