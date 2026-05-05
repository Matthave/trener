"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

import { cn } from "@/lib/utils";

const WHY_TILES = [
  {
    title: "",
    text: "Zidentyfikowanie jednej, pierwotnej przyczyny bezsenności jest niezwykle trudne, ponieważ w tym przypadku nie istnieje pojedynczy parametr, który moglibyśmy zmierzyć tak precyzyjnie jak poziom ferrytyny czy glukozy w badaniu krwi. Brak zero-jedynkowego testu diagnostycznego sprawia, że żadna diagnoza nie daje stuprocentowej pewności, a próby wskazania jednego „winnego” zazwyczaj nie oddają skomplikowanej natury problemu. W rzeczywistości zaburzenia snu to najczęściej wypadkowa wielu nakładających się na siebie warstw, od biologicznego przeciążenia organizmu, przez schematy w których tkwimy, aż po chroniczne zaniedbywanie regeneracji. To właśnie ta unikalna mozaika przyczyn sprawia, że droga do odzyskania nocy wymaga holistycznego spojrzenia na cały styl życia, a nie szukania jednej, magicznej tabletki.",
  },
  {
    title: "Ambicje - Overtraining Syndrome",
    text: "Przez wiele miesięcy, być może nawet lat, stawiałem sobie zbyt ambitne cele treningowe. Jednak najgorszym błędem było coś co długi czas postrzegałem jako ogromny plus - nie dopuszczałem do siebie myśli o zrezygnowaniu z treningu. Nieważne co się działo - choroba, gorszy dzień, słaby sen, za mało kalorii, brak czasu, brak regeneracji, zbyt zbity tydzień treningowych - trening musiał się odbyć. Przez wiele lat zmagałem się z 'bólami obciążeniowymi pleców' ignorując ten sygnał z ciałą, który z każdym rokiem narastał, doprowadzając do tego, że w trakcie treningu musiałem rozmasowywać mięśnie piłeczką, by nie doszło do spięcia mięśni, które wykluczy mnie z treningu na kilka dni. Uważam to za czynniki, które wpędziły mnie w OTS.",
  },
  {
    title: "Stres",
    text: "Błędna definicja stresu oraz nieumiejętnośc rozpoznania stresu, a co za tym idzie, również nieumiejętność radzenia sobie z nim. Nagromadzenie codziennych napięć i ciągłe przebywanie w stanie wysokiej czujności sprawiło, że mój umysł utracił naturalną zdolność do wygaszania aktywności po zmroku. Przewlekły stres to stan, w którym organizm traci naturalną zdolność do autoregeneracji, co nieuchronnie prowadzi do emocjonalnego wypalenia i trwałego obniżenia progu tolerancji na codzienne trudności.",
  },
  {
    title: "Perfekcjonizm",
    text: "Długo uważałem, że mój perfekcjonizm to zaleta, podczas gdy w rzeczywistości był on głównym paliwem dla moich lęków. Chęć robienia wszystkiego idealnie - od pracy po proces naprawy snu - generowała presję, której żaden układ nerwowy nie jest w stanie wytrzymać. Przełomem było zaakceptowanie zasady „wystarczająco dobrze”. Odpuszczenie nierealnych standardów i zgoda na własną niedoskonałość zdjęły ze mnie ciężar, który nie pozwalał mi zasnąć. Dziś wiem, że elastyczność jest znacznie skuteczniejszą strategią przetrwania niż sztywna, perfekcyjna kontrola, która ostatecznie zawsze prowadzi do pęknięć.",
  },
  {
    title: "Brak odpoczynku",
    text: " Zrozumiałem, że systematyczne pomijanie czasu dla siebie i rezygnacja z dłuższego urlopu doprowadziły do całkowitego wyczerpania moich zasobów adaptacyjnych, szczególnie mająs na uwadzę zbyt ambitne treningi oraz błędną definicje stresu z połączeniem perfekcjonizmu. Życie w trybie ciągłej dostępności, bez wyraźnego oddzielenia czasu pracy od regeneracji, sprawiło, że mój organizm zapomniał, jak przełączać się w stan spoczynku. Brak „chwil dla siebie” nie był jedynie brakiem rozrywki, ale realnym deficytem paliwa niezbędnego do prawidłowego funkcjonowania układu nerwowego.",
  },
];

