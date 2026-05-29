export interface Supplement {
  name: string;
  dosage: string;
  url?: string;
  warning?: string;
}

export interface EffectItem {
  supplement: string;
  effect: string;
}

export interface EffectCategory {
  category: string;
  items: EffectItem[];
}

export const supplements: Supplement[] = [
  {
    name: "Melatonina",
    dosage: "2 tabs. przed spaniem (2mg)",
    url: "https://www.muscle-zone.pl/lepszy-sen/melatonin-240-tab",
  },
  {
    name: "Glicyna",
    dosage: "6g przed spaniem",
    url: "https://www.muscle-zone.pl/glicyna/pure-glycine-powder-240g",
  },
  {
    name: "Ashwagandha",
    dosage: "1 tabs. przed spaniem (500mg)",
    url: "https://www.muscle-zone.pl/ashwagandha/apollos-ashwagandha-diamond-100-kaps",
  },
  {
    name: "L-Tryptofan",
    dosage: "1000mg przed spaniem",
    url: "https://www.muscle-zone.pl/aminokwasy/l-tryptophan-250g",
  },
  {
    name: "GABA",
    dosage: "1000mg przed spaniem",
    url: "https://www.muscle-zone.pl/lepszy-sen/gaba-powder-250g",
    warning: 'Ryzyko ospałości, uczucie "ciężkości" po przebudzeniu',
  },
  {
    name: "L-Teanina",
    dosage: "1 kaps. przed spaniem",
    url: "https://www.muscle-zone.pl/teanina/l-theanine-plus-120-kaps",
  },
  {
    name: "Treonian magnezu",
    dosage: "4 kaps. przed spaniem",
    url: "https://www.muscle-zone.pl/p/magtein-magnesium-l-threonate-90-kaps",
  },
  {
    name: "Fosfatydyloseryna",
    dosage: "1 kaps. przed spaniem",
    url: "https://www.muscle-zone.pl/fosfatydyloseryna/ps100-30-kaps",
    warning: 'Ryzyko ospałości, uczucie "ciężkości" po przebudzeniu',
  },
  {
    name: "Wiśnia Montmorency",
    dosage: "2 kaps. przed spaniem",
    url: "https://www.muscle-zone.pl/substancje-witaminopodobne/tart-cherry-90-kaps",
  },
  {
    name: "Diglicynian cynku",
    dosage: "1/2 kaps. przed spaniem",
    url: "https://www.muscle-zone.pl/cynk/zinc-bisglycinate-120-tab",
  },
  {
    name: "Tauryna",
    dosage: "3g przed spaniem",
    url: "https://www.muscle-zone.pl/tauryna/taurine-250-g",
  },
  {
    name: "Spermidyna",
    dosage: "1 kaps. przed spaniem",
    url: "https://www.muscle-zone.pl/wsparcie-mitochondriow/spermidine-60-kaps",
  },
  {
    name: "P5P (Witamina B6)",
    dosage: "1 kaps. przed spaniem",
    url: "https://www.muscle-zone.pl/witamina-b6-pirydoksyna/p5p-120-tab",
  },
  {
    name: "Urydyna",
    dosage: "1 kaps. przed spaniem",
    url: "https://www.muscle-zone.pl/srodki-neuroprotekcyjne/uridine-60kaps",
  },
  {
    name: "Hupercyna A",
    dosage: "1 kaps. przed spaniem",
    url: "https://www.muscle-zone.pl/cholina/huperzine-a-120-kaps",
  },
  {
    name: "Alpha GPC",
    dosage: "1 kaps. przed spaniem",
    url: "https://www.muscle-zone.pl/alpha-gpc/alfa-gpc-90-kaps",
    warning: "Może zaburzać zasypianie!",
  },
];

