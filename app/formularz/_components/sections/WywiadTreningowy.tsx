"use client";

import { cn } from "@/lib/utils";
import { useFormularzStore } from "@/lib/stores/formularz-store";

const JEDNOSTKI_OPTIONS = ["x2", "x3", "x4", "x5", "więcej niż 5"];

function SelectGrid({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-5">
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
              "flex items-center gap-4 cursor-pointer group transition-colors",
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
            <span>{option}</span>
          </div>
        );
      })}
    </div>
  );
}

function Step1() {
  const treningowy = useFormularzStore((s) => s.formData.treningowy);
  const updateTreningowy = useFormularzStore((s) => s.updateTreningowy);

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Ile jednostek treningowych w tygodniu planujesz
        </h3>

        <SelectGrid
          options={JEDNOSTKI_OPTIONS}
          value={treningowy.jednostki}
          onChange={(val) => updateTreningowy({ jednostki: val })}
        />
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Inne aktywności fizyczne
        </h3>

        <div className="flex flex-col gap-4 text-foreground text-sm leading-relaxed">
          <p>
            Czy oprócz zaplanowanego przeze mnie treningu, chcesz uprawiać inne
            rodzaje aktywności fizycznej, takie jak np. spacery, sporty
            zespołowe, sporty walki, itp?
          </p>
          <p>
            Zaznacz jakie to aktywności i ile razy w ciągu tygodnia planujesz je
            wykonać. To ważne by nie doprowadzić do przeciążenia aktywnością
            fizyczna w skali tygodnia i miesiąca.
          </p>
        </div>

        <textarea
          value={treningowy.aktywnosci}
          onChange={(e) => updateTreningowy({ aktywnosci: e.target.value })}
          rows={5}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Dostępny sprzęt na treningu
        </h3>
        <p className="text-foreground text-sm leading-relaxed">
          (możesz wymienić jaki sprzęt masz na siłowni lub podać link do strony
          twojej siłowni)
        </p>

        <textarea
          value={treningowy.sprzet}
          onChange={(e) => updateTreningowy({ sprzet: e.target.value })}
          rows={5}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>
    </div>
  );
}

function Step2() {
  const treningowy = useFormularzStore((s) => s.formData.treningowy);
  const updateTreningowy = useFormularzStore((s) => s.updateTreningowy);

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Twój dotychczasowy plan treningowy
        </h3>
        <p className="text-foreground text-sm leading-relaxed">
          Opisz, jak wygląda dotychczasowe doświadczenie z treningiem siłowym
        </p>
        <textarea
          value={treningowy.plan}
          onChange={(e) => updateTreningowy({ plan: e.target.value })}
          rows={5}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Twój poziom zaawansowania treningowego
        </h3>
        <p className="text-foreground text-sm leading-relaxed">
          Oceń w skali od 1 do 10, swój poziom zaawansowania odnośnie treningu
          siłowego
        </p>
        <textarea
          value={treningowy.poziom}
          onChange={(e) => updateTreningowy({ poziom: e.target.value })}
          rows={5}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Twoje ulubione ćwiczenia
        </h3>
        <p className="text-foreground text-sm leading-relaxed">
          Wymień kjakie ćwiczenia są najbardziej lubiane i chętnie je widzisz
          w swoim planie treningowym
        </p>
        <textarea
          value={treningowy.ulubione}
          onChange={(e) => updateTreningowy({ ulubione: e.target.value })}
          rows={5}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Twoje najmniej lubiane ćwiczenia
        </h3>
        <p className="text-foreground text-sm leading-relaxed">
          Wymień kjakie ćwiczenia sprawiają Ci najwięcej trudności i chcesz je
          ograniczyć w planie treningowym
        </p>
        <textarea
          value={treningowy.nielubiane}
          onChange={(e) => updateTreningowy({ nielubiane: e.target.value })}
          rows={5}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>
    </div>
  );
}

const STEPS = [Step1, Step2] as const;

interface WywiadTreningowyProps {
  stepInSection: number;
}

export function WywiadTreningowy({ stepInSection }: WywiadTreningowyProps) {
  const StepComponent = STEPS[stepInSection];

  return (
    <div>
      <StepComponent />
    </div>
  );
}
