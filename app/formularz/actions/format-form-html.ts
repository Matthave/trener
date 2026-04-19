import type { FormularzData } from "@/lib/stores/formularz-store";

interface FieldDef {
  label: string;
  value: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatCheckboxField(
  label: string,
  items: string[],
  inne?: string,
): FieldDef | null {
  const parts: string[] = [...items];
  if (inne?.trim()) {
    parts.push(`Inne: ${inne.trim()}`);
  }
  if (parts.length === 0) return null;
  return { label, value: parts.join(", ") };
}

function formatTextField(label: string, value: string): FieldDef | null {
  if (!value.trim()) return null;
  return { label, value: value.trim() };
}

function buildAnkietaFields(data: FormularzData["ankieta"]): FieldDef[] {
  const fields: (FieldDef | null)[] = [
    formatTextField("Imię", data.imie),
    formatTextField("Nazwisko", data.nazwisko),
    formatTextField("Adres e-mail", data.email),
    formatTextField("Numer telefonu", data.telefon),
    formatTextField("Wzrost (cm)", data.wzrost),
    formatTextField("Waga (kg)", data.waga),
    formatTextField("Obwód szyi (cm)", data.obwodSzyi),
    formatTextField("Obwód talii (cm)", data.obwodTalii),
  ];
  return fields.filter((f): f is FieldDef => f !== null);
}

function buildZywienieFields(data: FormularzData["zywienie"]): FieldDef[] {
  const fields: (FieldDef | null)[] = [
    formatTextField("Rodzaj działań żywieniowych", data.podejscie ?? ""),
    formatCheckboxField("Cele", data.cele, data.celeInne),
    formatCheckboxField("Preferowane źródła białka", data.bialko, data.bialkoInne),
    formatCheckboxField(
      "Preferowane źródła węglowodanów",
      data.weglowodany,
      data.weglowodanyInne,
    ),
    formatCheckboxField("Preferowane źródła tłuszczy", data.tluszcze, data.tluszczeInne),
    formatTextField("Ulubione produkty", data.ulubione),
    formatTextField("Nielubiane produkty", data.nielubiane),
    formatTextField("Obecna dieta", data.dieta),
    formatTextField("Wydatek energetyczny w ciągu dnia", data.wydatek),
  ];
  return fields.filter((f): f is FieldDef => f !== null);
}

function buildTreningowyFields(data: FormularzData["treningowy"]): FieldDef[] {
  const fields: (FieldDef | null)[] = [
    formatTextField("Jednostki treningowe w tygodniu", data.jednostki ?? ""),
    formatTextField("Inne aktywności fizyczne", data.aktywnosci),
    formatTextField("Dostępny sprzęt na treningu", data.sprzet),
    formatTextField("Dotychczasowy plan treningowy", data.plan),
    formatTextField("Poziom zaawansowania treningowego", data.poziom),
    formatTextField("Ulubione ćwiczenia", data.ulubione),
    formatTextField("Nielubiane ćwiczenia", data.nielubiane),
  ];
  return fields.filter((f): f is FieldDef => f !== null);
}

function buildZdrowieFields(data: FormularzData["zdrowie"]): FieldDef[] {
  const leki = data.lekiTak
    ? `Tak: ${data.lekiValue.trim() || "(nie podano)"}`
    : data.lekiNie
      ? "Nie"
      : "";

  const suplementy = data.suplementyTak
    ? `Tak: ${data.suplementyValue.trim() || "(nie podano)"}`
    : data.suplementyNie
      ? "Nie"
      : "";

  const fields: (FieldDef | null)[] = [
    formatCheckboxField("Gospodarka cukrowa / energia", data.cukrowa, data.cukrowaInne),
    formatCheckboxField("Możliwe niedobory / objawy", data.niedobory, data.niedoboryInne),
    formatCheckboxField("Choroby tarczycy", data.tarczyca, data.tarczycaInne),
    formatCheckboxField(
      "Choroby układu pokarmowego",
      data.pokarmowy,
      data.pokarmonyInne,
    ),
    formatCheckboxField(
      "Kondycja włosów, skóry i paznokci",
      data.kondycja,
      data.kondycjaInne,
    ),
    formatCheckboxField("Zaburzenia cyklu miesiączkowego", data.cykl, data.cyklInne),
    formatCheckboxField("Ciąża / karmienie piersią", data.ciaza, data.ciazaInne),
    formatTextField("Stosowane leki", leki),
    formatTextField("Stosowane suplementy", suplementy),
    formatTextField("Libido i popęd seksualny", data.libido),
    formatTextField("Ilość spożywanych dziennie płynów", data.plyny),
    formatTextField("Kontuzje i ograniczenia ruchowe", data.kontuzje),
  ];
  return fields.filter((f): f is FieldDef => f !== null);
}

function buildSenFields(data: FormularzData["sen"]): FieldDef[] {
  const fields: (FieldDef | null)[] = [
    formatTextField("O której chodzisz spać i wstajesz?", data.godziny),
    formatTextField("Ile zajmuje Ci zasypianie?", data.zasypianie),
    formatTextField("Ile razy wybudzasz się w nocy?", data.wybudzenia),
    formatTextField("Ile godzin przesypiasz?", data.iloscSnu),
    formatTextField("Środki nasenne lub suplementy na sen", data.srodki),
    formatTextField("Nastrój i energia po wstaniu", data.nastroj),
    formatTextField("Ocena snu (1–10)", data.ocena),
    formatTextField("Kawa – ilość i ostatnia kawa", data.kawa),
    formatTextField("Alkohol przed snem", data.alkohol),
    formatTextField("Ostatni posiłek przed snem", data.posilek),
    formatTextField("Chrapanie, bezdechy, niespokojny sen", data.chrapanie),
    formatTextField("Przerywany sen (stres, ból, hałas)", data.przerywanie),
    formatTextField("Co robisz gdy nie możesz zasnąć?", data.zasnac),
    formatTextField("Co robisz gdy się wybudzisz?", data.wybudzenie),
    formatTextField("Trening / aktywność fizyczna przed snem", data.trening),
    formatTextField("Nocny niepokój, napięcie, gonitwa myśli", data.niepokoj),
  ];
  return fields.filter((f): f is FieldDef => f !== null);
}

function renderSection(title: string, fields: FieldDef[]): string {
  if (fields.length === 0) return "";

  const rows = fields
    .map(
      (f) =>
        `<tr>
          <td style="padding:8px 12px;border:1px solid #ddd;font-weight:600;vertical-align:top;width:40%;color:#333;">${escapeHtml(f.label)}</td>
          <td style="padding:8px 12px;border:1px solid #ddd;color:#555;">${escapeHtml(f.value)}</td>
        </tr>`,
    )
    .join("\n");

  return `
    <h2 style="margin:32px 0 12px;font-size:18px;color:#111;">${escapeHtml(title)}</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
      ${rows}
    </table>
  `;
}

export function formatFormDataToHtml(data: FormularzData): string {
  const sections: string[] = [
    renderSection("Ankieta startowa", buildAnkietaFields(data.ankieta)),
    renderSection("Wywiad żywieniowy", buildZywienieFields(data.zywienie)),
    renderSection("Wywiad treningowy", buildTreningowyFields(data.treningowy)),
    renderSection("Zdrowie", buildZdrowieFields(data.zdrowie)),
    renderSection("Sen", buildSenFields(data.sen)),
  ].filter(Boolean);

  const clientName = [data.ankieta.imie, data.ankieta.nazwisko]
    .filter(Boolean)
    .join(" ");

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:700px;margin:0 auto;color:#333;">
      <h1 style="font-size:22px;color:#111;border-bottom:2px solid #9FC6FF;padding-bottom:8px;">
        Nowy formularz startowy${clientName ? ` — ${escapeHtml(clientName)}` : ""}
      </h1>
      <p style="color:#666;font-size:14px;">
        Wysłano: ${new Date().toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" })}
      </p>
      ${sections.join("\n")}
    </div>
  `;
}
