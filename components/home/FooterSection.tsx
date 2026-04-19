import Image from "next/image";

export function FooterSection() {
  return (
    <footer className="w-full px-6 pb-12 pt-8">
      <div className="mx-auto max-w-[92%]">
        <div className="mb-10 h-px w-full bg-foreground/20" />
        <div className="flex justify-center">
          <Image
            src="/images/m3.png"
            alt="Logo"
            width={70}
            height={70}
            className=""
          />
        </div>
      </div>
    </footer>
  );
}