export function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.05 });
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="why-section"
      ref={sectionRef}
      className="relative mx-auto max-w-[1180px] scroll-mt-6 overflow-hidden pt-20  sm:pt-28 xl:overflow-visible "
    >
      <header className="relative z-11 mb-12 xl:mb-20">
        <p className="font-heading text-[32px] leading-[1.1] text-foreground xl:text-[96px]">
          To w końcu
        </p>
        <p className="font-heading text-[32px] leading-[1.1] ml-5 sm:ml-10 uppercase text-foreground xl:text-[128px]">
          DLACZEGO?
        </p>
      </header>

      <div className="xl:flex xl:items-start xl:gap-16">
        {/* ── BEZSENNOŚĆ vertical text — desktop only ── */}
        <div className="hidden xl:flex xl:flex-1 xl:items-center xl:justify-center xl:self-stretch">
          <p
            className="select-none font-heading text-[200px] leading-none tracking-[0.05em] uppercase text-foreground"
            style={{ writingMode: "vertical-rl" }}
          >
            BEZSENNOŚĆ
          </p>
        </div>

        {/* ── Tiles column with connecting line ── */}
        <div className="relative xl:w-[55%] xl:flex-shrink-0">
          {/* Vertical connecting line */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute top-[-50px] z-10 w-[2px]",
              "left-1/2 -translate-x-1/2",
              "xl:right-auto xl:left-[0px] xl:translate-x-0",
            )}
            style={{
              height: "calc(100% + 200px)",
              background: "#111",
              backgroundImage:
                "linear-gradient(180deg,rgba(17,17,17,1) 0%,rgba(159,198,255,0.5) 50%,rgba(17,17,17,1) 100%)",
            }}
          />

          <div className="relative z-10 xl:mt-24 flex flex-col gap-16 xl:gap-20">
            {WHY_TILES.map((tile) => (
              <motion.div
                key={tile.title}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.5,
                  delay: reducedMotion ? 0 : 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="relative"
              >
                <div className="border border-accent/[0.5] rounded-[5px] bg-background px-6 py-6 sm:px-8 sm:py-7 xl:rounded-l-[0px]">
                  <h3 className="font-heading text-[24px] leading-[1.2] text-foreground xl:text-[32px]">
                    {tile.title}
                  </h3>
                  <p className="mt-4 font-body text-[13px] leading-[21px] text-foreground sm:text-[14px] sm:leading-[23px] xl:text-[15px] xl:leading-[25px]">
                    {tile.text}
                  </p>
                </div>

                {/* Dot — mobile: bottom-center 16×16, desktop: left-center 45×45 */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute z-20 rounded-full bg-accent",
                    "-bottom-2 left-1/2 h-4 w-4 -translate-x-1/2",
                    "xl:bottom-auto xl:top-1/2 xl:right-auto xl:left-0 xl:h-[35px] xl:w-[35px] xl:-translate-y-1/2 xl:-translate-x-1/2",
                  )}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Fixed sonar orb ── */}
      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            aria-hidden="true"
            className={cn(
              "pointer-events-none fixed z-30",
              "bottom-[-200px] left-1/2 -translate-x-1/2",
              "xl:bottom-auto xl:right-auto xl:left-[-300px] xl:top-1/2 xl:-translate-y-1/2 xl:translate-x-0",
            )}
          >
            {/* Orb + sonar waves */}
            <div className="relative flex items-center justify-center">
              {/* Outer wave */}
              <motion.div
                className="absolute inset-[-60px] rounded-full bg-accent/[0.04] xl:inset-[-220px]"
                animate={
                  reducedMotion
                    ? undefined
                    : { scale: [1, 1.04, 1], opacity: [1, 0.6, 1] }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Inner wave */}
              <motion.div
                className="absolute inset-[-25px] rounded-full bg-accent/[0.08] xl:inset-[-120px]"
                animate={
                  reducedMotion
                    ? undefined
                    : { scale: [1, 1.03, 1], opacity: [1, 0.7, 1] }
                }
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
              />
              {/* Main orb */}
              <div
                className="h-[245px] w-[245px] rounded-full xl:h-[650px] xl:w-[650px]"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, rgba(159,198,255,0.4), rgba(159,198,255,0.15) 70%)",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
