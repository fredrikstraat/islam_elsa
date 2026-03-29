export const gradingRubric = {
  STRONG:
    "Säkert svar. Eleven får med det viktigaste och förklarar tydligt med ord ur materialet.",
  PARTLY:
    "På väg. Eleven har fått tag i huvudidén men en viktig del saknas eller är otydlig.",
  NEEDS_WORK:
    "Öva lite till. Svaret är för tunt, saknar viktiga delar eller blandar ihop religionerna."
};

export const studySections = [
  {
    id: "common",
    title: "Likheter mellan religionerna",
    summary: [
      "Judendom, kristendom och islam är tre abrahamitiska religioner.",
      "Alla tre religionerna tror på en Gud.",
      "Alla tre har heliga skrifter, heliga byggnader och viktiga högtider.",
      "Det finns både likheter och tydliga skillnader som är viktiga att kunna jämföra."
    ]
  },
  {
    id: "books-people",
    title: "Personer, symboler och skrifter",
    summary: [
      "Judendomen har Tanakh eller Tora, kristendomen har Bibeln och islam har Koranen.",
      "Judendomen ser Abraham som stamfader.",
      "Kristendomen säger att Jesus är Messias, men judendomen accepterar inte Jesus som Messias.",
      "Islam beskriver Muhammed som Guds budbärare och Koranen som uppenbarelser från Gud genom ängeln Gabriel.",
      "Davidsstjärnan och menoran hör till judendomen, och korset hör till kristendomen."
    ]
  },
  {
    id: "practice",
    title: "Vardag, regler och gudstjänst",
    summary: [
      "Judendomen samlas i synagogan, kristendomen i kyrkan och islam i moskén.",
      "Sabbaten i judendomen är från fredag kväll till lördag kväll.",
      "Kristna har ofta gudstjänst på söndagar.",
      "Inom islam är fredagens middagsbön extra viktig, och bönen gör man fem gånger per dag.",
      "Judendom och islam har tydliga matregler, medan kristendomen inte har lika detaljerade regler i texten."
    ]
  },
  {
    id: "holidays-life",
    title: "Högtider, riter och livet efter döden",
    summary: [
      "Pesach är en judisk högtid som firas till minne av uttåget ur Egypten.",
      "Jul och påsk är viktiga kristna högtider.",
      "Eid al-fitr och eid al-adha är viktiga muslimska högtider.",
      "Bar mitzva och bat mitzva hör till judendomen, medan dop och konfirmation hör till kristendomen.",
      "Kristendomen och islam talar tydligt om livet efter döden i faktabladen."
    ]
  }
];

