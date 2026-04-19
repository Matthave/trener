"use client";

import { cn } from "@/lib/utils";
import { useFormularzStore } from "@/lib/stores/formularz-store";

function SingleSelect({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-12 sm:gap-20">
      {options.map((option) => {
        const isSelected = value === option;
        return (
          <div
            key={option}
            role="radio"
            aria-checked={isSelected}
            tabIndex={0}
            onClick={() => onChange(option)}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                onChange(option);
              }
            }}
            className={cn(
              "flex items-center gap-3 cursor-pointer group transition-colors",
              isSelected
                ? "text-accent"
                : "text-foreground hover:text-foreground",
            )}
          >
            <span
              className={cn(
                "w-5 h-5 border-2 flex items-center justify-center shrink-0 transition-colors",
                isSelected
                  ? "border-accent bg-accent"
                  : "border-foreground/80 group-hover:border-accent/100",
              )}
            >
              {isSelected && (
                <svg
                  viewBox="0 0 12 12"
                  className="w-3 h-3 text-background"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 6l3 3 5-5" />
                </svg>
              )}
            </span>
            <span className="text-sm uppercase tracking-widest">{option}</span>
          </div>
        );
      })}
    </div>
  );
}

function Checkbox({
  label,
  isChecked,
  onToggle,
}: {
  label: string;
  isChecked: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      role="checkbox"
      aria-checked={isChecked}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onToggle();
        }
      }}
      className={cn(
        "flex items-center gap-4 cursor-pointer group transition-colors",
        isChecked ? "text-accent" : "text-foreground hover:text-foreground",
      )}
    >
      <span
        className={cn(
          "w-5 h-5 border-2 flex items-center justify-center shrink-0 transition-colors",
          isChecked
            ? "border-accent bg-accent"
            : "border-foreground/80 group-hover:border-accent/100",
        )}
      >
        {isChecked && (
          <svg
            viewBox="0 0 12 12"
            className="w-3 h-3 text-background"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M2 6l3 3 5-5" />
          </svg>
        )}
      </span>
      <span>{label}</span>
    </div>
  );
}

function CheckboxGroup({
  options,
  selected,
  onToggle,
  hasOther,
  otherValue,
  onOtherChange,
}: {
  options: string[];
  selected: Set<string>;
  onToggle: (option: string) => void;
  hasOther?: boolean;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {options.map((option) => (
        <Checkbox
          key={option}
          label={option}
          isChecked={selected.has(option)}
          onToggle={() => onToggle(option)}
        />
      ))}

      {hasOther && (
        <div className="mt-2">
          <span className="text-foreground text-md">Inne (wymień poniżej)</span>
          <input
            type="text"
            value={otherValue ?? ""}
            onChange={(e) => onOtherChange?.(e.target.value)}
            className="w-full bg-transparent border-b border-foreground/60 py-2 text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors mt-1"
          />
        </div>
      )}
    </div>
  );
}

function CheckboxGrid({
  options,
  selected,
  onToggle,
  hasOther,
  otherValue,
  onOtherChange,
}: {
  options: string[];
  selected: Set<string>;
  onToggle: (option: string) => void;
  hasOther?: boolean;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-5">
        {options.map((option) => (
          <Checkbox
            key={option}
            label={option}
            isChecked={selected.has(option)}
            onToggle={() => onToggle(option)}
          />
        ))}
      </div>

      {hasOther && (
        <div className="mt-2">
          <span className="text-foreground text-md">Inne (wymień poniżej)</span>
          <input
            type="text"
            value={otherValue ?? ""}
            onChange={(e) => onOtherChange?.(e.target.value)}
            className="w-full bg-transparent border-b border-foreground/60 py-2 text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors mt-1"
          />
        </div>
      )}
    </div>
  );
}

const CELE_OPTIONS = [
  "Redukcja masy ciała",
  "Kształtowanie sylwetki - poprawa proporcji",
  "Zwiększanie masy mięśniowej",
  "Zmniejszenie poziomu tkanki tłuszczowej - nadanie sylwetce wyrazistości",
  "Wzrost siły",
  "Poprawa kondycji zdrowotnej",
];