export const effectCategories: EffectCategory[] = [
  {
    category: "Poprawa jakości snu",
    items: [
      { supplement: "Glicyna", effect: "↑ 15–25%" },
      { supplement: "Melatonina", effect: "↑ 10–20%" },
      { supplement: "Ashwagandha", effect: "↑ 10–25%" },
      { supplement: "L-Tryptofan", effect: "↑ 5–15%" },
      { supplement: "GABA", effect: "↑ 5–10%" },
      { supplement: "L-Teanina", effect: "↑ 5–10%" },
      { supplement: "Kozłek lekarski", effect: "↑ 5–15%" },
      { supplement: "Wiśnia Montmorency", effect: "↑ 5–15%" },
      { supplement: "Chmiel", effect: "↑ 5–15%" },
      { supplement: "Melisa lekarska", effect: "↑ 5–10%" },
      { supplement: "Diglicynian cynku", effect: "↑ 5–10%" },
      { supplement: "P5P (Witamina B6)", effect: "↑ 5–10%" },
      { supplement: "Koper włoski", effect: "↑ 5–10%" },
      { supplement: "Hupercyna A", effect: "↑ 5–10%" },
      { supplement: "Urydyna", effect: "↑ 5–10%" },
      { supplement: "Alpha GPC", effect: "↑ 5–10%" },
      { supplement: "Spermidyna", effect: "↑ 5–10%" },
      { supplement: "Treonian magnezu", effect: "↑ 5–15%" },
      { supplement: "Fosfatydyloseryna", effect: "↑ 5–10%" },
    ],
  },
  {
    category: "Skrócenie czasu zasypiania",
    items: [
      { supplement: "Melatonina", effect: "↓ 7–15%" },
      { supplement: "L-Tryptofan", effect: "↓ 5–15%" },
      { supplement: "GABA", effect: "↓ 5–15%" },
      { supplement: "Kozłek lekarski", effect: "↓ 5–15%" },
      { supplement: "L-Teanina", effect: "↓ 5–15%" },
      { supplement: "Glicyna", effect: "↓ 5–10%" },
      { supplement: "Ashwagandha", effect: "↓ 5–10%" },
    ],
  },
  {
    category: "Redukcja stresu",
    items: [
      { supplement: "Ashwagandha", effect: "↓ 15–30%" },
      { supplement: "Tauryna", effect: "↓ 5–15%" },
      { supplement: "Fosfatydyloseryna", effect: "↓ 5–15%" },
      { supplement: "Urydyna", effect: "↓ 5–10%" },
      { supplement: "Alpha GPC", effect: "↓ 5–10%" },
      { supplement: "Treonian magnezu", effect: "↓ 5–10%" },
    ],
  },
  {
    category: "Relaksacja",
    items: [
      { supplement: "L-Teanina", effect: "↑ 10–20%" },
      { supplement: "GABA", effect: "↑ 10–20%" },
      { supplement: "Chmiel", effect: "↑ 5–15%" },
      { supplement: "Melisa lekarska", effect: "↑ 5–15%" },
      { supplement: "Koper włoski", effect: "↑ 5–10%" },
      { supplement: "Tauryna", effect: "↑ 5–10%" },
    ],
  },
  {
    category: "Redukcja zmęczenia",
    items: [{ supplement: "Glicyna", effect: "↓ 10–20%" }],
  },
  {
    category: "Relaksacja mięśni",
    items: [{ supplement: "Treonian magnezu", effect: "↑ 10–15%" }],
  },
  {
    category: "Poprawa pamięci",
    items: [{ supplement: "Hupercyna A", effect: "↑ 5–10%" }],
  },
  {
    category: "Wsparcie snu REM",
    items: [
      { supplement: "Hupercyna A", effect: "↑ 5–10%" },
      { supplement: "P5P (Witamina B6)", effect: "↑ 5–10%" },
    ],
  },
  {
    category: "Wydłużenie czasu snu",
    items: [
      { supplement: "Melatonina", effect: "↑ 5–15%" },
      { supplement: "Wiśnia Montmorency", effect: "↑ 5–10%" },
      { supplement: "Diglicynian cynku", effect: "↑ 5–10%" },
    ],
  },
  {
    category: "Synteza melatoniny",
    items: [{ supplement: "P5P (Witamina B6)", effect: "↑ 5–10%" }],
  },
  {
    category: "Wzrost poziomu melatoniny",
    items: [{ supplement: "Wiśnia Montmorency", effect: "↑ 5–15%" }],
  },
  {
    category: "Synteza serotoniny",
    items: [{ supplement: "L-Tryptofan", effect: "↑ 10–20%" }],
  },
  {
    category: "Redukcja kortyzolu",
    items: [{ supplement: "Fosfatydyloseryna", effect: "↓ 10–20%" }],
  },
  {
    category: "Wsparcie autofagii",
    items: [{ supplement: "Spermidyna", effect: "↑ 5–10%" }],
  },
  {
    category: "Wsparcie regeneracji",
    items: [
      { supplement: "Diglicynian cynku", effect: "↑ 5–15%" },
      { supplement: "Spermidyna", effect: "↑ 5–10%" },
    ],
  },
  {
    category: "Redukcja lęku",
    items: [
      { supplement: "Kozłek lekarski", effect: "↓ 5–10%" },
      { supplement: "Chmiel", effect: "↓ 5–10%" },
      { supplement: "Melisa lekarska", effect: "↓ 5–10%" },
    ],
  },
  {
    category: "Redukcja napięcia",
    items: [{ supplement: "Koper włoski", effect: "↓ 5–10%" }],
  },
  {
    category: "Wsparcie funkcji mózgu",
    items: [
      { supplement: "Urydyna", effect: "↑ 5–10%" },
      { supplement: "Alpha GPC", effect: "↑ 5–10%" },
    ],
  },
];

