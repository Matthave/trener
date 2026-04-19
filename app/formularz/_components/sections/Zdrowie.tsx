"use client";

import { cn } from "@/lib/utils";
import { useFormularzStore } from "@/lib/stores/formularz-store";

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

function CheckboxGrid({
  options,
  selected,
  onToggle,
  hasOther,
  otherLabel,
  otherValue,
  onOtherChange,
}: {
  options: string[];
  selected: Set<string>;
  onToggle: (option: string) => void;
  hasOther?: boolean;
  otherLabel?: string;
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
          <span className="text-foreground text-md">
            {otherLabel ?? "Inne (wymień poniżej)"}
          </span>
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

function CheckboxWithInput({
  label,
  isChecked,
  onToggle,
  inputValue,
  onInputChange,
}: {
  label: string;
  isChecked: boolean;
  onToggle: () => void;
  inputValue?: string;
  onInputChange?: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Checkbox label={label} isChecked={isChecked} onToggle={onToggle} />
      {isChecked && onInputChange && (
        <input
          type="text"
          value={inputValue ?? ""}
          onChange={(e) => onInputChange(e.target.value)}
          className="w-full bg-transparent border-b border-foreground/60 py-2 text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors ml-9"
        />
      )}
    </div>
  );
}

const CUKROWA_OPTIONS = [
  "Insulinooporność",
  "Cukrzyca",
  "Spadki energii",
  "Hiperinsulinemia",
  "Hipoglikemia",
  "Senność w ciągu dnia",
];

const NIEDOBORY_OPTIONS = [
  "Ciągłe zmęczenie",
  "Problemy z zasypianiem",
  "Problemy z wstawaniem",
  "Zaburzenia koncentracji i pamięci",
];

const TARCZYCA_OPTIONS = [
  "Niedoczynność tarczycy",
  "Nadczynność tarczycy",
  "Choroba Hashimoto",
  "Choroba Gravesa-Basedowa",
];

function Step1() {
  const zdrowie = useFormularzStore((s) => s.formData.zdrowie);
  const updateZdrowie = useFormularzStore((s) => s.updateZdrowie);

  const cukrowa = new Set(zdrowie.cukrowa);
  const niedobory = new Set(zdrowie.niedobory);
  const tarczyca = new Set(zdrowie.tarczyca);

  const toggleCukrowa = (option: string) => {
    const newSet = new Set(zdrowie.cukrowa);
    if (newSet.has(option)) newSet.delete(option);
    else newSet.add(option);
    updateZdrowie({ cukrowa: Array.from(newSet) });
  };

  const toggleNiedobory = (option: string) => {
    const newSet = new Set(zdrowie.niedobory);
    if (newSet.has(option)) newSet.delete(option);
    else newSet.add(option);
    updateZdrowie({ niedobory: Array.from(newSet) });
  };

  const toggleTarczyca = (option: string) => {
    const newSet = new Set(zdrowie.tarczyca);
    if (newSet.has(option)) newSet.delete(option);
    else newSet.add(option);
    updateZdrowie({ tarczyca: Array.from(newSet) });
  };

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Problemy zdrowotne
        </h3>

        <p className="text-foreground text-sm leading-relaxed">
          Stan zdrowia oraz występujące zaburzenia mają istotny wpływ na plan
          żywieniowy. Sposób odżywiania bezpośrednio oddziałuje na nasze
          zdrowie, dlatego zaznacz, jeśli zmagasz się z konkretnymi problemami.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Gospodarka cukrowa/energia
        </h3>

        <CheckboxGrid
          options={CUKROWA_OPTIONS}
          selected={cukrowa}
          onToggle={toggleCukrowa}
          hasOther
          otherLabel="Inne - jakie?"
          otherValue={zdrowie.cukrowaInne}
          onOtherChange={(val) => updateZdrowie({ cukrowaInne: val })}
        />
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Możliwe niedobory/objawy
        </h3>

        <CheckboxGrid
          options={NIEDOBORY_OPTIONS}
          selected={niedobory}
          onToggle={toggleNiedobory}
          hasOther
          otherLabel="Inne - jakie?"
          otherValue={zdrowie.niedoboryInne}
          onOtherChange={(val) => updateZdrowie({ niedoboryInne: val })}
        />
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Choroby tarczycy
        </h3>

        <CheckboxGrid
          options={TARCZYCA_OPTIONS}
          selected={tarczyca}
          onToggle={toggleTarczyca}
          hasOther
          otherLabel="Inne - jakie?"
          otherValue={zdrowie.tarczycaInne}
          onOtherChange={(val) => updateZdrowie({ tarczycaInne: val })}
        />
      </div>
    </div>
  );
}

const POKARMOWY_OPTIONS = [
  "SIBO",
  "Refluks",
  "Choroba wrzodowa",
  "Syndrom jelita drażliwego",
  "Zgaga",
  "Celiakia",
];

const KONDYCJA_OPTIONS = [
  "Łuszczyca",
  "Atopowe zapalenie skóry",
  "Sucha skóra",
  "Trądzik",
  "Wypadanie włosów",
  "Łamliwe paznokcie",
];

const CYKL_OPTIONS = [
  "Brak miesiączki",
  "Obfite krwawienie",
  "Endometrioza",
  "Nieregularne miesiączki",
  "Silne bóle miesiączkowe",
  "PCOS",
];

function Step2() {
  const zdrowie = useFormularzStore((s) => s.formData.zdrowie);
  const updateZdrowie = useFormularzStore((s) => s.updateZdrowie);

  const pokarmowy = new Set(zdrowie.pokarmowy);
  const kondycja = new Set(zdrowie.kondycja);
  const cykl = new Set(zdrowie.cykl);

  const togglePokarmowy = (option: string) => {
    const newSet = new Set(zdrowie.pokarmowy);
    if (newSet.has(option)) newSet.delete(option);
    else newSet.add(option);
    updateZdrowie({ pokarmowy: Array.from(newSet) });
  };

  const toggleKondycja = (option: string) => {
    const newSet = new Set(zdrowie.kondycja);
    if (newSet.has(option)) newSet.delete(option);
    else newSet.add(option);
    updateZdrowie({ kondycja: Array.from(newSet) });
  };

  const toggleCykl = (option: string) => {
    const newSet = new Set(zdrowie.cykl);
    if (newSet.has(option)) newSet.delete(option);
    else newSet.add(option);
    updateZdrowie({ cykl: Array.from(newSet) });
  };

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Choroby układu pokarmowego
        </h3>

        <CheckboxGrid
          options={POKARMOWY_OPTIONS}
          selected={pokarmowy}
          onToggle={togglePokarmowy}
          hasOther
          otherLabel="Inne - jakie?"
          otherValue={zdrowie.pokarmonyInne}
          onOtherChange={(val) => updateZdrowie({ pokarmonyInne: val })}
        />
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Kondycja włosów, skóry i paznokci
        </h3>

        <CheckboxGrid
          options={KONDYCJA_OPTIONS}
          selected={kondycja}
          onToggle={toggleKondycja}
          hasOther
          otherLabel="Inne - jakie?"
          otherValue={zdrowie.kondycjaInne}
          onOtherChange={(val) => updateZdrowie({ kondycjaInne: val })}
        />
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Zaburzenia cyklu miesiączkowego
        </h3>

        <CheckboxGrid
          options={CYKL_OPTIONS}
          selected={cykl}
          onToggle={toggleCykl}
          hasOther
          otherLabel="Inne - jakie?"
          otherValue={zdrowie.cyklInne}
          onOtherChange={(val) => updateZdrowie({ cyklInne: val })}
        />
      </div>
    </div>
  );
}

