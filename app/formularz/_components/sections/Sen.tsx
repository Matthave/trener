"use client";

import { useFormularzStore } from "@/lib/stores/formularz-store";

function Step1() {
  const sen = useFormularzStore((s) => s.formData.sen);
  const updateSen = useFormularzStore((s) => s.updateSen);

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-4 text-foreground text-sm leading-relaxed">
        <p>
          Sen odgrywa kluczową rolę w regeneracji organizmu, wpływając na
          samopoczucie, koncentrację oraz ogólny stan zdrowia. Poniższe pytania
          mają na celu ocenę jakości snu oraz stopnia nocnej regeneracji.
          Uzyskane informacje pomogą lepiej zrozumieć Twoje nawyki związane ze
          snem i odpoczynkiem.
        </p>
        <p>
          * jeśli prowadzisz dziennik snu, prześlij go do mnie wraz z
          formularzem.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          O której chodzisz spać i wstajesz z łóżka?
        </h3>
        <textarea
          value={sen.godziny}
          onChange={(e) => updateSen({ godziny: e.target.value })}
          rows={3}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Ile zazwyczaj zajmuje Ci zasypianie?
        </h3>
        <textarea
          value={sen.zasypianie}
          onChange={(e) => updateSen({ zasypianie: e.target.value })}
          rows={3}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Ile razy wybudzasz się w nocy i ile trawają wybudzenia?
        </h3>
        <textarea
          value={sen.wybudzenia}
          onChange={(e) => updateSen({ wybudzenia: e.target.value })}
          rows={3}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Ile godzin zazwyczaj przesypiasz?
        </h3>
        <textarea
          value={sen.iloscSnu}
          onChange={(e) => updateSen({ iloscSnu: e.target.value })}
          rows={3}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>
    </div>
  );
}

function Step2() {
  const sen = useFormularzStore((s) => s.formData.sen);
  const updateSen = useFormularzStore((s) => s.updateSen);

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Jakie środki nasenne lub suplementy na sen stosujesz?
        </h3>
        <textarea
          value={sen.srodki}
          onChange={(e) => updateSen({ srodki: e.target.value })}
          rows={3}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Jak wygląda Twój nastrój i energia od razu po wstaniu?
        </h3>
        <textarea
          value={sen.nastroj}
          onChange={(e) => updateSen({ nastroj: e.target.value })}
          rows={3}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Jak oceniasz swój sen - stopień regeneracji fizycznej i psychicznej (w
          skali od 1 do 10)
        </h3>
        <textarea
          value={sen.ocena}
          onChange={(e) => updateSen({ ocena: e.target.value })}
          rows={3}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Ile pijesz kawy w ciągu dnia i o której pijesz ostatnią kawę?
        </h3>
        <textarea
          value={sen.kawa}
          onChange={(e) => updateSen({ kawa: e.target.value })}
          rows={3}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>
    </div>
  );
}

function Step3() {
  const sen = useFormularzStore((s) => s.formData.sen);
  const updateSen = useFormularzStore((s) => s.updateSen);

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Czy zdarza Ci się pić alkohol przed snem?
        </h3>
        <textarea
          value={sen.alkohol}
          onChange={(e) => updateSen({ alkohol: e.target.value })}
          rows={3}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Ile przed snem jesz ostatni posiłek?
        </h3>
        <textarea
          value={sen.posilek}
          onChange={(e) => updateSen({ posilek: e.target.value })}
          rows={3}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Czy ktoś zwracał uwagę na chrapanie, bezdechy lub niespokojny sen?
        </h3>
        <textarea
          value={sen.chrapanie}
          onChange={(e) => updateSen({ chrapanie: e.target.value })}
          rows={3}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Jak często Twój sen jest przerywany przez stres, ból, hałas lub
          potrzebę skorzystania z toalety?
        </h3>
        <textarea
          value={sen.przerywanie}
          onChange={(e) => updateSen({ przerywanie: e.target.value })}
          rows={3}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>
    </div>
  );
}

function Step4() {
  const sen = useFormularzStore((s) => s.formData.sen);
  const updateSen = useFormularzStore((s) => s.updateSen);

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Co robisz gdy nie możesz zasnąć dłużej niż zwykle?
        </h3>
        <textarea
          value={sen.zasnac}
          onChange={(e) => updateSen({ zasnac: e.target.value })}
          rows={3}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Co robisz gdy się wybudzisz i nie możesz zasnąć dłużej niż 30 min?
        </h3>
        <textarea
          value={sen.wybudzenie}
          onChange={(e) => updateSen({ wybudzenie: e.target.value })}
          rows={3}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Ile przed snem wykonujesz trening lub inna aktywność fizyczna?
        </h3>
        <textarea
          value={sen.trening}
          onChange={(e) => updateSen({ trening: e.target.value })}
          rows={3}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg md:text-xl uppercase tracking-wider">
          Czy w nocy odczuwasz niepokój, napięcie lub gonitwę myśli utrudniającą
          sen
        </h3>
        <textarea
          value={sen.niepokoj}
          onChange={(e) => updateSen({ niepokoj: e.target.value })}
          rows={3}
          className="w-full bg-transparent border-b border-foreground/60 py-3 text-lg text-accent placeholder:text-foreground/60 focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>
    </div>
  );
}

const STEPS = [Step1, Step2, Step3, Step4] as const;

interface SenProps {
  stepInSection: number;
}

export function Sen({ stepInSection }: SenProps) {
  const StepComponent = STEPS[stepInSection];

  return (
    <div>
      <StepComponent />
    </div>
  );
}