export const bibliography: string[] = [
  'Yamadera, W. et al. (2007). "Glycine ingestion improves subjective sleep quality in human volunteers". Sleep Biol Rhythms, 5(2), 126–131.',
  'Brzezinski, A. et al. (2005). "Effects of exogenous melatonin on sleep: a meta-analysis". J Clin Sleep Med, 1(1), 12–18.',
  'Chandrasekhar, K. et al. (2012). "A prospective, randomized double-blind, placebo-controlled study of safety and efficacy of a high-concentration full-spectrum extract of ashwagandha root in reducing stress and anxiety in adults". Indian J Psychol Med, 34(3), 255–262.',
  'Hartmann, E. (1982). "Effects of L-tryptophan on sleepiness and on sleep". J Psychiatr Res, 17(2), 107–113.',
  'Byun, J. et al. (2018). "Gamma-aminobutyric acid (GABA) administration and its effects on sleep and relaxation". Nutrients, 10(11), 1679.',
  'Lyon, M. et al. (2011). "The effects of L-theanine on subjective and objective measures of stress and relaxation". Altern Med Rev, 16(4), 348–354.',
  'Leathwood, P. D. et al. (1982). "Aqueous extract of valerian root (Valeriana officinalis L.) improves sleep quality in man". Pharmacol Biochem Behav, 17(1), 65–71.',
  'Abbasi, B. et al. (2012). "The effect of magnesium supplementation on primary insomnia in elderly: A double-blind placebo-controlled clinical trial". J Res Med Sci, 17(12), 1161–1169.',
  'Starks, M. et al. (2008). "The effects of phosphatidylserine on endocrine response to moderate intensity exercise". Nutr Metab (Lond), 5, 11.',
  'Howatson, G. et al. (2012). "Effect of tart cherry juice (Prunus cerasus) on melatonin levels and enhanced sleep quality". Eur J Nutr, 51(8), 909–916.',
  'Franco, L. et al. (2012). "The sedative effects of hops (Humulus lupulus), a component of beer, on the activity/rest rhythm". Acta Physiol Hung, 99(2), 133–139.',
  'Kennedy, D. O. et al. (2006). "Anxiolytic effects of a combination of Melissa officinalis and Valeriana officinalis during laboratory induced stress". Phytother Res, 20(2), 96–102.',
  'Zhang, M. et al. (2004). "Taurine and its effects on stress and sleep: A preclinical study". Amino Acids, 26(2), 153–157.',
  'Rondanelli, M. et al. (2011). "The effect of zinc supplementation on sleep quality in the elderly". J Am Geriatr Soc, 59(1), 82–90.',
  'Peuhkuri, K. et al. (2012). "Dietary factors and fluctuating levels of melatonin and vitamin B6". J Nutr Metab, 2012, 301938.',
  'Cases, J. et al. (2011). "Pilot trial of Melissa officinalis L. leaf extract in the treatment of volunteers suffering from mild-to-moderate anxiety disorders and sleep disturbances". Med J Nutrition Metab, 4(3), 211–218.',
  'Zhang, Z. et al. (2008). "Huperzine A enhances memory and cognitive performance in animal models". Neurosci Lett, 444(1), 42–46.',
  'Wurtman, R. et al. (2009). "Uridine and brain function: A review of preclinical and clinical data". Nutr Rev, 67(11), 615–623.',
  'Silveri, M. et al. (2008). "Citicoline enhances frontal lobe bioenergetics as measured by phosphorus magnetic resonance spectroscopy". Hum Psychopharmacol, 23(7), 571–584.',
  'Madeo, F. et al. (2018). "Spermidine in health and disease". Science, 359(6374), eaan2788.',
];
