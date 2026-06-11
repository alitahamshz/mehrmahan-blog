import Image from "next/image";

type FormSuccessProps = {
  message: string;
  show: boolean;
};

export default function FormSuccess({ message, show }: FormSuccessProps) {
  if (!show) return null;

  return (
    <div
      role="status"
      className="mb-4 flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-right text-sm font-bold text-green-700"
      dir="rtl"
    >
      <CheckIcon className="h-4 w-4 shrink-0" />
      <span className="flex-1">{message}</span>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <Image width={24} height={24} src={'/icons/success.svg'} alt="Success" />
  );
}