const CIAZA_OPTIONS = [
  "Tak, jestem w ciąży",
  "Nie jestem w ciąży, ale karmię",
  "Choroba wrzodowa",
  "Tak, karmię piersią",
  "Nie jestem w ciąży ani nie karmię",
  "Planuję ciążę w najbliższym czasie",
];

function Step3() {
  const zdrowie = useFormularzStore((s) => s.formData.zdrowie);
  const updateZdrowie = useFormularzStore((s) => s.updateZdrowie);

  const ciaza = new Set(zdrowie.ciaza);

  const toggleCiaza = (option: string) => {
    const newSet = new Set(zdrowie.ciaza);
    if (newSet.has(option)) newSet.delete(option);
    else newSet.add(option);
    updateZdrowie({ ciaza: Array.from(newSet) });
  };

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Czy jesteś w ciąży lub karmisz piersią
        </h3>

        <CheckboxGrid
          options={CIAZA_OPTIONS}
          selected={ciaza}
          onToggle={toggleCiaza}
          hasOther
          otherLabel="Inne - jakie?"
          otherValue={zdrowie.ciazaInne}
          onOtherChange={(val) => updateZdrowie({ ciazaInne: val })}
        />
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Czy stosujesz jakieś leki
        </h3>

        <div className="flex flex-col gap-4">
          <Checkbox
            label="Nie"
            isChecked={zdrowie.lekiNie}
            onToggle={() => {
              updateZdrowie({
                lekiNie: !zdrowie.lekiNie,
                lekiTak: false,
                lekiValue: "",
              });
            }}
          />
          <CheckboxWithInput
            label="Tak - wymień jakie"
            isChecked={zdrowie.lekiTak}
            onToggle={() => {
              updateZdrowie({
                lekiTak: !zdrowie.lekiTak,
                lekiNie: false,
              });
            }}
            inputValue={zdrowie.lekiValue}
            onInputChange={(val) => updateZdrowie({ lekiValue: val })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Czy stosujesz jakieś suplementy
        </h3>

        <div className="flex flex-col gap-4">
          <Checkbox
            label="Nie"
            isChecked={zdrowie.suplementyNie}
            onToggle={() => {
              updateZdrowie({
                suplementyNie: !zdrowie.suplementyNie,
                suplementyTak: false,
                suplementyValue: "",
              });
            }}
          />
          <CheckboxWithInput
            label="Tak - wymień jakie"
            isChecked={zdrowie.suplementyTak}
            onToggle={() => {
              updateZdrowie({
                suplementyTak: !zdrowie.suplementyTak,
                suplementyNie: false,
              });
            }}
            inputValue={zdrowie.suplementyValue}
            onInputChange={(val) => updateZdrowie({ suplementyValue: val })}
          />
        </div>
      </div>
    </div>
  );
}

