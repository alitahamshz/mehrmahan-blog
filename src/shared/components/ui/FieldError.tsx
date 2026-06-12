import Image from "next/image";

type FieldErrorProps = {
  id?: string;
  message?: string;
};

export default function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null;

  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 flex items-center justify-start gap-1 text-right text-xs font-bold text-error"
    >
      <WarningIcon className="h-3.5 w-3.5 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
   <Image alt="err" width={16} height={16} src={'/icons/error.svg'}></Image>
  );
}
