import Image from "next/image";

type FormAlertProps = {
  messages: string[];
};

/** باکس خطای عمومی بالای فرم (مثلاً non_field_errors) */
export default function FormAlert({ messages }: FormAlertProps) {
  if (!messages.length) return null;

  return (
    <div
      role="alert"
      className="mb-4 flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-right text-sm font-bold text-error"
      dir="rtl"
    >
      <WarningIcon className="mt-0.5 h-4 w-4 shrink-0" />
      <ul className="flex-1 space-y-1">
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
   <Image alt="err" width={24} height={24} src={'/icons/error.svg'}></Image>
  );
}
