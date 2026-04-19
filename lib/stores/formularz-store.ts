import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AnkietaData {
  imie: string;
  nazwisko: string;
  email: string;
  telefon: string;
  wzrost: string;
  waga: string;
  obwodSzyi: string;
  obwodTalii: string;
}

export interface ZywienieData {
  podejscie: string | null;
  cele: string[];
  celeInne: string;
  bialko: string[];
  bialkoInne: string;
  weglowodany: string[];
  weglowodanyInne: string;
  tluszcze: string[];
  tluszczeInne: string;
  ulubione: string;
  nielubiane: string;
  dieta: string;
  wydatek: string;
}

export interface TreningowyData {
  jednostki: string | null;
  aktywnosci: string;
  sprzet: string;
  plan: string;
  poziom: string;
  ulubione: string;
  nielubiane: string;
}

export interface ZdrowieData {
  cukrowa: string[];
  cukrowaInne: string;
  niedobory: string[];
  niedoboryInne: string;
  tarczyca: string[];
  tarczycaInne: string;
  pokarmowy: string[];
  pokarmonyInne: string;
  kondycja: string[];
  kondycjaInne: string;
  cykl: string[];
  cyklInne: string;
  ciaza: string[];
  ciazaInne: string;
  lekiNie: boolean;
  lekiTak: boolean;
  lekiValue: string;
  suplementyNie: boolean;
  suplementyTak: boolean;
  suplementyValue: string;
  libido: string;
  plyny: string;
  kontuzje: string;
}

export interface SenData {
  godziny: string;
  zasypianie: string;
  wybudzenia: string;
  iloscSnu: string;
  srodki: string;
  nastroj: string;
  ocena: string;
  kawa: string;
  alkohol: string;
  posilek: string;
  chrapanie: string;
  przerywanie: string;
  zasnac: string;
  wybudzenie: string;
  trening: string;
  niepokoj: string;
}

export interface FormularzData {
  ankieta: AnkietaData;
  zywienie: ZywienieData;
  treningowy: TreningowyData;
  zdrowie: ZdrowieData;
  sen: SenData;
}

const initialAnkieta: AnkietaData = {
  imie: "",
  nazwisko: "",
  email: "",
  telefon: "",
  wzrost: "",
  waga: "",
  obwodSzyi: "",
  obwodTalii: "",
};

const initialZywienie: ZywienieData = {
  podejscie: null,
  cele: [],
  celeInne: "",
  bialko: [],
  bialkoInne: "",
  weglowodany: [],
  weglowodanyInne: "",
  tluszcze: [],
  tluszczeInne: "",
  ulubione: "",
  nielubiane: "",
  dieta: "",
  wydatek: "",
};

const initialTreningowy: TreningowyData = {
  jednostki: null,
  aktywnosci: "",
  sprzet: "",
  plan: "",
  poziom: "",
  ulubione: "",
  nielubiane: "",
};

const initialZdrowie: ZdrowieData = {
  cukrowa: [],
  cukrowaInne: "",
  niedobory: [],
  niedoboryInne: "",
  tarczyca: [],
  tarczycaInne: "",
  pokarmowy: [],
  pokarmonyInne: "",
  kondycja: [],
  kondycjaInne: "",
  cykl: [],
  cyklInne: "",
  ciaza: [],
  ciazaInne: "",
  lekiNie: false,
  lekiTak: false,
  lekiValue: "",
  suplementyNie: false,
  suplementyTak: false,
  suplementyValue: "",
  libido: "",
  plyny: "",
  kontuzje: "",
};

const initialSen: SenData = {
  godziny: "",
  zasypianie: "",
  wybudzenia: "",
  iloscSnu: "",
  srodki: "",
  nastroj: "",
  ocena: "",
  kawa: "",
  alkohol: "",
  posilek: "",
  chrapanie: "",
  przerywanie: "",
  zasnac: "",
  wybudzenie: "",
  trening: "",
  niepokoj: "",
};

interface FormularzState {
  formData: FormularzData;
  isStarted: boolean;
  updateAnkieta: (data: Partial<AnkietaData>) => void;
  updateZywienie: (data: Partial<ZywienieData>) => void;
  updateTreningowy: (data: Partial<TreningowyData>) => void;
  updateZdrowie: (data: Partial<ZdrowieData>) => void;
  updateSen: (data: Partial<SenData>) => void;
  resetStore: () => void;
}

const initialFormData: FormularzData = {
  ankieta: initialAnkieta,
  zywienie: initialZywienie,
  treningowy: initialTreningowy,
  zdrowie: initialZdrowie,
  sen: initialSen,
};

export const useFormularzStore = create<FormularzState>()(
  persist(
    (set) => ({
      formData: initialFormData,
      isStarted: false,

      updateAnkieta: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            ankieta: { ...state.formData.ankieta, ...data },
          },
          isStarted: true,
        })),

      updateZywienie: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            zywienie: { ...state.formData.zywienie, ...data },
          },
          isStarted: true,
        })),

      updateTreningowy: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            treningowy: { ...state.formData.treningowy, ...data },
          },
          isStarted: true,
        })),

      updateZdrowie: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            zdrowie: { ...state.formData.zdrowie, ...data },
          },
          isStarted: true,
        })),

      updateSen: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            sen: { ...state.formData.sen, ...data },
          },
          isStarted: true,
        })),

      resetStore: () =>
        set({
          formData: initialFormData,
          isStarted: false,
        }),
    }),
    { name: "formularz_draft" },
  ),
);