function Step1() {
  const zywienie = useFormularzStore((s) => s.formData.zywienie);
  const updateZywienie = useFormularzStore((s) => s.updateZywienie);

  const cele = new Set(zywienie.cele);

  const toggleCel = (option: string) => {
    const newCele = new Set(zywienie.cele);
    if (newCele.has(option)) newCele.delete(option);
    else newCele.add(option);
    updateZywienie({ cele: Array.from(newCele) });
  };

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Jaki rodzaj działań żywieniowych preferujesz?
        </h3>

        <div className="flex flex-col gap-4 text-foreground text-sm leading-relaxed">
          <p>
            Czy wolisz podejście bardziej intensywne, czy raczej spokojniejsze i
            bardziej zrównoważone? To, którą opcję wybierzesz, ma duże znaczenie
            – szczególnie w przypadku działań redukcyjnych.
          </p>
          <p>
            Większy deficyt kaloryczny może przynieść szybsze efekty, ale może
            też wiązać się z pewnym &bdquo;kosztem&rdquo;, takim jak na przykład
            większy dyskomfort czy uczucie głodu. Jest to również nieco mniej
            korzystne dla zdrowia podejście.
          </p>
          <p>
            Z kolei łagodny deficyt oznacza działanie wolniejsze, spokojniejsze
            i mniej radykalne, ale jednocześnie uznawane za zdrowsze.
          </p>
        </div>

        <div className="py-4">
          <SingleSelect
            options={["Agresywnie", "Delikatnie"]}
            value={zywienie.podejscie}
            onChange={(val) => updateZywienie({ podejscie: val })}
          />
        </div>

        <p className="text-foreground text-sm leading-relaxed">
          Pamiętaj, że jeśli ocenię iż Twój stan zdrowia daje przesłanki do
          zastosowania działań stonowanych (mniej radykalnych), to wtedy
          właściwie argumentując powiem czemu.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Zaznacz cele, które Cię interesują
        </h3>

        <CheckboxGroup
          options={CELE_OPTIONS}
          selected={cele}
          onToggle={toggleCel}
          hasOther
          otherValue={zywienie.celeInne}
          onOtherChange={(val) => updateZywienie({ celeInne: val })}
        />
      </div>
    </div>
  );
}

const BIALKO_OPTIONS = [
  "Kurczak",
  "Białe ryby",
  "Twaróg",
  "Indyk",
  "Makrela",
  "Soczewica",
  "Wołowina",
  "Wieprzowina",
  "Soja",
  "Łosoś",
  "Jaja",
  "Tofu",
  "Tuńczyk z wody",
  "Skyr",
  "Odżywka białkowa",
];

const WEGLOWODANY_OPTIONS = [
  "Ryż",
  "Ziemniaki",
  "Makarony",
  "Płatki owsiane",
  "Bataty",
  "Tapioka",
  "Kasze",
  "Pieczywo żytnie",
  "Owoce",
];

function Step2() {
  const zywienie = useFormularzStore((s) => s.formData.zywienie);
  const updateZywienie = useFormularzStore((s) => s.updateZywienie);

  const bialko = new Set(zywienie.bialko);
  const weglowodany = new Set(zywienie.weglowodany);

  const toggleBialko = (option: string) => {
    const newSet = new Set(zywienie.bialko);
    if (newSet.has(option)) newSet.delete(option);
    else newSet.add(option);
    updateZywienie({ bialko: Array.from(newSet) });
  };

  const toggleWeglowodany = (option: string) => {
    const newSet = new Set(zywienie.weglowodany);
    if (newSet.has(option)) newSet.delete(option);
    else newSet.add(option);
    updateZywienie({ weglowodany: Array.from(newSet) });
  };

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-4 text-foreground text-sm leading-relaxed">
        <p>
          Szczegółowy wywiad żywieniowy stanowi podstawę skutecznie dobranej
          diety. Zanim ją przygotuję, chciałbym poznać Twoje upodobania
          żywieniowe oraz dowiedzieć się, które produkty Ci odpowiadają, a
          których nie tolerujesz &ndash; na przykład z powodu alergii
          pokarmowych albo zwyczajnie dlatego, że Ci nie smakują.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Określ preferowane źródła białka
        </h3>

        <CheckboxGrid
          options={BIALKO_OPTIONS}
          selected={bialko}
          onToggle={toggleBialko}
          hasOther
          otherValue={zywienie.bialkoInne}
          onOtherChange={(val) => updateZywienie({ bialkoInne: val })}
        />
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Określ preferowane źródła węglowodanów
        </h3>

        <CheckboxGrid
          options={WEGLOWODANY_OPTIONS}
          selected={weglowodany}
          onToggle={toggleWeglowodany}
          hasOther
          otherValue={zywienie.weglowodanyInne}
          onOtherChange={(val) => updateZywienie({ weglowodanyInne: val })}
        />
      </div>
    </div>
  );
}

