export interface TextBlock {
  type: "text";
  paragraphs: string[];
}

export interface TileBlock {
  type: "tile";
  title: string;
  paragraphs: string[];
}

export type StoryBlock = TextBlock | TileBlock;

export const insomniaStory = {
  title: "Moja bezsenność",
  lead: "Osobista historia o bezsenności, lęku, przeciążeniu i powolnym wracaniu do snu.",
  blocks: [
    {
      type: "text",
      paragraphs: [
        `Wielokrotnie wspominałem, że podzielę się swoją historią, jako że ma ona szczęśliwe zakończenie, a takich tutaj zdecydowanie za mało. Nie jest to pigułka wiedzy pod tytułem: „Ej, chorowałem na bezsenność, ale zrobiłem TO i TO, i już nie choruję” lub “w komentarzu napisz SEN, a wyleczę Cię z bezsenności”. Jest to raczej opis całej sytuacji, w której wielu zobaczy siebie i swoje przejścia. Mam nadzieję, że ta historia w jakiś sposób was wesprze, a może nawet zainspiruje do działania.`,
        `U mnie, ironicznie, zaczęło się od przeczytania książki Dlaczego śpimy? Matthew Walkera. Sięgnąłem po nią z czystego zainteresowania snem, ponieważ jest to jeden z filarów zdrowego trybu życia, którym od zawsze się pasjonuję. Miałem nadzieję poznać dokładniej mechanizmy zarządzające snem i może znaleźć sposoby na zoptymalizowanie własnego, który do tej pory był bardzo dobry. Nigdy przedtem, na żadnym etapie życia, nie miałem problemów z zasypianiem ani wybudzeniami. W dalszej przeszłości zdarzały się jedynie sytuacje w stylu „spojrzenie na zegarek i przekręcenie się na drugi bok”. Parę dni po lekturze pierwszy raz wybudziłem się około 6 nad ranem i nie potrafiłem ponownie zasnąć. Jako osoba dobrze znająca swoje ciało, od razu odnotowałem to w głowie pod hasłem: „O co chodzi?”. Kolejną noc przespałem od zaśnięcia do budzika, więc uspokoiłem się, że to jednorazowe zdarzenie. Jednak już następnej nocy sytuacja się powtórzyła - z tą różnicą, że obudziłem się o 3 i tak samo jak poprzednio nie mogłem zasnąć. Mimo że był to dopiero drugi raz, czerwona lampka w mojej głowie eksplodowała.`,
        `Choć do stanu, który przechodziłem później, było jeszcze daleko, na tamtą chwilę czułem, że ewidentnie coś jest nie tak. Niepokoił mnie również sam sposób wybudzania - najbardziej przypominało to uczucie powolnego „wynurzania się” ze snu. Zawsze działo się to w trakcie fazy marzeń sennych, podczas których wręcz czułem, że tracę ten sen, aż w końcu przechodziłem w stan stuprocentowego rozbudzenia, po którym nie potrafiłem już zasnąć. Sytuacja powtarzała się w kolejnych nocach. Gdy się wybudzałem, zostawałem w łóżku i starałem się usnąć, zazwyczaj zajmowało mi to ok. 2-3 godziny, więc pozostawało mi niewiele prawdziwego snu.`,
        `Nie miałem doświadczenia z obszarem psychiatrii, nigdy u żadnego nie byłem, a mój pakiet opieki medycznej nie obejmował takiej konsultacji, więc na pierwszy ogień zapisałem się do neurologa. Trafiłem na bardzo fajną panią doktor, która wykonała podstawowe badania sprawdzające ewentualne przesłanki do głębszej diagnostyki. Nic takiego nie wyszło, więc podejrzenia szybko padły na styl życia, zarządzanie stresem i równowagę pomiędzy pracą a odpoczynkiem. Przepisała mi Trittico (1/3 tabletki) i wytłumaczyła, że to lek przeciwdepresyjny, ale w niskiej dawce zadziała nasennie. Przez kolejne noce brałem zaleconą dawkę, ale nic się nie wydarzyło. Wybudzenia cały czas się zdarzały i nadal nie mogłem po nich usnąć.`,
        `Obsesyjnie zacząłem sprawdzać wszystkie informacje dotyczące zaburzeń snu. Jako osoba mocno stąpająca po ziemi byłem przekonany, że powód jest organiczny - że to musi być coś, co da się wyłapać z badań krwi lub podobnych. Najbardziej nurtowały mnie pytania: dlaczego, skąd to się bierze, jaka jest przyczyna? Bo na pewno jakaś musi być. Wiele osób z mojego otoczenia od razu zwróciło uwagę na tę książkę - że czegoś się w niej wystraszyłem, zafiksowałem się i stąd problemy. Sam uważałem, że to bardzo pasuje do układanki, ale umiałem ocenić samego siebie i nie czułem, bym podczas lektury wpadł w panikę albo żeby ta książka mną jakoś wstrząsnęła. Kolejnym podejrzanym był oczywiście szeroko pojęty stres, ale nie chciałem o tym słyszeć. Czułem jakby trochę mi wmawiano, że to jest przyczyna, a ja uważałem, że nie jestem zestresowany, przecież mam dobre życie, dobrą pracę i ogólnie wychodziłem z założenia, że ludzie mają w życiu ciężej i jakoś śpią normalnie.`,
      ],
    },
    {
      type: "tile",
      title: "Niedoszacowanie obciążenia",
      paragraphs: [
        `Z perspektywy czasu już wiem, że wtedy brakowało mi umiejętności oceny ciężaru i ceny, jaką się płaci za różnego rodzaju wyzwania, które sobie stawiamy w życiu. Wielkie plany, przeprowadzka, długi projekt w pracy, duże zmiany w dotychczasowym funkcjonowaniu, praca nad związkiem, a to wszystko otoczone tysiącem małym spraw i obowiązków, z którymi musimy codziennie sobie radzić.`,
        `Sami bagatelizujemy wysiłek, który wkładamy by sprostać własnym oczekiwanią, myśląc że nie jest to nic nadzwyczajnego - dla mnie to normalne, mnie to nie stresuje, to nic wielkiego, od zawsze tak działam itd.`,
      ],
    },
    {
      type: "text",
      paragraphs: [
        `Wykonałem mnóstwo badań z krwi, sprawdzając wszystkie parametry, które mogą rzutować na sen: kortyzol rano, testosteron, prolaktynę, magnez, potas, wapń, żelazo, ferrytynę, morfologię, badania powiązane z cukrem, lipidogram, tarczycę. Wszystko wychodziło w normie (i to w tej funkcjonalnej, nie tylko laboratoryjnej, która czasami bywa myląca). Jako osoba wysportowana i mocno trzymająca określoną dietę, szybko doszedłem do wniosku, że ta tajemnicza przyczyna wybudzeń musi mieć podłoże genetyczne. Nigdy nie wypaliłem nawet jednego papierosa, alkohol ostatni raz piłem 3 lata temu, sport uprawiam na wysokim poziomie od 20 lat, pilnuję długości snu - to po prostu musiało być coś, co ujawniło się właśnie teraz. W tym miejscu wkracza najgorszy przeciwnik w całej tej historii: lęk. Zacząłem się bać chodzić spać. Lęk towarzyszył mi już w ciągu dnia, na początku niewielki, ale im bliżej było nocy, tym stawał się silniejszy. Gdy wchodziłem do sypialni pojawiał się lęk, łóżko kojarzyło mi się z czymś przerażającym. To z kolei pogłębiło moje problemy - zasypianie zaczęło zajmować mi od 1 do 2 godzin, podczas gdy wcześniej usypiałem w 10-15 minut (czasami nieco dłużej, gdy coś mocno analizowałem). Wpadłem w błędne koło lęku przed snem, czego wynikiem były 3 nieprzespane noce z rzędu. Nawet jak udało mi się usnąć, to za chwilę się wybudzałem i znów nie potrafiłem zasnąć.`,
        `Po trzeciej nieprzespanej nocy zapisałem się do psychiatry „na już”. Był weekend, więc musiałem zdecydować się na konsultację online. Znalazłem specjalistę od zaburzeń snu i lęków. Wartość terapeutyczna tej wizyty była żadna, co mocno mnie uderzyło, bo był to mój pierwszy kontakt z psychiatrią. Dowiedziałem się, że 1/3 tabletki Trittico to za mało i mam brać całą, a dodatkowo przepisano mi Egzystę (2 tabletki po 75 mg, rano i wieczorem). Trittico miało pomóc zasnąć i utrzymać sen, a Egzysta działać przeciwlękowo. Wejście w tematy psychologiczne rzuciło nowe podejrzenia: czy problemy ze snem nie są spowodowane początkami depresji? Nie umiałem tego ustalić. Czy to ukryte lęki wywołały bezsenność, czy bezsenność lęki? Co było pierwsze? Ogromnie mnie to męczyło, frustrowało i martwiło, że nie potrafię określić przyczyny. Nie mogłem wręcz uwierzyć, że praktycznie z dnia na dzień znalazłem się w takiej sytuacji - przecież chwilę wcześniej wszystko było w porządku.`,
      ],
    },
    {
      type: "tile",
      title: "Zredukowanie treningów",
      paragraphs: [
        `W momencie gdzie jeszcze szamotałem się bez konkretnego pomysłu i kierunku, co jakiś czas wpadałem na strzęp informacji dotyczące rozregulowanego układu nerwowego. Według mnie przyczyna musiała być organiczna i namacalna, więc szybko natrafiłem na pojęcia Overtraining syndrome - OTS (Zespół przetrenowania). Jest to stan skrajnego wyczerpania organizmu wywołany zbyt intensywnymi treningami przy niewystarczającej regeneracji, mogą być jego różne nasilenia, a jednym z jego objawów jest bezsenność. Był to powód dlaczego zredukowałem jednostki treningowe.`,
      ],
    },
    {
      type: "text",
      paragraphs: [
        `Leki jednak pomogły. Po wzięciu Trittico nie czułem jakiejś super senności, ale twarz mi „stężała”, zasychało mi w gardle i zacząłem w nocy chrapać. Po zwiększeniu dawki i dodaniu Egzysty na jakiś czas nastąpiła poprawa. Nadal nie było idealnie, ale zasypiałem w miarę szybko, a po wybudzeniu potrafiłem ponownie usnąć w 15-20 minut. Na dwa tygodnie odpuściłem temat, ale szybko byłem zmuszony do niego wrócić, bo dokładnie tyle trwała poprawa. Powróciły trudności z zasypianiem, wybudzenia i spotęgowany lęk, do którego doszły myśli, że „nawet leki mi nie pomagają”. Ta myśl przerażała mnie najbardziej - że kończą mi się opcje (wiedziałem o silniejszych lekach nasennych, ale nie chciałem ich brać i nie uważałem ich za rozwiązanie).`,
        `Zacząłem mieć nocne ataki paniki tuż po wybudzeniu. Zrywałem się z łóżka, by przekierować uwagę na coś innego, chciałem też stosować się do zasad CBT-I (zdążyłem już się o tym dowiedzieć), czyli ograniczyć czuwanie w łóżku. Zaliczyłem kolejne dwie nieprzespane noce. Gdy było ze mną źle, znowu zwróciłem się do psychiatry. Po krótkim opisie sytuacji i przyznaniu, że byłem bliski wezwania karetki (nie z powodu tętna, ale chciałem prosić o pomoc po kolejnej nieprzespanej nocy), lekarz przepisał mi lek z grupy SSRI - fluoksetynę 20 mg, która miała zadziałać na obsesyjne myśli. Wycofaliśmy Trittico, a w jego miejsce jako środek ułatwiający sen dostałem Ketrel (1 tabletka). Egzysta pozostała bez zmian.`,
        `Tuż po wzięciu Ketrelu odczucia były bardzo podobne jak przy Trittico: poczucie ciężkości i tężejąca twarz. Brakowało mi tej przyjemnej, naturalnej senności. Obawiałem się, że to nic nie da, bo po etykiecie „środka nasennego” (mimo że Ketrel typowym lekiem nasennym nie jest) oczekuje się po prostu spania. Mimo wszystko w jakiś sposób wyciszał on mój układ nerwowy, bo ostatecznie udawało mi się usnąć. Nadal zasypiałem po 1-2 godzinach i wciąż się wybudzałem, ale miało to miejsce później (np. po 4-5 godzinach, a nie po 2) i łatwiej mi było ponownie zasnąć.`,
      ],
    },
    {
      type: "tile",
      title: "Oura Ring",
      paragraphs: [
        `Mniej więcej w tym czase zdecydowałem się zrealizować zakup, który już dawniej chodził mi po głowie, z tą różnicą że teraz było mi to potrzebne do faktycznego kontrolowania wybudzeń i zasypiania, bym mógł dokładnie wiedzieć kiedy i ile oraz żeby nie słyszeć tekstów pod tytułem “Ty śpisz, tylko o tym nie wiesz”.`,
        `Zakup okazał się strzałem w 10, a z perspektywy czasu oceniłbym go jeszcze wyżej. Sprawdziło się to jako narzędzie diagnostyczne oraz cenne źródło informacji, nie tylko o śnie, ale również o HRV, tętnie spoczynkowym, oddechu i temperaturze.`,
      ],
    },
    {
      type: "text",
      paragraphs: [
        `Pierwszej nocy po Ketrelu wpadłem w panikę po dwóch godzinach prób zaśnięcia. Znów doszedłem do wniosku, że nie ma dla mnie ratunku i to się źle skończy. Mimo potężnego lęku i wewnętrznej rozpaczy, udało mi się zasnąć. Kolejnych nocy miałem nadzieję, że będzie lepiej, wiedziałem, że SSRI potrzebują czasu by zaczęło działać. W nocy walczyłem z bezsennością i atakami paniki, a w dzień - od samego przebudzenia - z ogarniającym mnie lękiem, który rósł z każdą godziną przybliżającą mnie do wieczora. Bałem się, że wpadłem w depresję. Zrezygnowałem z czynności, które wcześniej sprawiały mi przyjemność, straciłem zainteresowanie wszystkim poza tematem snu. W pracy miałem akurat bardzo luźny okres (byłem po wdrożeniu projektu, więc nastał czas spokoju, a od lat pracuję zdalnie). Z jednej strony sprzyjało to poszukiwaniom, a z drugiej dawało za dużo przestrzeni na analizowanie wszystkiego po sto razy.`,
        `Pojawiły się lęki separacyjne związane z rozłąką z partnerką. W domu cały czas potrzebowałem jej towarzystwa, chodziłem za nią jak piesek. Jej obecność wpływała na mnie kojąco, czułem się bezpieczniej. Gdy nie było jej w domu, czułem się znacznie gorzej, paraliżował mnie lęk i potrzebowałem kogoś obok. Ta potrzeba dotyczyła również przyjaciół. Dużo z nimi pisałem i rozmawiałem. Miałem to szczęście, że okazali mi wsparcie i poświęcali mnóstwo czasu na rozmowy. Byli jak filtr odsiewający to, co podpowiadały mi lęki, od rzeczywistości. Te rozmowy miały gigantyczną moc terapeutyczną. Lęk dawał o sobie znać także w tłumie. Będąc między ludźmi, z jednej strony czułem się bezpieczniej, ale z drugiej nachodziły mnie ponure refleksje. Patrzyłem na ludzi na około i zastanawiałem się, czy ktoś z nich przeżywa to co ja? Czy też mają poczucie, że to już koniec, że nie ma ratunku, że niedługo oszaleją albo umrą? Zazdrościłem tym, którzy wyglądali na szczęśliwych. Analizowałem w ten sposób każdą mijaną osobę.`,
      ],
    },
    {
      type: "tile",
      title: "Kto nie śpi?",
      paragraphs: [
        `Po mimo obecności mojej partnerki i bliskich, przy ciągłym poczuciu osamotnienia w moim problemie, szczególnie w momentach kiedy wstawałem z łóżka w samym środku nocy, gdy nie było bliskich i przyjaciół, gdzie każdy zdrowy człowiek śpi, próbowałem się wesprzeć myślą że przecież są osoby, które teraz nie śpią.`,
        `Myślałem wtedy o innych, którzy mają problemy ze snem, patrzyłem czasem za okno w poszukiwaniu czy ktoś nie idzie przez ulice albo gdzieś nie pali się światło. Czasem wybiegałem myślą na drugą stronę świata i myślałem że gdzieś już jest rano i wszyscy dopiero szykują się do rozpoczęcia dnia.`,
      ],
    },
    {
      type: "text",
      paragraphs: [
        `Takie myśli pojawiały się na każdym kroku, wszędzie, nawet w scenach serialu, dostrzegałem jakąś ponurą stronę. Gdy w telewizji przewijał się wątek snu, od razu to wyłapywałem. Zauważyłem, że analizowanie i szukanie nowych badań do wykonania niespecjalnie mi służy, zwłaszcza przy takim poziomie lęku. Z jednej strony dostarczało mi to jakiejś wiedzy (a analizowałem temat naprawdę grubo), ale z drugiej - natrafienie na bodziec uruchamiający mój lęk działało skrajnie destruktywnie. Najbardziej zapadły mi w pamięć dwie sytuacje, które spowodowały mocne tąpnięcie mojego stanu. Pierwszy raz zdarzyło się to, gdy w trakcie poszukiwań przyczyn, po nitce do kłębka, trafiłem na stwardnienie rozsiane. Zapaliła mi się w głowie wielka czerwona lampka. Wygooglowałem to, szukając wytłumaczenia dla mojego nowego objawu: pogorszenia wzroku. Nie było to znaczne pogorszenie, podwójne widzenie czy zanik pola widzenia, po prostu delikatnie rozmazywały mi się napisy.`,
        `Wyłapywanie najdrobniejszych zmian w moim ciele było wtedy wyostrzone do maksimum. Sterowany przez lęk, każdą zmianę interpretowałem jako chorobę, i to od razu tę najgorszą, nieuleczalną i śmiertelną. Mój mózg automatycznie odrzucał zwykłe wytłumaczenia. Po przeczytaniu o stwardnieniu rozsianym od razu zacząłem zauważać u siebie inne objawy. W nocy drętwiały mi palce - dokładnie w ten sposób, jak to opisano w artykule. Miałem lekkie zawroty głowy przy szybszych ruchach. Do tego doszły koronne argumenty: drżenie rąk i ten nieszczęsny wzrok, którego nie potrafiłem logicznie uzasadnić. Próbowałem co prawda tłumaczyć sobie, że dużo pracuję przed ekranem (noszę okulary korekcyjne do komputera), że to może przez leki, niewyspanie czy nerwy, ale to nie pomagało. Zacząłem robić codzienne testy pamięci, czasu reakcji i koordynacji ręka-oko w dostępnych aplikacjach online.`,
        `Prowadziłem swoisty dziennik testów ciśnienia i pulsu, zestawiając wyniki z ilością przespanego czasu, by sprawdzić korelacje. Mimo że testy nie potwierdzały moich obaw, nie uspokajało mnie to. Pewnego dnia po gorszej nocy i zdrętwiałej ręce, obudziłem się z absolutnym przekonaniem, że mam stwardnienie rozsiane. Naprawdę w to uwierzyłem. Zastanawiałem się w głowie, jak powiem o tym rodzicom i partnerce, bałem się, jak to wpłynie na ich życie. Znowu poczułem dno i rozpacz. Jeszcze tego samego dnia, pod wpływem impulsu, byłem w drodze do innej pani neurolog. Moja partnerka była sceptyczna - była przekonana, że nic mi nie jest, ale wsparła mnie, prosząc jedynie o obietnicę, że to ostatnia „dziwna” rzecz, którą sprawdzam pod wpływem lęków. Jej reakcja działała kojąco, bo weryfikowała moje wymysły trzeźwym umysłem, podnosiło mnie na duchu to, że nie widziałem w niej paniki. W gabinecie ponownie opisałem swoją historię. Przeszedłem podstawowe badanie neurologiczne, które na tamten czas wydawało mi się „śmieszne”: sprawdzanie odruchów, ruchu gałek ocznych, równowagi itd.`,
      ],
    },
    {
      type: "tile",
      title: "Diagnostyka",
      paragraphs: [
        `W ramach badań, które miałby mnie uspokoić poprzez zweryfikowanie mojego stanu zdrowia i potwierdzić, że faktycznie nic mi nie jest na poziomie ogranicznym, kilka razy wykonałem badania związane z pracą serca. Wykonywałem EKG i podstawowe badania u lekarza internisty, powtórzyłem takie same badania u kardiologa oraz wykonałem badanie holterem 24h.`,
        `Oprócz tego byłem u okulisty, który skierował mnie na badanie dna oka oraz potwierdził że z przyczyn nerwicowych, wzrok również może się pogarszać, a ponadto mogą mieć na to wpływ leki SSRI.`,
      ],
    },
    {
      type: "text",
      paragraphs: [
        `Ponownie usłyszałem, że nic mi nie jest. „Neurologicznie nic panu nie dolega” - lekarka stanowczo podkreśliła, że szukam w złym obszarze i potrzebuję psychiatry lub psychoterapeuty. Powiedziała też, że leki SSRI potrzebują więcej czasu, by zadziałać. Rzuciła zdanie, że muszę „rozmawiać ze sobą”, co bardzo zapadło mi w pamięć, a po czasie okazało się niezwykle trafną radą. Oczywiście próbowałem podważyć diagnozę - no bo jak nerwica lękowa może pogorszyć wzrok? Lekarka cierpliwie mi wytłumaczyła, że przy zaburzeniach lękowych układ nerwowy jest całkowicie rozstrojony, a objawy bywają bardzo zróżnicowane i zaburzenia widzenia doskonale się w to wpisują. Zapytałem wprost o stwardnienie rozsiane. Odparła, że właśnie miała mnie o to zapytać - czy przypadkiem sam go sobie nie zdiagnozowałem „jak wszyscy nerwicowcy” - ale nie chciała mi podsuwać tej myśli. Zapewniła, że jestem zdrowy, a gdyby miała jakiekolwiek wątpliwości, skierowałaby mnie na badania. Ta wizyta dała mi nową broń: miałem już opinię dwóch neurologów mówiących, że problem leży w psychice.`,
        `Mimo to, po jakimś czasie znowu usilnie odmawiałem przyjęcia tego do wiadomości i wymyśliłem, że muszę ostatecznie zrobić rezonans magnetyczny mózgu. Nie było wolnych terminów, więc odbyliśmy konsultację telefoniczną (to już moja trzecia wizyta neurologiczna). Efekt ten sam: lekarka nie widziała przesłanek do MRI i skierowała mnie na wizytę stacjonarną. Poszedłem więc na czwartą wizytę, z niecnym planem wyłudzenia skierowania na MRI. Próbowałem wręcz przemilczeć kwestię lęków, skupiając się na objawach fizycznych. Nowa pani doktor przeprowadziła kolejne testy, ale wynik był ten sam: brak przesłanek, jest pan zdrowy. Zleciła jedynie próbę tężyczkową, z której wynikiem wiązałem ogromne nadzieje na znalezienie fizycznej przyczyny problemu - wynik negatywny.`,
        `Drugie potężne tąpnięcie przydarzyło mi się podczas sprawdzania uwarunkowań genetycznych. Szukałem informacji, czy możliwe jest, by jakiś „ułomny sen” włączył się z wiekiem (w wieku 33 lat). Wpisałem objawy w Google i trafiłem na wielki napis Fatal Familial Insomnia (Śmiertelna bezsenność rodzinna). Lęk od razu chwycił mnie za gardło, dostałem natychmiastowego ataku paniki. Zacząłem analizować drzewo genealogiczne - tak, jebane drzewo genealogiczne - sprawdzając długość życia dziadków i pradziadków. Dzwoniłem do rodziców, delikatnie podpytując o ich sen i ich rodziców. Z pomocą przyszła moja przyjaciółka, która od razu obnażyła największy błąd w moim myśleniu: to ekstremalnie rzadka choroba genetyczna, która w Polsce nie wystąpiła ani razu, a na świecie odnotowano kilkadziesiąt przypadków, głównie we Włoszech. Poczułem się głupio - i całe szczęście. Znów zostałem sprowadzony na ziemię przez bliskich, co tylko pokazuje, jak bezcenne w takich chwilach jest wsparcie.`,
      ],
    },
    {
      type: "tile",
      title: "Siła przekazu",
      paragraphs: [
        `Poniżej opisuje moment, w którym jeden “głupi” podcast, zupełnie zmienił tok mojego rozumowania. Sam nie mogę w to uwierzyć, jaką siłe potrafi zawierać taki rodzaj przekazu, tym bardziej że nigdy nie byłem fanem podcast’ów. Myślę że dobry podcast, odpowiednim momencie potrafi połączyć fakty z osobistym doświadczeniem i nadać im sens. Właśnie w tym tkwi jego siła: zmienia perspektywę i zostaje z odbiorcą na dłużej. Od tamtego czasu regularnie poszerzam swoją wiedzę, starannie dobranymi materiałami.`,
      ],
    },
    {
      type: "text",
      paragraphs: [
        `Mniej więcej w tym samym czasie trafiłem na polecony przez przyjaciółkę podcast dotyczący snu. Prowadził go psychoterapeuta faktycznie specjalizujący się w tym obszarze (co nie jest regułą, bo wielu wpisuje sobie tę specjalizację, nie mając o niej pojęcia). Podcast zadziałał na mnie bardzo terapeutycznie. Po raz pierwszy połączyłem kropki - to, co usłyszałem, idealnie spinało się z diagnozą od pań neurolog: problem leżał w głowie i przeciążonym układzie nerwowym. Zaczynało do mnie docierać, że mój styl życia z ostatnich lat, a zwłaszcza z ostatnich miesięcy, mógł mieć wpływ na mój obecny stan. Bardzo ciężko było mi to przełknąć, bo jestem pragmatyczny, twardo stąpam po ziemi i potrzebuję twardych dowodów. Zawsze bagatelizowałem siłę relaksacji, zarządzania stresem, prawdziwego odpoczynku i dbania o siebie i ogólnie, całej tej psychologii.`,
        `O ironio - ja, trener personalny, weteran siłowni, ekspert od diety i zdrowego trybu życia, sam NIE DBAŁEM O SIEBIE. Dopiero teraz dostrzegłem, że wyzwania ostatnich miesięcy wcale nie były takie lekkie i zwyczajne. W kwestii fizycznej zrozumiałem powagę błędów, które popełniałem od lat: nadwyrężyłem organizm na treningach, nie dając mu odpowiedniej regeneracji. Trenowałem z intensywnością zawodowca, ale nie regenerowałem się jak zawodowiec. Tej nocy poczułem gigantyczną ulgę. Choć mój wewnętrzny analityk wiedział, że to nie jest natychmiastowe uzdrowienie, to sen faktycznie przyszedł szybko, a wybudzenia były łagodne. To dowiodło mi jednego: skoro lęk opadł po prostu dzięki nowemu spojrzeniu na sytuację, to problem na 100% tkwi w głowie.`,
        `Zacząłem terapię poznawczo-behawioralną CBT-I u poleconej specjalistki, pani Moniki. Miałem nadzieję, ale byłem też sceptyczny - nie wiedziałem, czego nowego miałbym się tam dowiedzieć. Zaufałem jednak procesowi. Zacząłem prowadzić dziennik snu i nastroju. Zbudowałem własny rytuał wyciszenia przed snem. Obejmuje on m.in. medytację tuż przed zaśnięciem, przygaszone światła, wyłączenie ekranów oraz odcięcie się od intensywnych bodźców, zaplanowanie ostatniego posiłku i nawodnienia, brak wymagających treningów. Uzupełniłem go także o nawyk czytania książki przed medytacją. Jako że już dawniej zrezygnowałem z siłowni, w dzień zacząłem wyrabiać normę 7.5 tysiąca kroków w ramach innej aktywności fizycznej, również całkowicie zrezygnowałem z picia kawy, nawet rano.`,
      ],
    },
    {
      type: "tile",
      title: "Lęki",
      paragraphs: [
        `Podczas terapii z psychoterapeutką, obok bezsenności, która pozostawała głównym tematem, pojawił się również wątek lęku, szybko okazując się nieodzowny. W moim przypadku dość szybko zidentyfikowaliśmy silny lęk o zdrowie, dlatego równolegle zaczęliśmy pracę nad narzędziami i metodami radzenia sobie z nim.`,
        `Na tamtym etapie wszystko wskazywało na to, że „mam w sobie lęki”, jednak to nie one wywołały bezsenność, a raczej bezsenność uruchomiła i nasiliła lęk.`,
      ],
    },
    {
      type: "text",
      paragraphs: [
        `W grudniu 2026 po raz pierwszy poczułem lekką stabilizację. Poprawiło się moje nastawienie, dzięki czemu lęki zmalały, a czas zasypiania wrócił do 30 minut. Nowe poczucie pewności siebie pozwoliło mi odstawić Ketrel. Mimo lekkiego tąpnięcia zaraz po odstawieniu, zasypianie w 30 minut znów wróciło. Po ketrel nigdy więcej nie sięgnąłem. Jakiś czas później odstawiłem również jedną tabletkę Egzysty, zostawiając sobie tylko 75 mg na wieczór.`,
      ],
    },
    {
      type: "tile",
      title: "Kolejny psychiatra",
      paragraphs: [
        `Tydzień po odstawieniu ketrelu, trafiłem do nowej Pani psychiatry. Było to podyktowane chęcią weryfikacji poprzedniej konsultacji i wybranego leczenia - Ketrel, egzysta, fluoksetyna - oraz tym że Pani psychiatra na którą trafiłem, profilem idealnie wpasowała się w temat bezsenności i lęków. Oprócz tego chciałem ustalić dalszy plan odstawiania leków, które jak już wiedziałem, należy odstawiać powoli i w odpowiedniej kolejności.`,
        `Psychiatra na ktrórą trafiłem okazała się doskonałym wyborem - wizyta przypominała terapie, zostałem wysłuchany, a całośc trwała prawie 1.5 godziny. Nie był to lekarz, który tylko wypisuje recepte.`,
      ],
    },
    {
      type: "text",
      paragraphs: [
        `Na początku stycznia, wciąż trzymając się wypracowanych metod, próbowałem zejść z ostatniej dawki Egzysty. Zrobiłem to chyba zbyt szybko, bo pojawił się silny efekt odstawienny i mocne pogorszenie jakości snu. Znowu zacząłem wybudzać się w środku nocy (po 3,5-4,5 godzinach snu) i nie potrafiłem ponownie zasnąć. Wróciłem do dawki 75 mg i po konsultacji z terapeutką, zacząłem stosować jedną z zasad CBT-I: wychodzenie z łóżka. Gdy nie udawało mi się zasnąć przez ok. 15-20 minut, wstawałem, by zająć się czymś nudnym przy słabym świetle - czytałem książkę, układałem puzzle, słuchałem spokojnej muzyki lub podcastu. Miałem też wyznaczone restrykcyjne „okno snu” między 1:00 a 8:30. Niezależnie od tego, jak spałem, o 8:30 zaczynałem dzień. Metoda wychodzenia z łóżka trwała u mnie 1-2 tygodnie, mój sen przypominał sen dwufazowy. Nigdy nie odsypiałem w ciągu dnia. Zresztą miałem wrażenie, że w ogóle straciłem umiejętność drzemania, co mnie martwiło, bo wydawało mi się, że po nieprzespanej nocy powinienem być ekstremalnie senny - a nie byłem.`,
      ],
    },
    {
      type: "tile",
      title: "Natural short sleeper",
      paragraphs: [
        `Był to moment, w którym bardzo obszernie edukowałem się w temacie “Short sleepers” - ludzie, którzy potrzebują jedynie 4–6 godzin snu na dobę, aby czuć się w pełni wypoczętymi, nie doświadczając negatywnych skutków niedoboru snu w ciągu dnia. Dawało mi to nadzieje, że może to jest właśnie mój przypadek, mimo że miał w ręcę pewne argumenty, które o tym przeczyły.`,
        `Mimo to sporo rzeczy się zgadzały, a dodatkowo dawało mi to pewne ukojenie i nadzieje, coś czego mogłem się złapać żeby nie utonąć.`,
      ],
    },
    {
      type: "text",
      paragraphs: [
        `Do tych metod dołączyłem celowaną suplementację. Wcześniej brałem standardowo Omega 3, D3, magnez i cynk. Teraz eksperymentowałem z różnymi formami magnezu i popularnymi kompleksami snu (jak „Sleep Power”). Choć nie był to natychmiastowy przełom, to w połączeniu ze wszystkimi innymi czynnikami, te długie wybudzenia uległy znacznemu skróceniu do maksymalnie 20 minut. Luty wspominam jako pierwszy naprawdę dobry miesiąc. Czułem, że wracam do życia, wróciła mi ochota na małe przyjemności, znówu grałem na PC, oglądałem seriale, słuchałem muzyki. Przestałem maniakalnie szukać odpowiedzi na pytanie „Dlaczego?” - mimo że nadal nie znałem jednoznacznej odpowiedzi i wciąż zdarzały się gorsze noce czy psychosomatyczne drżenia rąk, nauczyłem się hamować destruktywne zachowania: przestałem szukać objawów w Google, pisać w głowie czarne scenariusze, analizować wszystko po sto razy.`,
        `Jakiś czas później, zrezygnowałem z kompleksu „Sleep Power” i wprowadziłem nową, celowaną pode mnie suplementację. Oparłem ją na glicynianie magnezu, cynku, GABA, tryptofanie, ashwagandzie i melatoninie. Wieczorem piłem napar z ziół (melisa, męczennica, rumianek) z dodatkiem glicyny. Połączenie higieny snu, suplementacji, systematyczności i czasu przyniosło wspaniałe efekty. Podczas wieczornego wyciszania i medytacji naturalnie pojawiał się stan głębokiej relaksacji, a czasem nawet czysta senność. Zdarzało się, że przysypiałem już w trakcie medytacji, więc czasem musiałem ją po prostu pomijać i od razu iść prosto do łóżka.`,
      ],
    },
    {
      type: "tile",
      title: "Polisomnografia",
      paragraphs: [
        `Wykonałem również badanie polisomnograficzne. Trafiłem do kliniki zajmującej się bezdechem sennym, jednak już na samym początku trafiły do mnie pierwsze przesłanki, że raczej nie będzie to miarodajna diagnostyka. Badanie jest wykonywane w ciężkich warunkach jeśli chodzi o prawdopodobieństwo uzyskania odpowiedniej próbki snu. Oprócz tego że urządzenie jest rozlokowane na całym ciele, praktycznie uniemożliwiając obrócenie się chociazby na bok, to jest uruchomiane o 21 30, nie zależnie od zwyczajowej pory snu pacjenta. Wyłączane jest zaś o 6 AM, więc jeśli ktoś nie uśnie na czas, to badanie będzie nieważne.`,
      ],
    },
    {
      type: "text",
      paragraphs: [
        `Pod koniec marca czułem się na tyle pewnie, że zaplanowaliśmy z partnerką tygodniowe wakacje. Dla mnie to był ogromny krok. Obawiałem się lotu, obcego miejsca i zburzenia moich misternie wypracowanych rytuałów. Zaliczyłem tąpnięcie już pierwszej nocy przed wylotem - pierwszy raz od wielu tygodni, zasypiałem przez 2 godziny. Dla człowieka niemającego problemów ze snem to nic nadzwyczajnego - zdarza się, dla mnie była to prawdziwa tragedia. Gdy wylądowaliśmy, znów wezbrały lęki, w tym dziwna odmiana lęku separacyjnego. Uruchomiłem jednak autoterapię, racjonalizując wszystko i przypominając sobie zdobytą wiedzę. Zastosowałem wyuczone techniki, uspokoiłem głowę. W efekcie, pierwszej nocy na wyjeździe zasnąłem po 15 minutach. Przebudziłem się, jak zawsze, ale było to jedno, krótkie przebudzenie na przewrócenie się na drugi bok. Wstałem z doskonałym humorem. Wakacyjny sen okazał się ostatecznie rewelacyjnej jakości - lepszy niż nawet najlepsze noce sprzed wyjazdu. Podczas pobytu nie miałem ani jednej gorszej nocy.`,
      ],
    },
    {
      type: "tile",
      title: "Siła odpoczynku",
      paragraphs: [
        `Boleśnie się przekonałem, że regeneracja i odpoczynek, to nie nagroda za wykonaną pracę, ani luksus dla nielicznych, nie jest to też coś coś opcjonalnego. To absolutny fundament, który wymaga od nas umiejętności, których na żadnym etapie życia i edukacji nie są w nas kształowane.`,
        `Dla tych, którzy nie wierzą że narzędzia służące relaksacji - medytacja, kontrolowany oddech, zarządzanie stresem, planowanie odpoczynku, “work-life balance” są w stanie coś zmienić, mam dobrą wiadomość - są w stanie zmienić dużo - tylko potrzebujesz nad tym trochę popracować. Dobra wiadomość jest taka, że skoro jest to umiejętność, to możesz ją rozwijać i trenować.`,
        `Nie schudniesz od jednej zdrowego posiłku, ani nie zbudujesz sylwetki po jednym treningu. Tutaj sprawdza się dokładnie ta sama zasada - sen nie przyjdzie po 15 minutach medytacji czy po jednym dniu odpoczynku.`,
      ],
    },
    {
      type: "text",
      paragraphs: [
        `Wróciłem do Polski z fantastycznym nastawieniem. Przeszedłem potężny test, którego tak bardzo się obawiałem. Do mojego arsenału autoterapii dołączył silny, niepodważalny argument świadczący o tym, że mój sen i organizm wracają na właściwe tory. Po powrocie rozpocząłem zaplanowane wcześniej schodzenie z leków (zmniejszyłem dawkę fluoksetyny z 20 mg na 10 mg) i nie odczułem przy tym żadnych efektów odstawiennych. W kwietniu, dosłownie z dnia na dzień, czułem, jak narasta we mnie siła i chęć do życia. Tym razem nie chodziło już tylko o rozrywkę - nabrałem ochoty na powrót do samorozwoju i realizację moich dalekosiężnych celów. Stałem się bardziej obecny w pracy, podjąłem prywatne projekty. Musiałem wręcz hamować swój zapał, pamiętając ten najczarniejszy okres w moim życiu. Bogatszy o nową wiedzę, obiecałem sobie, że już nigdy nie wpadnę w ciąg pracoholizmu i zarzynania się na treningach - że znajdę złoty środek.`,
        `Wyjazd na wakacje pełnił zresztą niezwykle ważną funkcję - pokazał mi siłę prawdziwego odpoczynku. Może brzmi to banalnie, ale to były moje pierwsze prawdziwe wakacje od 10 lat. Nauczenie się odpoczynku i dbanie o regenerację to mój kolejny fundament zapobiegający bezsenności. Zaczęły pojawiać się u mnie noce, po których nie potrafię nawet stwierdzić, czy w ogóle się wybudzałem. Przywiązuję do tego coraz mniejszą wagę. Mam wrażenie, że to kolejny etap leczenia bezsenności. Cały ten proces trwa bardzo długo i dzieje się powoli, na wielu płaszczyznach.`,
        `To pewnie jest powód, dla którego tak wiele osób (w tym jeszcze niedawno ja sam) nie pokłada od razu nadziei w rozwiązaniach takich jak: terapia, medytacja, higiena snu, zarządzanie stresem i prawdziwy odpoczynek, styl życia, aktywność fizyczna, dieta, suplementacja. To metody złożone, długoterminowe i „mało seksowne”, bo pozbawione natychmiastowego efektu. Wymagają jednak najważniejszego: ogromnej pracy, czasu, systematyczności, wiedzy oraz zaufania - zarówno do samego procesu, jak i do siebie.`,
      ],
    },
  ],
} satisfies {
  title: string;
  lead: string;
  blocks: StoryBlock[];
};
