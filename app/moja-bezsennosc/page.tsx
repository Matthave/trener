import type { Metadata } from "next";
import Link from "next/link";

import { SlideIn } from "@/components/animations/SlideIn";
import { cn } from "@/lib/utils";

import { InsomniaDotNavMount } from "./_components/InsomniaDotNavMount";
import { SolutionPathSection } from "./_components/SolutionPathSection";
import { INSOMNIA_DOT_NAV_SECTIONS } from "./_data/nav-sections";
import { insomniaStory, type StoryBlock } from "./_data/story-content";

export const metadata: Metadata = {
  title: "Moja bezsenność | Trener Personalny",
  description:
    "Osobista historia o bezsenności, lęku, przeciążeniu i powrocie do regenerującego snu.",
};

function TextSection({
  block,
}: {
  block: Extract<StoryBlock, { type: "text" }>;
}) {
  return (
    <div className="mx-auto flex max-w-[860px] flex-col gap-5 font-body text-[15px] leading-[26px] text-foreground sm:gap-7 sm:text-[16px] sm:leading-[28px]">
      {block.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

function StoryTile({
  block,
  id,
  tileIndex,
}: {
  block: Extract<StoryBlock, { type: "tile" }>;
  id: string;
  tileIndex: number;
}) {
  const isRightAligned = tileIndex % 2 === 0;
  const direction = isRightAligned ? "right" : "left";

  return (
    <div
      id={id}
      className={cn(
        "my-5 flex w-full scroll-mt-6 sm:my-[30px]",
        isRightAligned ? "justify-end" : "justify-start",
      )}
    >
      <SlideIn direction={direction} className="w-full max-w-[940px]">
        <aside
          className={cn(
            "rounded-[4px] border border-foreground/20 bg-background/95  px-6 py-7 shadow-[0_0_0_1px_rgba(198,198,198,0.04)] backdrop-blur-[2px] bg-opacity-50 sm:px-10 sm:py-8",
            isRightAligned ? "text-right" : "text-left",
          )}
        >
          <h2 className="font-heading text-[20px] leading-[1.2] font-normal text-foreground sm:text-[26px] md:text-[32px] lg:text-[36px]">
            {block.title}
          </h2>
          <div
            className={cn(
              "mt-2 h-px w-full max-w-[200px] bg-accent sm:mt-3 sm:max-w-[300px] lg:max-w-[420px]",
              isRightAligned ? "ml-auto" : "mr-auto",
            )}
          />
          <div className="mt-5 flex flex-col gap-4 font-heading text-[14px] leading-[22px] text-foreground sm:mt-7 sm:gap-5 sm:text-[16px] sm:leading-[25px]">
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </aside>
      </SlideIn>
    </div>
  );
}

export default function MojaBezsennoscPage() {
  return (
    <>
      <Link
        href="/"
        className="fixed top-6 left-6 z-30 border border-foreground/60 px-5 py-2 font-heading text-[10px] uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-accent hover:text-accent sm:top-8 sm:left-8 sm:px-6 sm:py-3 sm:text-xs"
      >
        Powrót
      </Link>

      <main className="overflow-hidden px-6 py-20 sm:px-10 lg:px-16 xl:px-24 xl:py-28">
        <article className="mx-auto max-w-[1180px]">
          <header
            id={INSOMNIA_DOT_NAV_SECTIONS[0].id}
            className="mx-auto mb-10 max-w-[860px] scroll-mt-6 sm:mb-16"
          >
            <p className="mb-5 font-heading text-[10px] uppercase tracking-[0.25em] text-accent sm:text-xs">
              Historia snu
            </p>
            <h1 className="font-heading text-[26px] leading-[1.1] font-normal uppercase text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              {insomniaStory.title}
            </h1>
            <p className="mt-5 max-w-[680px] font-body text-[15px] leading-[26px] text-foreground/80 sm:mt-6 sm:text-[16px] sm:leading-[28px]">
              {insomniaStory.lead}
            </p>
          </header>

          <div className="flex flex-col gap-5 sm:gap-7">
            {insomniaStory.blocks.map((block, index) => {
              if (block.type === "text") {
                return <TextSection key={`text-${index}`} block={block} />;
              }

              const currentTileIndex = insomniaStory.blocks
                .slice(0, index)
                .filter((storyBlock) => storyBlock.type === "tile").length;
              const navSection =
                INSOMNIA_DOT_NAV_SECTIONS[currentTileIndex + 1];

              return (
                <StoryTile
                  key={`tile-${block.title}`}
                  block={block}
                  id={navSection.id}
                  tileIndex={currentTileIndex}
                />
              );
            })}
          </div>
        </article>

        <SolutionPathSection />
      </main>
      <InsomniaDotNavMount />
    </>
  );
}
