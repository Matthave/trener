import { formularzHrefWithPakiet } from "@/lib/formularz/form-pakiet";

export interface ProgramSection {
  title: string;
  items: readonly string[];
}

export interface ProgramPanelBlock {
  heading: string;
  sections: readonly ProgramSection[];
}

export interface Program {
  id: string;
  title: string;
  description: string;
  price: string;
  sections: readonly ProgramSection[];
  panelCta: { href: string; label: string };
  bundlePanels?: readonly ProgramPanelBlock[];
  accentBundle?: boolean;
  hideDescription?: boolean;
  savingsNote?: string;
  /** W zamkniętym kafelku (hideDescription) zamiast opisu — ten sam styl co cena */
  discountBadge?: string;
}

const TRENING_OFFER_SECTIONS: readonly ProgramSection[] = [
  {
    title: "Planowanie",
    items: [
      "Obszerny wywiad obejmujący cele, historię treningową, dostępny sprzęt i priorytety.",
      "Dobór najlepszych ćwiczeń pod cel i możliwości.",
      "Precyzyjne zarządzanie intensywnością poprzez wskaźnik RIR oraz długość przerw między seriami.",
      "Zaplanowane fazy akumulacji i intensyfikacji w cyklu treningowym.",
      "Uwzględnienie priorytetów mięśniowych oraz indywidualnych preferencji.",
      "5 tygodniowy cykl treningowy.",
    ],
  },
  {
    title: "Wsparcie",
    items: [
      "Stały kontakt z odpowiedzią do 12h.",
      "Analiza postępów z możliwością modyfikacji planu.",
    ],
  },
];

const DIETA_OFFER_SECTIONS: readonly ProgramSection[] = [
  {
    title: "Co otrzymujesz",
    items: [
      "Kalkulacja kalorii i rozkład makroskładników.",
      "Dobór produktów wraz z zasadami żywienia i suplementacji.",
      "Proponowany jadłospis jako punkt wyjścia.",
      "5 tygodniowy cykl żywieniowy.",
    ],
  },
  {
    title: "Metoda kontroli diety — do wyboru",
    items: [
      "Klasyczne liczenie przez aplikację (np. Fitatu).",
      "Model autorski oparty na tabelce żywieniowej jako alternatywa dla liczenia kalorii.",
    ],
  },
  {
    title: "Wsparcie",
    items: [
      "Stały kontakt z odpowiedzią do 12h.",
      "Analiza postępów z możliwością korekt planu żywieniowego — analogicznie jak w pozostałych pakietach.",
    ],
  },
];

const SEN_OFFER_SECTIONS: readonly ProgramSection[] = [
  {
    title: "Diagnoza",
    items: [
      "Obszerny wywiad z zakresu higieny snu oraz nawyków dziennych i wieczornych.",
      "Prowadzenie i analiza dziennika snu.",
      "Pomoc w namierzeniu źródła problemów — styl życia, RLS, bezdech senny, lęki, depresja lub inne schorzenia.",
      "Wskazanie kierunku diagnozy, jeśli przyczyna wymaga interwencji medycznej.",
    ],
  },
  {
    title: "Wdrożenie",
    items: [
      "Pomoc we wdrożeniu technik CBT-I.",
      "Budowa rutyny wieczornej dopasowanej do trybu życia klienta.",
      "Techniki relaksacyjne i eliminacja nawyków szkodliwych dla snu.",
    ],
  },
  {
    title: "Suplementacja i wiedza",
    items: [
      "Obszerna rozpiska suplementacji oparta na aktualnych badaniach.",
      "Stały kontakt i modyfikacja protokołu na podstawie dziennika snu.",
    ],
  },
];

export const programs: Program[] = [
  {
    id: "01",
    title: "Trening",
    description:
      "Plan treningowy z wywiadem, progresją RIR i przerw, fazami cyklu oraz bieżącym wsparciem i korektami planu.",
    price: "250 zł",
    sections: TRENING_OFFER_SECTIONS,
    panelCta: {
      href: formularzHrefWithPakiet("trening"),
      label: "Zamów sam trening",
    },
  },
  {
    id: "02",
    title: "Dieta",
    description:
      "Kalkulacja kalorii i makro, dobór produktów i jadłospis startowy; wybór metody kontroli diety oraz wsparcie jak w pozostałych pakietach.",
    price: "250 zł",
    sections: DIETA_OFFER_SECTIONS,
    panelCta: {
      href: formularzHrefWithPakiet("dieta"),
      label: "Zamów samą dietę",
    },
  },
  {
    id: "03",
    title: "Sen i Regeneracja",
    description:
      "Wywiad i dziennik snu, diagnoza przyczyn, wdrożenie CBT-I i rutyny wieczornej oraz protokół suplementacji z aktualizacją wg dziennika.",
    price: "300 zł",
    sections: SEN_OFFER_SECTIONS,
    panelCta: {
      href: formularzHrefWithPakiet("sen"),
      label: "Zamów pakiet snu",
    },
  },
  {
    id: "04",
    title: "Treningi personalne",
    description:
      "Treningi 1:1 u Ciebie lub w klubie: technika na żywo, plan i progresja na bieżąco, elastyczne terminy. Warszawa i okolice — zapytaj o wolny termin.",
    price: "200 zł",
    sections: [
      {
        title: "Co otrzymujesz",
        items: [
          "Treningi 1:1 w domu klienta lub w wybranym klubie sportowym.",
          "Pełna korekta techniki na żywo przy każdym ćwiczeniu.",
          "Plan i progresja dostosowywane na bieżąco do Twojej dyspozycji.",
          "Elastyczne terminy dopasowane do grafiku.",
        ],
      },
      {
        title: "Dostępność",
        items: [
          "Usługa dostępna wyłącznie na terenie Warszawy i okolic.",
          "Skontaktuj się, aby ustalić wolne terminy.",
        ],
      },
    ],
    panelCta: { href: "/#contact", label: "Zapytaj o termin" },
  },
  {
    id: "05",
    title: "Trening + Dieta",
    description: "",
    price: "400 zł",
    sections: [],
    accentBundle: true,
    hideDescription: true,
    discountBadge: "-20%",
    savingsNote: "Oszczędzasz 100 zł",
    bundlePanels: [
      { heading: "Trening", sections: TRENING_OFFER_SECTIONS },
      { heading: "Dieta", sections: DIETA_OFFER_SECTIONS },
    ],
    panelCta: {
      href: formularzHrefWithPakiet("trening-dieta"),
      label: "Zamów pakiet Trening + Dieta",
    },
  },
  {
    id: "06",
    title: "Trening + Dieta + Sen",
    description: "",
    price: "600 zł",
    sections: [],
    accentBundle: true,
    hideDescription: true,
    discountBadge: "-33%",
    savingsNote: "Oszczędzasz 200 zł",
    bundlePanels: [
      { heading: "Trening", sections: TRENING_OFFER_SECTIONS },
      { heading: "Dieta", sections: DIETA_OFFER_SECTIONS },
      { heading: "Sen i regeneracja", sections: SEN_OFFER_SECTIONS },
    ],
    panelCta: {
      href: formularzHrefWithPakiet("trening-dieta-sen"),
      label: "Zamów pakiet Trening + Dieta + Sen",
    },
  },
];