const TLUSZCZE_OPTIONS = [
  "Oliwa z oliwek",
  "Orzechy laskowe",
  "Masło orzechowe",
  "Olej kokosowy",
  "Pestki dyni",
  "Awokado",
  "Orzechy włoskie",
  "Pestki słonecznika",
  "Oliwki",
  "Orzechy nerkowca",
  "Gorzka czekolada",
  "Masło klarowane",
  "Orzechy brazylijskie",
  "Żółtka jaj",
  "Mleko kokosowe",
];

function Step3() {
  const zywienie = useFormularzStore((s) => s.formData.zywienie);
  const updateZywienie = useFormularzStore((s) => s.updateZywienie);

  const tluszcze = new Set(zywienie.tluszcze);

  const toggleTluszcze = (option: string) => {
    const newSet = new Set(zywienie.tluszcze);
    if (newSet.has(option)) newSet.delete(option);
    else newSet.add(option);
    updateZywienie({ tluszcze: Array.from(newSet) });
  };

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Określ preferowane źródła tłuszczy
        </h3>

        <CheckboxGrid
          options={TLUSZCZE_OPTIONS}
          selected={tluszcze}
          onToggle={toggleTluszcze}
          hasOther
          otherValue={zywienie.tluszczeInne}
          onOtherChange={(val) => updateZywienie({ tluszczeInne: val })}
        />
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Twoje preferencje żywieniowe
        </h3>

        <p className="text-foreground text-sm leading-relaxed">
          Opisz, jakie produkty lubisz najbardziej. Uwzględnię je w diecie, o
          ile uznam, że są zgodne z zasadami racjonalnego odżywiania i nie mają
          negatywnego wpływu na zdrowie.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Twoje ulubione produkty
        </h3>
        <input
          type="text"
          value={zywienie.ulubione}
          onChange={(e) => updateZywienie({ ulubione: e.target.value })}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Twoje nielubiane produkty
        </h3>
        <input
          type="text"
          value={zywienie.nielubiane}
          onChange={(e) => updateZywienie({ nielubiane: e.target.value })}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors"
        />
      </div>
    </div>
  );
}

function Step4() {
  const zywienie = useFormularzStore((s) => s.formData.zywienie);
  const updateZywienie = useFormularzStore((s) => s.updateZywienie);

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Jak obecnie wygląda Twoja obecna dieta?
        </h3>

        <p className="text-foreground text-sm leading-relaxed">
          Opisz, ile kalorii dziennie spożywasz oraz w jakim stopniu angażujesz
          się w planowanie posiłków. Jeśli obecnie nie stosujesz żadnej diety,
          napisz, co jadłeś lub jadłaś w ciągu ostatnich 2 dni.
        </p>

        <textarea
          value={zywienie.dieta}
          onChange={(e) => updateZywienie({ dieta: e.target.value })}
          rows={5}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Wydatek energetyczny w ciągu dnia (tryb pracy)
        </h3>

        <div className="flex flex-col gap-4 text-foreground text-sm leading-relaxed">
          <p>
            Prowadzisz siedzący tryb życia i pracujesz przy biurku, a może
            w ciągu dnia jesteś bardzo aktywny lub aktywna?
          </p>
          <p>
            Opisz, jak wygląda Twój typowy dzień, abym mógł obliczyć Twoje
            zapotrzebowanie kaloryczne.
          </p>
        </div>

        <textarea
          value={zywienie.wydatek}
          onChange={(e) => updateZywienie({ wydatek: e.target.value })}
          rows={5}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>
    </div>
  );
}

const STEPS = [Step1, Step2, Step3, Step4] as const;

interface WywiadZywieniowyProps {
  stepInSection: number;
}

export function WywiadZywieniowy({ stepInSection }: WywiadZywieniowyProps) {
  const StepComponent = STEPS[stepInSection];

  return (
    <div>
      <StepComponent />
    </div>
  );
}
