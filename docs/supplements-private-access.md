# Prywatny dostep do sekcji `/supplements`

## Cel

Strona `/supplements` ma publiczna czesc przewodnika oraz prywatne sekcje
dostepne tylko po wejscu przez link z tokenem. Nie ma kont, logowania ani bazy
danych. Dostep jest potwierdzany po stronie serwera i zapamietywany w podpisanym
cookie powiazanym z konkretnym tokenem.

## Zakres

Publiczne sekcje:

- header strony,
- `Ultimate Sleep Supplements`,
- `Sleep-Stack: Tabelka dawek i efektow w badaniach`.

Chronione sekcje:

- wszystkie sekcje stackow renderowane przez `SimpleStackSection`,
- wykres `SimpleStacksChart`,
- `Toplista efektow`,
- `Bibliografia`.

Osoba bez dostepu widzi wyblurowane makiety prywatnych sekcji. Makiety uzywaja
dummy data o podobnej dlugosci tekstu i odtwarzaja uklad stackow, wykresu,
rankingu efektow oraz bibliografii, ale nie renderuja prawdziwej chronionej
tresci. Chronione dane nie sa renderowane w HTML ani przekazywane do
klientowego komponentu wykresu.

## Konfiguracja env

W `.env.local` albo w zmiennych srodowiskowych hostingu ustaw:

```bash
SUPPLEMENTS_ACCESS_TOKENS=token-1,token-2
SUPPLEMENTS_ACCESS_COOKIE_SECRET=dlugi-losowy-sekret
```

`SUPPLEMENTS_ACCESS_TOKENS` to lista poprawnych tokenow rozdzielonych
przecinkami. `SUPPLEMENTS_ACCESS_COOKIE_SECRET` podpisuje cookie dostepu przez
HMAC. Bez tych zmiennych prywatne sekcje pozostaja zamkniete.

Przyklady generowania wartosci:

```bash
openssl rand -base64 32
```

Wygeneruj osobna wartosc dla tokenu i osobna dla sekretu cookie.

## Flow dostepu

1. Wysylasz prywatny link w formacie `/supplements?access=TOKEN`.
2. `proxy.ts` sprawdza token przed renderowaniem strony.
3. Jesli token jest poprawny, aplikacja ustawia `httpOnly` cookie
   `supplements_access` wazne 7 dni. Cookie zawiera odcisk (fingerprint)
   uzytego tokenu, podpisany HMAC — surowy token nie trafia do cookie.
4. Uzytkownik jest przekierowany na czysty adres `/supplements`, bez tokenu w
   URL.
5. Przy kolejnych wejsciach `page.tsx` sprawdza podpis cookie oraz to, czy
   odcisk tokenu nadal jest na liscie `SUPPLEMENTS_ACCESS_TOKENS`, i renderuje
   prywatne sekcje.
6. Przy blednym tokenie w URL cookie jest czyszczone, a uzytkownik trafia na
   `/supplements` z wyblurowanymi makietami prywatnych sekcji.
7. Przy cofniętym tokenie w cookie (token usuniety z env) uzytkownik widzi
   ograniczona wersje strony. Cookie moze pozostac w przegladarce, ale nie
   daje juz dostepu — nie trzeba go usuwac po stronie serwera.

## Wyblurowane makiety

Widok bez dostepu renderuje server-only komponent z atrapami sekcji. Komponent
nie importuje prywatnych danych, nie uzywa `SimpleStackSection`, nie uruchamia
`SimpleStacksChart`, nie korzysta z Recharts i nie zawiera animacji. `BlurShell`
naklada blur na ograniczone wrappery makiet i blokuje interakcje z zamazana
warstwa przez `pointer-events-none`.

CTA sa renderowane poza `BlurShell`, jako niezamazane overlaye z linkiem do
`/#contact`. Dzieki temu przyciski pozostaja czytelne i klikalne, a blur nadal
nie obejmuje wiekszego obszaru niz sama makieta. CTA na wykresie prowadzi tekstem
`Odkryj porownanie zestawow`, a CTA pod stackami i rankingiem efektow prowadzi
tekstem `Zapytaj o dostep`.

## Cofanie i rotacja dostepu

- Aby natychmiast uniewaznic dostep powiazany z konkretnym linkiem, usun jego
  token z `SUPPLEMENTS_ACCESS_TOKENS` i wdroz ponownie aplikacje. Dotyczy to
  zarowno nowych wejsc przez link, jak i juz wystawionych cookie — cookie
  przechowuje odcisk tokenu, wiec po usunieciu tokenu z env dostep znika od
  razu przy nastepnym wejsciu na strone.
- Pozostali uzytkownicy z innymi tokenami na liscie zachowuja dostep bez
  zmian.
- Aby uniewaznic wszystkie cookie naraz (np. po wycieku sekretu), zmien
  `SUPPLEMENTS_ACCESS_COOKIE_SECRET` i wdroz ponownie aplikacje. Wszyscy
  uzytkownicy musza ponownie wejsc przez aktywny link z tokenem.
- Przy jednym wspolnym tokenie rotacja dotyczy wszystkich osob korzystajacych z
  tego linku. Przy wielu tokenach mozna usuwac je pojedynczo.

## Ograniczenia

- Link/token mozna przekazac innej osobie — cofanie dotyczy tokenu, nie
  konkretnej osoby ani przegladarki.
- Nie ma kont uzytkownikow, panelu zarzadzania ani historii uzyc tokenow.
- Stare cookie w formacie v1 (bez odcisku tokenu) nie sa wspierane — po wdrozeniu
  v2 uzytkownicy musza ponownie wejsc przez link z tokenem.