export const questionBank = [
  {
    id: "same-god",
    section: "common",
    sectionLabel: "Likheter",
    level: "Bas",
    isFocus: true,
    focusLabel: "Viktigt till provet",
    prompt:
      "Vilken viktig likhet finns i synen på Gud i judendom, kristendom och islam?",
    hint: "Titta efter det som alla tre religionerna har gemensamt.",
    starter: "En viktig likhet är att ...",
    bookSupport:
      "I texterna står att alla tre religionerna tror på en enda Gud.",
    shortAnswer: "Alla tre religionerna tror på en enda Gud.",
    mustMention: ["alla tre", "en Gud"],
    goodToMention: ["likhet", "monoteistisk"],
    stretchPoints: ["använda ordet monoteistisk"]
  },
  {
    id: "holy-books",
    section: "books-people",
    sectionLabel: "Skrifter",
    level: "Mellan",
    isFocus: true,
    focusLabel: "Viktigt till provet",
    prompt:
      "Jämför de tre religionernas heliga skrifter. Vilken bok hör till vilken religion?",
    hint: "Du ska koppla rätt bok till rätt religion.",
    starter: "Judendomen har ..., kristendomen har ... och islam har ...",
    bookSupport:
      "I materialet står Tanakh eller Tora för judendom, Bibeln för kristendom och Koranen för islam.",
    shortAnswer:
      "Judendomen har Tanakh eller Tora, kristendomen har Bibeln och islam har Koranen.",
    mustMention: ["Tanakh eller Tora", "Bibeln", "Koranen"],
    goodToMention: ["helig skrift", "rätt koppling till religion"],
    stretchPoints: ["skriva alla tre i samma tydliga svar"]
  },
  {
    id: "holy-buildings",
    section: "practice",
    sectionLabel: "Gudstjänst",
    level: "Bas",
    prompt:
      "Jämför religionernas heliga byggnader. Vad heter de i judendom, kristendom och islam?",
    hint: "Det är tre olika byggnader.",
    starter: "I judendomen finns ..., i kristendomen finns ... och i islam finns ...",
    bookSupport:
      "Judendomens byggnad är synagoga, kristendomens är kyrka och islams är moské.",
    shortAnswer:
      "Judendomen har synagoga, kristendomen har kyrka och islam har moské.",
    mustMention: ["synagoga", "kyrka", "moské"],
    goodToMention: ["helig byggnad"],
    stretchPoints: ["koppla varje byggnad till rätt religion"]
  },
  {
    id: "jesus-messias",
    section: "books-people",
    sectionLabel: "Personer",
    level: "Mellan",
    isFocus: true,
    focusLabel: "Viktigt till provet",
    prompt:
      "Vad är skillnaden mellan judendom och kristendom i synen på Jesus som Messias?",
    hint: "En religion säger ja, den andra säger nej.",
    starter: "Kristendomen säger att ..., medan judendomen ...",
    bookSupport:
      "I faktabladet står att Jesus ses som Messias i kristendomen men inte accepteras som Messias av judarna.",
    shortAnswer:
      "Kristendomen säger att Jesus är Messias, men judendomen accepterar inte Jesus som Messias.",
    mustMention: ["kristendomen: Jesus är Messias", "judendomen: Jesus är inte Messias"],
    goodToMention: ["skillnad", "judendomen väntar fortfarande på Messias"],
    stretchPoints: ["skriva både likheten och skillnaden tydligt"]
  },
  {
    id: "food-rules",
    section: "practice",
    sectionLabel: "Vardag och regler",
    level: "Mellan",
    isFocus: true,
    focusLabel: "Viktigt till provet",
    prompt:
      "Varför kan man säga att judendom och islam liknar varandra mer än kristendom när det gäller matregler?",
    hint: "Titta efter vilka religioner som har tydliga regler om mat i texten.",
    starter: "Judendom och islam liknar varandra eftersom ...",
    bookSupport:
      "Judendomen har kosherregler och islam har regler om till exempel svinkött, blodmat och alkohol. Kristendomen beskrivs inte ha lika detaljerade regler.",
    shortAnswer:
      "Judendom och islam har tydliga matregler, medan kristendomen inte har lika detaljerade matregler i texten.",
    mustMention: [
      "judendom och islam har tydliga matregler",
      "kristendomen har inte lika detaljerade regler"
    ],
    goodToMention: ["kosher", "svinkött", "alkohol"],
    stretchPoints: ["ge ett konkret exempel från varje religion som nämns"]
  },
  {
    id: "week-rhythm",
    section: "practice",
    sectionLabel: "Bön och veckorytm",
    level: "Klurig",
    isFocus: true,
    focusLabel: "Viktigt till provet",
    prompt:
      "Jämför veckans viktiga dag eller bön i religionerna. Vad lyfts fram i judendom, kristendom och islam?",
    hint: "En religion har sabbat, en har söndag och en har fredagsbön.",
    starter: "I judendomen är ..., i kristendomen är ... och i islam är ...",
    bookSupport:
      "Sabbaten är viktig i judendomen, söndagens gudstjänst i kristendomen och fredagens middagsbön i islam.",
    shortAnswer:
      "I judendomen är sabbaten viktig, i kristendomen är söndagens gudstjänst viktig och i islam är fredagens middagsbön viktig.",
    mustMention: ["sabbaten", "söndag", "fredagsbön"],
    goodToMention: ["fredag kväll till lördag kväll", "gudstjänst", "bön"],
    stretchPoints: ["koppla varje dag eller bön till rätt religion"]
  },
  {
    id: "abrahamitic",
    section: "common",
    sectionLabel: "Likheter",
    level: "Bas",
    isFocus: true,
    focusLabel: "Viktigt till provet",
    prompt:
      "Varför kallar läraren judendom, kristendom och islam för de tre abrahamitiska religionerna?",
    hint: "Titta på namnet abrahamitiska.",
    starter: "De kallas abrahamitiska eftersom ...",
    bookSupport:
      "Läraren skriver att provet handlar om de tre abrahamitiska religionerna. Abraham lyfts fram som en viktig person i underlaget.",
    shortAnswer:
      "De kallas abrahamitiska eftersom de på olika sätt kopplas till Abraham.",
    mustMention: ["Abraham", "alla tre religionerna"],
    goodToMention: ["gemensam person", "kopplas till Abraham"],
    stretchPoints: ["förklara att det är en likhet mellan religionerna"]
  },
  {
    id: "muhammed-and-jesus",
    section: "books-people",
    sectionLabel: "Personer",
    level: "Klurig",
    prompt:
      "Jämför Muhammeds roll i islam med Jesu roll i kristendomen enligt texterna.",
    hint: "Vem är Guds budbärare och vem är Messias?",
    starter: "I islam är Muhammed ..., medan Jesus i kristendomen ...",
    bookSupport:
      "Muhammed kallas Guds budbärare i islam. I kristendomen ses Jesus som Messias och Guds son.",
    shortAnswer:
      "I islam är Muhammed Guds budbärare eller profet. I kristendomen är Jesus Messias och Guds son.",
    mustMention: ["Muhammed är Guds budbärare eller profet", "Jesus är Messias"],
    goodToMention: ["Guds son", "skillnad mellan religionerna"],
    stretchPoints: ["få med båda personerna tydligt"]
  },
  {
    id: "holidays-examples",
    section: "holidays-life",
    sectionLabel: "Högtider",
    level: "Mellan",
    isFocus: true,
    focusLabel: "Viktigt till provet",
    prompt:
      "Ge ett exempel på en viktig högtid i varje religion och skriv kort vad den handlar om.",
    hint: "Ta en högtid från judendom, en från kristendom och en från islam.",
    starter: "I judendomen finns ..., i kristendomen finns ... och i islam finns ...",
    bookSupport:
      "Pesach handlar om uttåget ur Egypten. Jul eller påsk är viktiga kristna högtider. Eid al-fitr firas när Ramadan är slut.",
    shortAnswer:
      "Judendomen har till exempel pesach som minns uttåget ur Egypten. Kristendomen har till exempel jul som firar Jesu födelse eller påsk som minns Jesus sista vecka och uppståndelsen. Islam har till exempel eid al-fitr som firas när Ramadan är slut.",
    mustMention: ["en judisk högtid", "en kristen högtid", "en muslimsk högtid"],
    goodToMention: ["pesach", "jul eller påsk", "eid al-fitr eller eid al-adha"],
    stretchPoints: ["skriva kort vad varje högtid firar"]
  },
  {
    id: "fasting-compare",
    section: "holidays-life",
    sectionLabel: "Högtider och fasta",
    level: "Klurig",
    prompt:
      "Hur skiljer sig fasta i islam och kristendom enligt faktabladen?",
    hint: "En religion har Ramadan. I den andra fastar en del innan påsk.",
    starter: "I islam är fastan ..., medan kristendomen ...",
    bookSupport:
      "Islam har Ramadan då man inte äter eller dricker så länge solen är uppe. I kristendomen fastar många 40 dagar innan påsk.",
    shortAnswer:
      "I islam är fastan Ramadan, en månad då man inte äter eller dricker när solen är uppe. I kristendomen fastar en del i 40 dagar innan påsk för att minnas Jesus lidande och död.",
    mustMention: ["Ramadan i islam", "40 dagar innan påsk i kristendomen eller att en del kristna fastar"],
    goodToMention: ["inte äta eller dricka på dagen", "minnas Jesus"],
    stretchPoints: ["skriva vad som är lika och vad som är olika"]
  },
  {
    id: "rites-compare",
    section: "holidays-life",
    sectionLabel: "Riter",
    level: "Mellan",
    prompt:
      "Ge exempel på en viktig rit i judendomen och en viktig rit i kristendomen.",
    hint: "Titta efter ceremonier som markerar att man hör till religionen eller blir större.",
    starter: "I judendomen finns ..., och i kristendomen finns ...",
    bookSupport:
      "Judendomen har bar mitzva och bat mitzva. Kristendomen har dop och konfirmation.",
    shortAnswer:
      "I judendomen finns bar mitzva eller bat mitzva. I kristendomen finns dop eller konfirmation.",
    mustMention: ["bar mitzva eller bat mitzva", "dop eller konfirmation"],
    goodToMention: ["rit", "religiös ceremoni"],
    stretchPoints: ["skriva kort vad ritualerna betyder"]
  },
  {
    id: "afterlife",
    section: "holidays-life",
    sectionLabel: "Livet efter döden",
    level: "Mellan",
    prompt:
      "Vilka två religioner talar tydligt om livet efter döden i faktabladen, och vad sägs det där?",
    hint: "Det står om själen och om paradiset.",
    starter: "Kristendomen säger att ..., och islam säger att ...",
    bookSupport:
      "I kristendomen står det att kroppen dör men själen lever vidare. I islam står det att den som gjort gott kommer till paradiset.",
    shortAnswer:
      "Kristendomen och islam talar tydligt om livet efter döden. Kristendomen säger att själen lever vidare, och islam säger att den som gjort gott kommer till paradiset efter domen.",
    mustMention: ["kristendomen", "islam", "själen lever vidare eller paradiset"],
    goodToMention: ["yttersta domen"],
    stretchPoints: ["skriva vad som sägs i båda religionerna"]
  },
  {
    id: "symbols",
    section: "books-people",
    sectionLabel: "Symboler",
    level: "Bas",
    prompt:
      "Vilka symboler lyfts fram i judendom och kristendom i materialet?",
    hint: "Judendomen har två symboler i texten.",
    starter: "I judendomen finns ..., och i kristendomen finns ...",
    bookSupport:
      "Davidsstjärnan och menoran hör till judendomen. Korset hör till kristendomen.",
    shortAnswer:
      "I judendomen lyfts Davidsstjärnan och menoran fram. I kristendomen lyfts korset fram.",
    mustMention: ["Davidsstjärnan eller menoran", "korset"],
    goodToMention: ["symbol"],
    stretchPoints: ["nämna båda judiska symbolerna"]
  },
  {
    id: "followers",
    section: "common",
    sectionLabel: "Begrepp",
    level: "Bas",
    prompt:
      "Vad kallas anhängarna i judendom, kristendom och islam?",
    hint: "Det är tre olika ord.",
    starter: "I judendom kallas de ..., i kristendom ... och i islam ...",
    bookSupport:
      "Judendomens anhängare är judar, kristendomens är kristna och islams är muslimer.",
    shortAnswer:
      "I judendom kallas anhängarna judar, i kristendom kristna och i islam muslimer.",
    mustMention: ["judar", "kristna", "muslimer"],
    goodToMention: ["anhängare"],
    stretchPoints: ["koppla alla tre till rätt religion"]
  },
  {
    id: "book-difference",
    section: "books-people",
    sectionLabel: "Skrifter",
    level: "Klurig",
    isFocus: true,
    focusLabel: "Viktigt till provet",
    prompt:
      "Vad är en tydlig skillnad mellan Bibeln och Koranen enligt faktabladen?",
    hint: "Titta på hur böckerna beskrivs och hur de blev till.",
    starter: "En tydlig skillnad är att Bibeln ..., medan Koranen ...",
    bookSupport:
      "Bibeln beskrivs som uppdelad i Gamla och Nya testamentet och skriven av olika personer. Koranen beskrivs som Guds uppenbarelser till Muhammed genom Gabriel och kan egentligen inte översättas.",
    shortAnswer:
      "Bibeln är uppdelad i Gamla och Nya testamentet och är skriven av olika personer. Koranen är Guds uppenbarelser till Muhammed genom Gabriel.",
    mustMention: [
      "Bibeln är GT och NT eller skriven av olika personer",
      "Koranen är uppenbarelser till Muhammed eller Guds ord"
    ],
    goodToMention: ["Gabriel", "kan inte översättas egentligen"],
    stretchPoints: ["jämföra båda böckerna tydligt i samma svar"]
  },
  {
    id: "prayer-compare",
    section: "practice",
    sectionLabel: "Bön och vardag",
    level: "Mellan",
    prompt:
      "Hur skiljer sig bönen i islam från bönen i kristendomen enligt texterna?",
    hint: "I en religion står det exakt hur ofta man ber.",
    starter: "I islam ..., medan kristendomen ...",
    bookSupport:
      "Islam har bön fem gånger per dag och man är vänd mot Mekka. I kristendomen är bön viktig men kan vara både fasta böner och fria ord.",
    shortAnswer:
      "I islam ber man fem gånger per dag och vänder sig mot Mekka. I kristendomen är bön också viktig, men den kan vara både färdig och fri och texten ger inte samma fasta antal böner.",
    mustMention: ["islam: fem gånger per dag", "kristendomen: bön är viktig men inte samma fasta antal"],
    goodToMention: ["mot Mekka", "färdiga böner och fria böner"],
    stretchPoints: ["skriva både likhet och skillnad"]
  },
  {
    id: "summary-like-and-different",
    section: "common",
    sectionLabel: "Sammanfatta",
    level: "Klurig",
    isFocus: true,
    focusLabel: "Viktigt till provet",
    prompt:
      "Ge en likhet och en skillnad mellan de tre religionerna utifrån faktabladen.",
    hint: "Du kan välja till exempel Gud, bok, byggnad, regler, högtid eller personer.",
    starter: "En likhet är att ... En skillnad är att ...",
    bookSupport:
      "Likheter som nämns är till exempel tron på en Gud. Skillnader som nämns är till exempel olika heliga skrifter, byggnader, regler och synen på Jesus.",
    shortAnswer:
      "En likhet är att alla tre tror på en Gud. En skillnad är att de har olika heliga skrifter och att kristendomen ser Jesus som Messias medan judendomen inte gör det.",
    mustMention: ["en riktig likhet", "en riktig skillnad"],
    goodToMention: ["en Gud", "olika skrifter eller byggnader eller regler", "Jesus som Messias"],
    stretchPoints: ["ge tydliga exempel på både likhet och skillnad"]
  }
];

export function getQuestionById(questionId) {
  return questionBank.find((question) => question.id === questionId) || null;
}
