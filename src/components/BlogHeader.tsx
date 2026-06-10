import Image from "next/image";

export default function BlogHeader() {
  return (
    <header className="mx-auto mb-6 flex max-w-7xl items-center justify-start px-0">
      <nav
        aria-label="مسیر"
        className="flex items-center gap-3 text-sm font-semibold text-text-secondary"
      >
        <span className="flex h-5 w-5 items-center justify-center text-primary">
        <Image src={'/icons/home.svg'} width={20} height={20} alt="Home" />
          
        </span>
        <span>خانه</span>
        <span className="text-text-secondary/50">
        <Image src={'/icons/arrow-left.svg'} width={12} height={12} alt="Home" />
        </span>
        <span aria-current="page">مجله</span>

      </nav>
    </header>
  );
}
