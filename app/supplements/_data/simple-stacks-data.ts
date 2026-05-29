export interface SimpleStackItem {
  name: string;
  dosage: string;
}

export interface SimpleStack {
  title: string;
  items: SimpleStackItem[];
}

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
      { name: "Melatonina", dosage: "2mg 15 min przed spaniem" },
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
        dosage: "200mg - 10% witanolidów przed spaniem",
      },
      { name: "Apigenina", dosage: "50mg przed spaniem" },
      { name: "Inozytol", dosage: "3g przed spaniem" },
    ],
  },
];
