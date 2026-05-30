export interface SleepStackItem {
  name: string;
  dosage: string;
  studyDosage: string;
  effects: string;
}

export const sleepStackItems: SleepStackItem[] = [
  {
    name: "Glicyna",
    dosage: "6 g przed spaniem",
    studyDosage: "3 - 6 g przed spaniem",
    effects:
      "Poprawa jakości snu ↑ 15 - 25%, redukcja zmęczenia ↓ 10 - 20%, skrócenie czasu zasypiania ↓ 5 - 10% [1]",
  },
  {
    name: "Melatonina",
    dosage: "2 mg przed spaniem",
    studyDosage: "0,5 - 5 mg przed spaniem",
    effects:
      "Skrócenie czasu zasypiania ↓ 7 - 15%, poprawa jakości snu ↑ 10 - 20%, wydłużenie czasu snu ↑ 5 - 15% [2]",
  },
  {
    name: "Ashwagandha",
    dosage: "500 mg (7%) przed spaniem",
    studyDosage: "300 - 600 mg (5 - 10% witanolidów)",
    effects:
      "Redukcja stresu ↓ 15 - 30%, poprawa snu ↑ 10 - 25%, skrócenie czasu zasypiania ↓ 5 - 10% [3]",
  },
  {
    name: "L-Tryptofan",
    dosage: "1000 mg przed spaniem",
    studyDosage: "500 - 2000 mg przed spaniem",
    effects:
      "Synteza serotoniny ↑ 10 - 20%, skrócenie zasypiania ↓ 5 - 15%, poprawa jakości snu ↑ 5 - 15% [4]",
  },
  {
    name: "GABA",
    dosage: "1000 mg przed spaniem",
    studyDosage: "100 - 1000 mg przed spaniem",
    effects:
      "Relaksacja ↑ 10 - 20%, skrócenie czasu zasypiania ↓ 5 - 15%, poprawa jakości snu ↑ 5 - 10% [5]",
  },
  {
    name: "L-Teanina",
    dosage: "100 - 200 mg przed spaniem",
    studyDosage: "100 - 200 mg przed spaniem",
    effects:
      "Relaksacja ↑ 10 - 20%, skrócenie czasu zasypiania ↓ 5 - 15%, poprawa jakości snu ↑ 5 - 10% [6]",
  },
  {
    name: "Kozłek lekarski",
    dosage: "200 mg (część Sen Bio) przed spaniem",
    studyDosage: "200 - 600 mg ekstraktu",
    effects:
      "Skrócenie czasu zasypiania ↓ 5 - 15%, poprawa snu ↑ 5 - 15%, redukcja lęku ↓ 5 - 10% [7]",
  },
  {
    name: "Treonian magnezu",
    dosage: "100 - 400 mg przed spaniem",
    studyDosage: "100 - 400 mg magnezu elementarnego",
    effects:
      "Relaksacja mięśni ↑ 10 - 15%, poprawa snu ↑ 5 - 15%, redukcja stresu ↓ 5 - 10% [8]",
  },
  {
    name: "Fosfatydyloseryna",
    dosage: "100 - 300 mg przed spaniem",
    studyDosage: "100 - 300 mg przed spaniem",
    effects:
      "Redukcja kortyzolu ↓ 10 - 20%, poprawa snu ↑ 5 - 10%, redukcja stresu ↓ 5 - 15% [9]",
  },
  {
    name: "Wiśnia Montmorency",
    dosage: "500 - 1000 mg przed spaniem",
    studyDosage: "500 - 1000 mg ekstraktu",
    effects:
      "Wzrost poziomu melatoniny ↑ 5 - 15%, poprawa snu ↑ 5 - 15%, wydłużenie czasu snu ↑ 5 - 10% [10]",
  },
  {
    name: "Chmiel",
    dosage: "200 mg (część Sen Bio) przed spaniem",
    studyDosage: "30 - 120 mg ekstraktu",
    effects:
      "Relaksacja ↑ 5 - 15%, poprawa snu ↑ 5 - 15%, redukcja lęku ↓ 5 - 10% [11]",
  },
  {
    name: "Melisa lekarska",
    dosage: "400 mg (część Sen Bio) przed spaniem",
    studyDosage: "300 - 600 mg ekstraktu",
    effects:
      "Relaksacja ↑ 5 - 15%, poprawa snu ↑ 5 - 10%, redukcja lęku ↓ 5 - 10% [12]",
  },
  {
    name: "Tauryna",
    dosage: "3 g przed spaniem",
    studyDosage: "1 - 3 g przed spaniem",
    effects:
      "Redukcja stresu ↓ 5 - 15%, poprawa snu ↑ 5 - 10%, relaksacja ↑ 5 - 10% [13]",
  },
  {
    name: "Diglicynian cynku",
    dosage: "10 - 30 mg przed spaniem",
    studyDosage: "10 - 30 mg cynku elementarnego",
    effects:
      "Poprawa jakości snu ↑ 5 - 10%, wsparcie regeneracji ↑ 5 - 15%, wydłużenie czasu snu ↑ 5 - 10% [14]",
  },
  {
    name: "P5P (Witamina B6)",
    dosage: "10 - 50 mg przed spaniem",
    studyDosage: "10 - 50 mg przed spaniem",
    effects:
      "Synteza melatoniny ↑ 5 - 10%, poprawa snu ↑ 5 - 10%, wsparcie snu REM ↑ 5 - 10% [15]",
  },
  {
    name: "Koper włoski",
    dosage: "100 mg (część Sen Bio) przed spaniem",
    studyDosage: "50 - 200 mg ekstraktu",
    effects:
      "Redukcja napięcia ↓ 5 - 10%, poprawa snu ↑ 5 - 10%, relaksacja ↑ 5 - 10% [16]",
  },
  {
    name: "Hupercyna A",
    dosage: "50 - 200 µg przed spaniem",
    studyDosage: "50 - 200 µg przed spaniem",
    effects:
      "Wsparcie snu REM ↑ 5 - 10%, poprawa pamięci ↑ 5 - 10%, poprawa snu ↑ 5 - 10% [17]",
  },
  {
    name: "Urydyna",
    dosage: "250 - 500 mg przed spaniem",
    studyDosage: "250 - 500 mg przed spaniem",
    effects:
      "Wsparcie funkcji mózgu ↑ 5 - 10%, poprawa snu ↑ 5 - 10%, redukcja stresu ↓ 5 - 10% [18]",
  },
  {
    name: "Alpha GPC",
    dosage: "250 - 500 mg przed spaniem",
    studyDosage: "250 - 500 mg przed spaniem",
    effects:
      "Wsparcie funkcji mózgu ↑ 5 - 10%, poprawa snu ↑ 5 - 10%, redukcja stresu ↓ 5 - 10% [19]",
  },
  {
    name: "Spermidyna",
    dosage: "1 - 3 mg przed spaniem",
    studyDosage: "1 - 3 mg przed spaniem",
    effects:
      "Wsparcie autofagii ↑ 5 - 10%, poprawa snu ↑ 5 - 10%, wsparcie regeneracji ↑ 5 - 10% [20]",
  },
  {
    name: "Apigenina",
    dosage: "50 mg przed spaniem",
    studyDosage:
      "50 mg apigeniny lub ekstrakt rumianku 200 - 400 mg (dane głównie dla rumianku, nie izolowanej apigeniny)",
    effects:
      "Poprawa jakości snu ↑ 5 - 10%, skrócenie czasu zasypiania ↓ 5 - 10%, relaksacja ↑ 5 - 10%, redukcja lęku ↓ 5 - 10% [21, 22]",
  },
  {
    name: "Inozytol",
    dosage: "2 - 3 g przed spaniem",
    studyDosage:
      "2000 mg myo-inozytołu/d przez 10 tyg. (badanie u kobiet w ciąży)",
    effects:
      "Poprawa jakości snu ↑ 5 - 10%, wydłużenie czasu snu ↑ 5 - 10% [23]",
  },
  {
    name: "ETAS",
    dosage: "100 - 150 mg dziennie",
    studyDosage: "150 mg/d przez 28 dni",
    effects:
      "Poprawa jakości snu ↑ 5 - 10%, redukcja stresu ↓ 5 - 15%, redukcja zmęczenia ↓ 5 - 15%, skrócenie czasu zasypiania ↓ 5 - 10% [24]",
  },
];
