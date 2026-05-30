export interface SimpleStackItem {
  name: string;
  dosage: string;
}

export interface SimpleStack {
  title: string;
  items: SimpleStackItem[];
}

export const simpleStackChartCategories = [
  { key: "general", label: "Ogólna" },
  { key: "fallingAsleep", label: "Zasypianie" },
  { key: "nightWakeups", label: "Wybudzenia" },
  { key: "antiStress", label: "Anty-stres" },
  { key: "antiAnxiety", label: "Anty-lęk" },
  { key: "antiNightmare", label: "Anty-koszmar" },
] as const;

export type SimpleStackChartCategoryKey =
  (typeof simpleStackChartCategories)[number]["key"];

export interface SimpleStackChartStack {
  name: string;
  cardTitle: string;
  badgeLabel: string;
  color: string;
  isNew?: boolean;
  scores: Record<SimpleStackChartCategoryKey, number>;
}

export interface SimpleStackChartDatum extends SimpleStackChartStack {
  score: number;
}

export const simpleStackChartStacks: SimpleStackChartStack[] = [
  {
    name: "Stack 1",
    cardTitle: "Stack 1 — Zasypianie + stres",
    badgeLabel: "Zasypianie + stres",
    color: "#9FC6FF",
    scores: {
      general: 7.5,
      fallingAsleep: 8.5,
      nightWakeups: 6.5,
      antiStress: 8.0,
      antiAnxiety: 7.8,
      antiNightmare: 4.5,
    },
  },
  {
    name: "Stack 2",
    cardTitle: "Stack 2 — Zbalansowany",
    badgeLabel: "Zbalansowany",
    color: "#0F5F50",
    scores: {
      general: 8.3,
      fallingAsleep: 7.4,
      nightWakeups: 7.8,
      antiStress: 8.0,
      antiAnxiety: 7.7,
      antiNightmare: 7.2,
    },
  },
  {
    name: "Stack 3",
    cardTitle: "Stack 3 — Wyciszenie bez melatoniny",
    badgeLabel: "Wyciszenie bez melatoniny",
    color: "#A56A14",
    scores: {
      general: 7.5,
      fallingAsleep: 7.5,
      nightWakeups: 6.5,
      antiStress: 6.5,
      antiAnxiety: 8.5,
      antiNightmare: 8.0,
    },
  },
  {
    name: "Stack 4",
    cardTitle: "Stack 4 — Utrzymanie snu + kortyzol",
    badgeLabel: "Utrzymanie snu + kortyzol",
    color: "#B53F69",
    scores: {
      general: 8.2,
      fallingAsleep: 7.0,
      nightWakeups: 8.5,
      antiStress: 8.0,
      antiAnxiety: 6.5,
      antiNightmare: 5.5,
    },
  },
  {
    name: "Anty-Stress",
    cardTitle: "Targeted Anty-Stress",
    badgeLabel: "Anty-stres",
    color: "#7269BD",
    scores: {
      general: 8.7,
      fallingAsleep: 7.0,
      nightWakeups: 8.0,
      antiStress: 9.3,
      antiAnxiety: 8.5,
      antiNightmare: 7.0,
    },
  },
  {
    name: "Anty-lęk",
    cardTitle: "Targeted Anty-lęk",
    badgeLabel: "Anty-lęk",
    color: "#BF4F2A",
    scores: {
      general: 8.4,
      fallingAsleep: 7.8,
      nightWakeups: 7.0,
      antiStress: 8.0,
      antiAnxiety: 9.2,
      antiNightmare: 7.3,
    },
  },
  {
    name: "Anty-koszmar",
    cardTitle: "Targeted Anty-koszmar",
    badgeLabel: "Anty-koszmar",
    color: "#78766D",
    scores: {
      general: 8.2,
      fallingAsleep: 7.2,
      nightWakeups: 7.5,
      antiStress: 7.5,
      antiAnxiety: 8.5,
      antiNightmare: 9.0,
    },
  },
  {
    name: "Wybudzenia",
    cardTitle: "Stack 5 — Utrzymanie snu",
    badgeLabel: "Wybudzenia / Utrzymanie snu",
    color: "#2468A8",
    scores: {
      general: 8.7,
      fallingAsleep: 7.0,
      nightWakeups: 9.3,
      antiStress: 8.2,
      antiAnxiety: 6.5,
      antiNightmare: 5.2,
    },
  },
  {
    name: "Zasypianie",
    cardTitle: "Stack 6 — Zasypianie",
    badgeLabel: "Zasypianie",
    color: "#07884C",
    scores: {
      general: 8.2,
      fallingAsleep: 9.2,
      nightWakeups: 6.2,
      antiStress: 8.5,
      antiAnxiety: 8.5,
      antiNightmare: 3.8,
    },
  },
];

export const simpleStackRatingStacks = [
  simpleStackChartStacks[0],
  simpleStackChartStacks[1],
  simpleStackChartStacks[2],
  simpleStackChartStacks[3],
  simpleStackChartStacks[4],
  simpleStackChartStacks[5],
  simpleStackChartStacks[6],
  simpleStackChartStacks[7],
  simpleStackChartStacks[8],
];