function Step4() {
  const zdrowie = useFormularzStore((s) => s.formData.zdrowie);
  const updateZdrowie = useFormularzStore((s) => s.updateZdrowie);

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Libido i popęd seksualny
        </h3>
        <p className="text-foreground text-sm leading-relaxed">
          (pozwoli relatywnie ocenić obciążenie układu nerwowego i działanie
          hormonów płciowych)
        </p>
        <input
          type="text"
          value={zdrowie.libido}
          onChange={(e) => updateZdrowie({ libido: e.target.value })}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Ilość spożywanych dziennie płynów
        </h3>
        <p className="text-foreground text-sm leading-relaxed">
          (wszystkich spożywanych, dodatkowo wymień rodzaje napojów, płynów)
        </p>
        <input
          type="text"
          value={zdrowie.plyny}
          onChange={(e) => updateZdrowie({ plyny: e.target.value })}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Kontuzje i ograniczenia ruchowe
        </h3>
        <p className="text-foreground text-sm leading-relaxed">
          (pozwoli bezpiecznie dopasować ćwiczenia i plan treningowy do Twoich
          możliwości.)
        </p>
        <input
          type="text"
          value={zdrowie.kontuzje}
          onChange={(e) => updateZdrowie({ kontuzje: e.target.value })}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors"
        />
      </div>
    </div>
  );
}

const STEPS = [Step1, Step2, Step3, Step4] as const;

interface ZdrowieProps {
  stepInSection: number;
}

export function Zdrowie({ stepInSection }: ZdrowieProps) {
  const StepComponent = STEPS[stepInSection];

  return (
    <div>
      <StepComponent />
    </div>
  );
}
