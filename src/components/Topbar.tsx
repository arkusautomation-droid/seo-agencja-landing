import Image from "next/image";

export default function Topbar() {
  return (
    <div className="container">
      <div className="flex items-center justify-between py-5 border-b border-border">
        <Image
          src="/logo-adawards.svg"
          alt="AD Awards"
          width={115}
          height={50}
          className="brightness-0 invert"
          priority
        />
        <div className="text-xs text-text-muted">
          Oferta SEO &middot; Aktualizacja: 02.2026
        </div>
      </div>
    </div>
  );
}