export const simpleStacks: SimpleStack[] = [
  {
    title: "Ultimate sleep stack 1",
    items: [
      { name: "Glicyna", dosage: "5g przed spaniem" },
      { name: "GABA", dosage: "1000mg przed spaniem" },
      { name: "Glicynian Magnezu", dosage: "400mg przed spaniem" },
      { name: "Cynk", dosage: "15mg przed spaniem" },
      {
        name: "Ashwaganda",
        dosage: "200mg - 10% witanolidów przed spaniem",
      },
      { name: "Tryptofan", dosage: "1g przed spaniem" },
      { name: "Melatonina IR", dosage: "2mg 15-30 min przed spaniem" },
    ],
  },
  {
    title: "Ultimate sleep stack 2",
    items: [
      { name: "Glicyna", dosage: "3g przed spaniem" },
      { name: "L-Treonian Magnezu", dosage: "400mg przed spaniem" },
      { name: "L-Teanina", dosage: "300mg przed spaniem" },
      { name: "Wiśnia Montmorency", dosage: "200mg przed spaniem" },
      {
        name: "Fosfatydyloseryna",
        dosage: "200mg przed spaniem",
      },
      { name: "Inozytol", dosage: "3g przed spaniem" },
    ],
  },
  {
    title: "Ultimate sleep stack 3",
    items: [
      { name: "Glicyna", dosage: "3g przed spaniem" },
      { name: "L-Teanina", dosage: "200mg przed spaniem" },
      { name: "Tauryna", dosage: "1 - 2g przed spaniem" },
      { name: "Inozytol", dosage: "2g przed spaniem" },
      {
        name: "GABA",
        dosage: "100 - 300mg przed spaniem (opcjonalnie)",
      },
    ],
  },
  {
    title: "Ultimate sleep stack 4",
    items: [
      { name: "Fosfatydyloseryna", dosage: "200 - 400mg przed spaniem" },
      { name: "ETAS", dosage: "100 - 150mg dziennie" },
      {
        name: "Wiśnia Montmorency",
        dosage: "standaryzowany ekstrakt lub sok/koncentrat zgodnie z etykietą",
      },
      {
        name: "L-Treonian Magnezu",
        dosage: "ok. 1g/d produktu, zależnie od standaryzacji",
      },
      {
        name: "Melatonina XR",
        dosage: "0,5 - 2mg, 30-60 minprzed snem",
      },
    ],
  },
  {
    title: "Targeted supplement stack - Anty-Stress",
    items: [
      {
        name: "Ashwaganda",
        dosage: "300 - 600 mg dziennie (5 - 10% witanolidów)",
      },
      { name: "L-Teanina", dosage: "100 - 200 mg dziennie" },
      { name: "Fosfatydyloseryna", dosage: "100 - 300 mg dziennie" },
      { name: "ETAS", dosage: "100 - 150 mg dziennie" },
      { name: "L-Treonian Magnezu", dosage: "100 - 400 mg dziennie" },
      { name: "Inozytol", dosage: "2 - 3 g dziennie" },
    ],
  },
  {
    title: "Targeted supplement stack - Anty-lęk",
    items: [
      { name: "L-Teanina", dosage: "100 - 200 mg dziennie" },
      {
        name: "Ashwaganda",
        dosage: "300 - 600 mg dziennie (5 - 10% witanolidów)",
      },
      { name: "Inozytol", dosage: "2 g dziennie" },
      {
        name: "GABA",
        dosage: "100 - 300 mg wieczorem (opcjonalnie)",
      },
      { name: "Tauryna", dosage: "1 - 2 g dziennie" },
      { name: "L-Treonian Magnezu", dosage: "100 - 400 mg dziennie" },
    ],
  },
  {
    title: "Targeted supplement stack - Anty-Koszmary",
    items: [
      { name: "L-Teanina", dosage: "200 - 300 mg przed spaniem" },
      { name: "Glicyna", dosage: "3 g przed spaniem" },
      { name: "L-Treonian Magnezu", dosage: "400 mg przed spaniem" },
      { name: "Tauryna", dosage: "1 - 2 g przed spaniem" },
      { name: "Inozytol", dosage: "2 g przed spaniem" },
      { name: "Fosfatydyloseryna", dosage: "200 mg przed spaniem" },
    ],
  },
  {
    title: "Targeted supplement stack - Wybudzenia",
    items: [
      {
        name: "Melatonina XR",
        dosage: "0,5 - 2 mg, 30 - 60 min przed snem",
      },
      {
        name: "L-Treonian Magnezu",
        dosage: "ok. 1 g/d produktu, zależnie od standaryzacji",
      },
      {
        name: "Wiśnia Montmorency",
        dosage: "standaryzowany ekstrakt lub sok/koncentrat zgodnie z etykietą",
      },
      { name: "Fosfatydyloseryna", dosage: "200 - 400 mg przed spaniem" },
      { name: "ETAS", dosage: "100 - 150 mg dziennie" },
      { name: "Glicyna", dosage: "3 g przed spaniem" },
    ],
  },
  {
    title: "Targeted supplement stack - Zasypianie",
    items: [
      { name: "Melatonina IR", dosage: "2 mg, 15 - 30 min przed spaniem" },
      { name: "L-Teanina", dosage: "200 - 300 mg przed spaniem" },
      { name: "GABA", dosage: "100 - 1000 mg przed spaniem" },
      { name: "Glicyna", dosage: "3 - 5 g przed spaniem" },
      { name: "Tryptofan", dosage: "1 g przed spaniem" },
      {
        name: "Ashwaganda",
        dosage: "200 - 500 mg przed spaniem (5 - 10% witanolidów)",
      },
    ],
  },
];
