import { HeroSection } from "@/components/home/HeroSection";
import { MethodSection } from "@/components/home/MethodSection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { ClientDataSection } from "@/components/home/ClientDataSection";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import { ContactFormSection } from "@/components/home/ContactFormSection";
import { FooterSection } from "@/components/home/FooterSection";
import { HomeDotNavMount } from "@/components/home/HomeDotNavMount";

export default function Home() {
  return (
    <>
      <main className="pb-14 xl:pb-0">
        <HeroSection />
        <MethodSection />
        <ProgramsSection />
        <ClientDataSection />
        <MarqueeSection />
        <ContactFormSection />
        <FooterSection />
      </main>
      <HomeDotNavMount />
    </>
  );
}
