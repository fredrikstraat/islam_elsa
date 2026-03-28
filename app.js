const gameModes = {
  standard: {
    id: "standard",
    name: "Likhetsjakten",
    tag: "Jämförelsebana",
    hint: "Spring genom portarna och hitta vad religionerna delar eller skiljer åt.",
    runPlan: { easy: 6, medium: 6, hard: 6 },
    textOnly: false
  },
  coach: {
    id: "coach",
    name: "AI-coachen",
    tag: "Lugn frågestund",
    hint: "En fråga i taget i ett textfält, med tydlig AI-feedback direkt efter svaret.",
    runPlan: { easy: 4, medium: 4, hard: 3 },
    textOnly: true,
    simpleChat: true
  },
  final: {
    id: "final",
    name: "Finalportalen: Tre religioner",
    tag: "Finalväg",
    hint: "Här räcker det inte att gissa. Du behöver jämföra med egna ord.",
    runPlan: { easy: 5, medium: 5, hard: 5 },
    textOnly: true
  }
};

const characterConfig = [
  {
    id: "skriftspanaren",
    name: "Skriftspanaren",
    title: "Bokletaren",
    icon: "S",
    accent: "#ff8f1f",
    description: "Håller koll på Tanakh, Bibeln och Koranen."
  },
  {
    id: "likhetsjagaren",
    name: "Likhetsjägaren",
    title: "Brobyggaren",
    icon: "L",
    accent: "#14c3c6",
    description: "Ser snabbt vad religionerna har gemensamt."
  },
  {
    id: "symbolscouten",
    name: "Symbolscouten",
    title: "Spårtolkaren",
    icon: "Y",
    accent: "#59d98e",
    description: "Fångar skillnader mellan symboler, högtider och ritualer."
  },
  {
    id: "finalvaktaren",
    name: "Finalväktaren",
    title: "Jämförelsemästaren",
    icon: "F",
    accent: "#ff5da8",
    description: "Trivs när svaren behöver vara bredare och smartare."
  }
];

const badgeConfig = [
  { id: "spawn", icon: "S", name: "Startgnista", description: "Få ditt första helt rätta svar." },
  { id: "combo", icon: "C", name: "Jämförelsecombo", description: "Få 3 rätta i rad." },
  { id: "creator", icon: "T", name: "Textspjutet", description: "Klara 3 textfrågor rätt." },
  { id: "boss", icon: "B", name: "Skillnadsspåraren", description: "Klara 2 svåra frågor rätt." },
  { id: "eid", icon: "G", name: "Gemensam Blick", description: "Klara alla frågor i kategorin Gemensamt rätt." },
  { id: "perfect", icon: "P", name: "Perfekt Runda", description: "Gå igenom hela banan utan fel." }
];

const questConfig = [
  {
    id: "three-streak",
    icon: "1",
    title: "Jämförelsecombo",
    description: "Få 3 rätta svar i rad."
  },
  {
    id: "text-pro",
    icon: "2",
    title: "Textkraft",
    description: "Klara 3 textfrågor rätt."
  },
  {
    id: "hard-mode",
    icon: "3",
    title: "Slutspurt",
    description: "Klara 2 svåra frågor rätt."
  }
];

const xpGoal = 60;

const difficultyConfig = {
  easy: {
    label: "Lätt",
    intro: "Uppvärmning",
    xpBonus: 0,
    gemBonus: 0,
    className: "easy"
  },
  medium: {
    label: "Mellan",
    intro: "Nu blir det klurigare",
    xpBonus: 4,
    gemBonus: 1,
    className: "medium"
  },
  hard: {
    label: "Svår",
    intro: "Bossfråga",
    xpBonus: 8,
    gemBonus: 2,
    className: "hard"
  }
};

const worldThemes = {
  Gemensamt: {
    name: "Rotporten",
    choiceInstruction: "Hitta det som binder religionerna samman",
    textInstruction: "Beskriv likheten tydligt för att öppna nästa port",
    mission: "Samla gemensamma drag och bygg en stabil grund för jämförelsen.",
    skyTop: "#f2b56b",
    skyBottom: "#fde8be",
    groundTop: "#c98a47",
    groundBottom: "#8a5524"
  },
  "Symboler och personer": {
    name: "Symboltorget",
    choiceInstruction: "Leta efter rätt symbol, person eller helig plats",
    textInstruction: "Jämför personerna eller symbolerna med egna ord",
    mission: "Håll isär Jesus, Messias, Davidsstjärnan, korset och andra nyckelspår.",
    skyTop: "#35608f",
    skyBottom: "#9dc6dd",
    groundTop: "#1d7f87",
    groundBottom: "#114e57"
  },
  "Heliga skrifter": {
    name: "Skriftarkivet",
    choiceInstruction: "Spring till porten med rätt bok eller rätt jämförelse",
    textInstruction: "Skriv vad som skiljer eller förenar skrifterna",
    mission: "Klara skillnaderna mellan Tanakh, Bibeln och Koranen.",
    skyTop: "#4e4c8c",
    skyBottom: "#d9c2f2",
    groundTop: "#7d68c8",
    groundBottom: "#46338b"
  },
  "Heliga byggnader": {
    name: "Bönens Gård",
    choiceInstruction: "Välj rätt byggnad eller rätt ledare för att komma vidare",
    textInstruction: "Förklara hur byggnaderna används i religionerna",
    mission: "Håll ordning på synagoga, kyrka och moské.",
    skyTop: "#578a93",
    skyBottom: "#d7efe2",
    groundTop: "#3da087",
    groundBottom: "#1c5f54"
  },
  "Högtider och veckorytm": {
    name: "Festkalendern",
    choiceInstruction: "Spring mellan veckodagar och högtidsportar",
    textInstruction: "Jämför firanden och vilodagar för att låsa upp nästa valv",
    mission: "Samla sabbat, söndag, fredag, påsk, pesach och eid i rätt mönster.",
    skyTop: "#d8904a",
    skyBottom: "#f8dfb7",
    groundTop: "#c66a36",
    groundBottom: "#8f3f1f"
  },
  "Regler och vardag": {
    name: "Vardagsvalven",
    choiceInstruction: "Ta rätt port bland matregler, böner och vardagsval",
    textInstruction: "Jämför reglerna tydligt för att passera",
    mission: "Se vad som är strängt, vad som är friare och vad som är gemensamt.",
    skyTop: "#2f4e83",
    skyBottom: "#f1d59b",
    groundTop: "#6c74bf",
    groundBottom: "#2d376d"
  },
  Livsriter: {
    name: "Livsportalen",
    choiceInstruction: "Navigera mellan dop, mitzva och andra livsritsportar",
    textInstruction: "Förklara ritualerna med egna ord",
    mission: "Träna på hur religionerna markerar viktiga steg i livet.",
    skyTop: "#8f4564",
    skyBottom: "#f5d6b7",
    groundTop: "#d96f8b",
    groundBottom: "#8f3557"
  },
  "Livet efter döden": {
    name: "Stjärnvalvet",
    choiceInstruction: "Välj porten som bäst fångar det som händer efter döden",
    textInstruction: "Formulera ett tydligt jämförelsesvar för att klara portalen",
    mission: "Här gäller det att hålla isär själ, dom och paradis utan att blanda ihop dem.",
    skyTop: "#1e2958",
    skyBottom: "#d8b77d",
    groundTop: "#6657b0",
    groundBottom: "#2b2358"
  },
  Utbredning: {
    name: "Världskartan",
    choiceInstruction: "Spring mellan portarna som visar storlek och spridning",
    textInstruction: "Jämför hur religionerna är spridda i världen",
    mission: "Samla storlek, länder och grupper utan att tappa överblicken.",
    skyTop: "#2f5f73",
    skyBottom: "#d5e6f0",
    groundTop: "#4b88a8",
    groundBottom: "#27526a"
  },
  default: {
    name: "Jämförelsebanan",
    choiceInstruction: "Välj rätt port för att fortsätta jämförelsen",
    textInstruction: "Svara med egna ord för att öppna nästa portal",
    mission: "Spring vidare genom kunskapsvärlden och jämför smart.",
    skyTop: "#d59758",
    skyBottom: "#f6dfb2",
    groundTop: "#ba7e43",
    groundBottom: "#70411f"
  }
};

const scoreRules = {
  correct: { score: 1, xp: (streak) => 14 + Math.min(streak * 2, 12), gems: (streak) => 10 + Math.max(streak - 1, 0) * 2 },
  almost: { score: 0, xp: () => 8, gems: () => 4 },
  incorrect: { score: 0, xp: () => 2, gems: () => 1 }
};

const worldConfig = {
  width: 1000,
  sceneHeight: 360,
  groundHeight: 70,
  avatarWidth: 70,
  avatarHeight: 88,
  moveSpeed: 5.2,
  jumpVelocity: 15,
  gravity: 0.9,
  interactDistance: 96
};

const elements = {
  playerName: document.querySelector("#playerName"),
  saveNameButton: document.querySelector("#saveNameButton"),
  welcomeText: document.querySelector("#welcomeText"),
  standardModeButton: document.querySelector("#standardModeButton"),
  coachModeButton: document.querySelector("#coachModeButton"),
  finalModeButton: document.querySelector("#finalModeButton"),
  modeNameTag: document.querySelector("#modeNameTag"),
  modeHint: document.querySelector("#modeHint"),
  characterGrid: document.querySelector("#characterGrid"),
  aiStatusValue: document.querySelector("#aiStatusValue"),
  aiStatusHint: document.querySelector("#aiStatusHint"),
  aiStatusPill: document.querySelector("#aiStatusPill"),
  levelValue: document.querySelector("#levelValue"),
  xpFill: document.querySelector("#xpFill"),
  xpText: document.querySelector("#xpText"),
  scoreValue: document.querySelector("#scoreValue"),
  streakValue: document.querySelector("#streakValue"),
  gemsValue: document.querySelector("#gemsValue"),
  textWinsValue: document.querySelector("#textWinsValue"),
  sidePanelToggle: document.querySelector("#sidePanelToggle"),
  questList: document.querySelector("#questList"),
  sideColumn: document.querySelector("#sideColumn"),
  progressText: document.querySelector("#progressText"),
  milestoneTrack: document.querySelector("#milestoneTrack"),
  badgeTray: document.querySelector("#badgeTray"),
  categoryPill: document.querySelector("#categoryPill"),
  questionCount: document.querySelector("#questionCount"),
  difficultyPill: document.querySelector("#difficultyPill"),
  answerModePill: document.querySelector("#answerModePill"),
  questionText: document.querySelector("#questionText"),
  stageTitle: document.querySelector("#stageTitle"),
  stageInstruction: document.querySelector("#stageInstruction"),
  worldName: document.querySelector("#worldName"),
  characterMission: document.querySelector("#characterMission"),
  obbyPanel: document.querySelector("#obbyPanel"),
  coachPanel: document.querySelector("#coachPanel"),
  coachPrompt: document.querySelector("#coachPrompt"),
  obbyScene: document.querySelector("#obbyScene"),
  platformLayer: document.querySelector("#platformLayer"),
  doorTrack: document.querySelector("#doorTrack"),
  playerAvatar: document.querySelector("#playerAvatar"),
  playerAvatarFace: document.querySelector("#playerAvatarFace"),
  playerAvatarName: document.querySelector("#playerAvatarName"),
  moveLeftButton: document.querySelector("#moveLeftButton"),
  moveRightButton: document.querySelector("#moveRightButton"),
  jumpButton: document.querySelector("#jumpButton"),
  openDoorButton: document.querySelector("#openDoorButton"),
  controlHint: document.querySelector("#controlHint"),
  choices: document.querySelector("#choices"),
  textAnswerPanel: document.querySelector("#textAnswerPanel"),
  textAnswerLabel: document.querySelector("#textAnswerLabel"),
  textAnswer: document.querySelector("#textAnswer"),
  textHelp: document.querySelector("#textHelp"),
  submitTextButton: document.querySelector("#submitTextButton"),
  feedbackBox: document.querySelector("#feedbackBox"),
  nextButton: document.querySelector("#nextButton"),
  restartTopButton: document.querySelector("#restartTopButton"),
  resultCard: document.querySelector("#resultCard"),
  resultTitle: document.querySelector("#resultTitle"),
  resultSummary: document.querySelector("#resultSummary"),
  reviewList: document.querySelector("#reviewList"),
  playAgainButton: document.querySelector("#playAgainButton"),
  sparkZone: document.querySelector("#sparkZone"),
  toast: document.querySelector("#toast")
};

let questions = [];
let state = {};
let currentMode = "standard";
let selectedCharacterId = "likhetsjagaren";
let worldLoopId = 0;
let sidePanelOpen = false;
const isTouchDevice =
  (typeof window !== "undefined" && window.matchMedia?.("(hover: none) and (pointer: coarse)")?.matches) ||
  (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);
const compactLayoutQuery =
  typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(max-width: 1100px)") : null;
let lastCompactLayout = compactLayoutQuery?.matches ?? false;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function normalizeDifficulty(value) {
  return difficultyConfig[value] ? value : "medium";
}

function getDifficultyInfo(difficulty) {
  return difficultyConfig[normalizeDifficulty(difficulty)];
}

function getCurrentMode() {
  return gameModes[currentMode] || gameModes.standard;
}

function isCoachMode() {
  return Boolean(getCurrentMode().simpleChat);
}

function getSelectedCharacter() {
  return characterConfig.find((character) => character.id === selectedCharacterId) || characterConfig[0];
}

function getWorldTheme(question) {
  if (!question) {
    return worldThemes.default;
  }
  return worldThemes[question.category] || worldThemes.default;
}

function renderCharacterGrid() {
  elements.characterGrid.innerHTML = "";
  characterConfig.forEach((character) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `character-card${character.id === selectedCharacterId ? " active" : ""}`;
    card.innerHTML = `
      <div class="character-badge" style="background:${character.accent}">${escapeHtml(character.icon)}</div>
      <strong>${escapeHtml(character.name)}</strong>
      <span>${escapeHtml(character.title)}</span>
      <span>${escapeHtml(character.description)}</span>
    `;
    card.addEventListener("click", () => setCharacter(character.id));
    elements.characterGrid.append(card);
  });
}

function updateAvatarVisual() {
  const character = getSelectedCharacter();
  elements.playerAvatarFace.textContent = character.icon;
  elements.playerAvatarFace.style.background = character.accent;
  elements.playerAvatarFace.style.boxShadow = `0 10px 18px ${character.accent}55`;
  elements.playerAvatarName.textContent = character.name;
}

function savePlayerName() {
  const safeName = elements.playerName.value.trim() || "Quizhjälte";
  elements.playerName.value = safeName;
  try {
    localStorage.setItem("religion-quiz-player-name", safeName);
  } catch (error) {
    // Ignore local storage failures so the quiz still works.
  }
  elements.welcomeText.textContent = `Välkommen, ${safeName}!`;
  showToast(`Namnskylten är sparad för ${safeName}.`);
}

function loadPlayerName() {
  try {
    const saved = localStorage.getItem("religion-quiz-player-name");
    if (saved) {
      elements.playerName.value = saved;
      elements.welcomeText.textContent = `Välkommen, ${saved}!`;
    }
  } catch (error) {
    // Ignore local storage failures.
  }
}

function loadPreferredMode() {
  try {
    const saved = localStorage.getItem("religion-quiz-mode");
    if (saved && gameModes[saved]) {
      currentMode = saved;
    }
  } catch (error) {
    currentMode = "standard";
  }
  renderModeSelector();
}

function savePreferredMode() {
  try {
    localStorage.setItem("religion-quiz-mode", currentMode);
  } catch (error) {
    // Ignore storage failures.
  }
}

function loadPreferredCharacter() {
  try {
    const saved = localStorage.getItem("religion-quiz-character");
    if (saved && characterConfig.some((character) => character.id === saved)) {
      selectedCharacterId = saved;
    }
  } catch (error) {
    selectedCharacterId = "likhetsjagaren";
  }
  renderCharacterGrid();
  updateAvatarVisual();
}

function savePreferredCharacter() {
  try {
    localStorage.setItem("religion-quiz-character", selectedCharacterId);
  } catch (error) {
    // Ignore storage failures.
  }
}

function setCharacter(characterId) {
  if (!characterConfig.some((character) => character.id === characterId)) {
    return;
  }
  selectedCharacterId = characterId;
  savePreferredCharacter();
  renderCharacterGrid();
  updateAvatarVisual();
  updateWorldStrip(questions[state.currentIndex]);
  showToast(`${getSelectedCharacter().name} är redo för jämförelsebanan!`);
}

function renderModeSelector() {
  const mode = getCurrentMode();
  elements.modeNameTag.textContent = mode.tag;
  elements.modeHint.textContent = mode.hint;
  elements.standardModeButton.classList.toggle("active", currentMode === "standard");
  elements.coachModeButton.classList.toggle("active", currentMode === "coach");
  elements.finalModeButton.classList.toggle("active", currentMode === "final");
}

function updateWorldStrip(question) {
  const theme = getWorldTheme(question);
  const character = getSelectedCharacter();
  elements.worldName.textContent = theme.name;
  elements.characterMission.textContent = `${character.title}: ${theme.mission}`;
  elements.obbyScene.style.setProperty("--scene-sky-top", theme.skyTop);
  elements.obbyScene.style.setProperty("--scene-sky-bottom", theme.skyBottom);
  elements.obbyScene.style.setProperty("--scene-ground-top", theme.groundTop);
  elements.obbyScene.style.setProperty("--scene-ground-bottom", theme.groundBottom);
}

function getModePool(allQuestions, mode) {
  if (mode.simpleChat) {
    return allQuestions.filter((question) => question.type === "text");
  }
  if (mode.textOnly) {
    return allQuestions.filter((question) => question.type === "text" && Array.isArray(question.modes) && question.modes.includes("final"));
  }
  return allQuestions.filter((question) => !question.modes || question.modes.includes("standard"));
}

function buildQuestionRun(allQuestions, mode) {
  const grouped = {
    easy: [],
    medium: [],
    hard: []
  };

  getModePool(allQuestions, mode).forEach((question) => {
    grouped[normalizeDifficulty(question.difficulty)].push(question);
  });

  const ordered = [];
  for (const difficulty of ["easy", "medium", "hard"]) {
    ordered.push(...shuffle(grouped[difficulty]).slice(0, mode.runPlan[difficulty]));
  }

  const selectedIds = new Set(ordered.map((question) => question.id));
  const leftovers = shuffle(getModePool(allQuestions, mode).filter((question) => !selectedIds.has(question.id)));
  const targetCount = Object.values(mode.runPlan).reduce((sum, count) => sum + count, 0);

  while (ordered.length < targetCount && leftovers.length > 0) {
    ordered.push(leftovers.pop());
  }

  return ordered.map((question) => ({
    ...question,
    difficulty: normalizeDifficulty(question.difficulty),
    options: question.options ? shuffle(question.options) : undefined,
    selected: null,
    verdict: null
  }));
}

function getRewardBundle(verdict, streak, difficulty) {
  const baseRules = scoreRules[verdict];
  const difficultyInfo = getDifficultyInfo(difficulty);
  return {
    score: baseRules.score,
    xp: baseRules.xp(streak) + difficultyInfo.xpBonus,
    gems: baseRules.gems(streak) + difficultyInfo.gemBonus
  };
}

function makeWorldState() {
  return {
    active: false,
    width: worldConfig.width,
    activeDoorIndex: -1,
    lastTimestamp: 0,
    avatar: {
      x: 110,
      y: 0,
      vy: 0,
      onGround: true,
      facing: 1
    },
    input: {
      left: false,
      right: false,
      targetX: null
    },
    platforms: [],
    doors: []
  };
}

function makeInitialState() {
  return {
    currentIndex: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    gems: 0,
    xp: 0,
    textWins: 0,
    hardWins: 0,
    answers: [],
    questionResults: {},
    unlockedBadges: new Set(),
    grading: false,
    world: makeWorldState(),
    aiStatus: {
      reachable: false,
      configured: false,
      model: null,
      message: "Ingen kontakt med servern."
    }
  };
}

function getLevel() {
  return Math.floor(state.xp / xpGoal) + 1;
}

function getProgressXp() {
  return state.xp % xpGoal;
}

async function loadQuestions() {
  const response = await fetch("./questions.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Kunde inte ladda quizfrågorna.");
  }

  const loaded = await response.json();
  return buildQuestionRun(loaded, getCurrentMode());
}

async function refreshAiStatus() {
  try {
    const response = await fetch("/api/status", { cache: "no-store" });
    const payload = await response.json();
    state.aiStatus = {
      reachable: true,
      configured: Boolean(payload.configured),
      model: payload.model || null,
      message: payload.message || ""
    };
  } catch (error) {
    state.aiStatus = {
      reachable: false,
      configured: false,
      model: null,
      message: "Starta servern med node server.mjs."
    };
  }

  renderAiStatus();
}

function renderAiStatus() {
  const aiReady = state.aiStatus.reachable && state.aiStatus.configured;

  if (aiReady) {
    elements.aiStatusValue.textContent = "Online";
    elements.aiStatusHint.textContent = `OpenAI-modell: ${state.aiStatus.model || "gpt-5-mini"}`;
    elements.aiStatusPill.textContent = "AI på";
    elements.aiStatusPill.className = "status-pill online";
    return;
  }

  if (state.aiStatus.reachable) {
    elements.aiStatusValue.textContent = "Väntar på nyckel";
    elements.aiStatusHint.textContent =
      state.aiStatus.message || "Sätt OPENAI_API_KEY och starta om servern.";
    elements.aiStatusPill.textContent = "Setup";
    elements.aiStatusPill.className = "status-pill waiting";
    return;
  }

  elements.aiStatusValue.textContent = "Ingen server";
  elements.aiStatusHint.textContent = state.aiStatus.message;
  elements.aiStatusPill.textContent = "Offline";
  elements.aiStatusPill.className = "status-pill offline";
}

function updateControlHint(question) {
  if (!elements.controlHint) {
    return;
  }

  if (isCoachMode()) {
    elements.controlHint.textContent = "Coachläge: läs frågan, skriv ditt svar och få AI-feedback direkt.";
    return;
  }

  if (question?.type === "text") {
    elements.controlHint.textContent = isTouchDevice
      ? "iPad-läge: tryck i världen för att gå till portalen och skriv sedan svaret i rutan."
      : "Tips: gå fram till portalen först och skriv sedan svaret i rutan.";
    return;
  }

  elements.controlHint.textContent = isTouchDevice
    ? "iPad-läge: tryck i världen för att gå dit, eller håll inne vänster och höger för finstyrning."
    : "Tips: styr med pilarna eller tangentbordet och öppna sedan rätt dörr.";
}

function setSidePanelOpen(open) {
  if (!elements.sideColumn || !elements.sidePanelToggle) {
    return;
  }

  sidePanelOpen = open;
  elements.sideColumn.classList.toggle("open", open);
  elements.sidePanelToggle.setAttribute("aria-expanded", String(open));
  elements.sidePanelToggle.textContent = open
    ? "Dölj uppdrag, banstig och badges"
    : "Visa uppdrag, banstig och badges";
}

function syncSidePanelLayout() {
  const compact = compactLayoutQuery?.matches ?? false;
  if (compact === lastCompactLayout) {
    setSidePanelOpen(compact ? sidePanelOpen : true);
    return;
  }

  lastCompactLayout = compact;
  if (!compact) {
    setSidePanelOpen(true);
    return;
  }

  setSidePanelOpen(false);
}

function updateHud() {
  elements.levelValue.textContent = String(getLevel());
  elements.scoreValue.textContent = String(state.score);
  elements.streakValue.textContent = String(state.streak);
  elements.gemsValue.textContent = String(state.gems);
  elements.textWinsValue.textContent = String(state.hardWins);
  elements.xpFill.style.width = `${(getProgressXp() / xpGoal) * 100}%`;
  elements.xpText.textContent = `${getProgressXp()} / ${xpGoal} XP`;
}

function renderMilestones() {
  const currentDisplay = Math.min(state.currentIndex + 1, questions.length);
  elements.progressText.textContent = `Bana ${currentDisplay} av ${questions.length}`;
  elements.milestoneTrack.innerHTML = "";

  questions.forEach((question, index) => {
    const step = document.createElement("div");
    step.className = "milestone";
    if (index < state.currentIndex) {
      step.classList.add("done");
    } else if (index === state.currentIndex && state.currentIndex < questions.length) {
      step.classList.add("current");
    }
    step.textContent = String(index + 1);
    step.title = `${question.question} (${getDifficultyInfo(question.difficulty).label})`;
    elements.milestoneTrack.append(step);
  });
}

function questStatuses() {
  return {
    "three-streak": state.bestStreak >= 3,
    "text-pro": state.textWins >= 3,
    "hard-mode": state.hardWins >= 2
  };
}

function renderQuests() {
  const statuses = questStatuses();
  elements.questList.innerHTML = "";

  questConfig.forEach((quest) => {
    const item = document.createElement("li");
    item.className = `quest-item${statuses[quest.id] ? " done" : ""}`;
    item.innerHTML = `
      <div class="quest-badge">${quest.icon}</div>
      <div class="quest-copy">
        <strong>${escapeHtml(quest.title)}</strong>
        <span>${escapeHtml(quest.description)}</span>
      </div>
    `;
    elements.questList.append(item);
  });
}

function renderBadges() {
  elements.badgeTray.innerHTML = "";
  badgeConfig.forEach((badge) => {
    const chip = document.createElement("div");
    const unlocked = state.unlockedBadges.has(badge.id);
    chip.className = `badge-chip${unlocked ? " unlocked" : ""}`;
    chip.innerHTML = `
      <div class="badge-icon">${escapeHtml(badge.icon)}</div>
      <div>
        <strong>${escapeHtml(badge.name)}</strong>
        <div>${escapeHtml(badge.description)}</div>
      </div>
    `;
    elements.badgeTray.append(chip);
  });
}

function isAiReady() {
  return state.aiStatus.reachable && state.aiStatus.configured;
}

function renderOfflineHint() {
  elements.feedbackBox.className = "feedback-box bad";
  elements.feedbackBox.innerHTML = `
    <strong>AI-domaren är inte redo ännu.</strong>
    Starta appen med <b>OPENAI_API_KEY=din_nyckel node server.mjs</b> och ladda om sidan.
  `;
}

function stopWorldLoop() {
  if (worldLoopId) {
    cancelAnimationFrame(worldLoopId);
    worldLoopId = 0;
  }
  if (state.world) {
    state.world.active = false;
    state.world.input.left = false;
    state.world.input.right = false;
    state.world.input.targetX = null;
  }
}

function getSupportHeight(x) {
  let support = 0;
  for (const platform of state.world.platforms) {
    const leftBound = platform.x - worldConfig.avatarWidth * 0.25;
    const rightBound = platform.x + platform.width + worldConfig.avatarWidth * 0.25;
    if (x >= leftBound && x <= rightBound) {
      support = Math.max(support, platform.y + platform.height);
    }
  }
  return support;
}

function setSceneTargetFromClientX(clientX) {
  if (!state.world?.active) {
    return;
  }

  const rect = elements.obbyScene.getBoundingClientRect();
  const relativeX = ((clientX - rect.left) / rect.width) * state.world.width;
  state.world.input.targetX = Math.min(state.world.width - 46, Math.max(46, relativeX));
}

function buildChoiceLayout(question) {
  const count = question.options.length;
  const layout = { platforms: [], doors: [] };

  if (count <= 2) {
    layout.doors = [
      { x: 200, y: 0, label: "A", answer: question.options[0] },
      { x: 690, y: 0, label: "B", answer: question.options[1] }
    ];
    return layout;
  }

  if (count === 3) {
    layout.platforms = [{ x: 420, y: 88, width: 180, height: 18 }];
    layout.doors = [
      { x: 110, y: 0, label: "A", answer: question.options[0] },
      { x: 432, y: 106, label: "B", answer: question.options[1] },
      { x: 760, y: 0, label: "C", answer: question.options[2] }
    ];
    return layout;
  }

  layout.platforms = [
    { x: 250, y: 78, width: 170, height: 18 },
    { x: 560, y: 132, width: 170, height: 18 }
  ];
  layout.doors = [
    { x: 70, y: 0, label: "A", answer: question.options[0] },
    { x: 258, y: 96, label: "B", answer: question.options[1] },
    { x: 568, y: 150, label: "C", answer: question.options[2] },
    { x: 820, y: 0, label: "D", answer: question.options[3] }
  ];
  return layout;
}

function buildTextLayout(question) {
  return {
    platforms: [{ x: 620, y: 82, width: 190, height: 18 }],
    doors: [
      {
        x: 638,
        y: 100,
        label: "AI",
        answer: question.question,
        prompt: getCurrentMode().textOnly
          ? "Kunskapsportalen väntar på ditt svar i egna ord."
          : "Ställ dig vid portalen och skriv ditt svar till AI-domaren."
      }
    ]
  };
}

function buildWorldLayout(question) {
  return question.type === "choice" ? buildChoiceLayout(question) : buildTextLayout(question);
}

function renderWorldLayout() {
  const world = state.world;
  elements.platformLayer.innerHTML = "";
  elements.doorTrack.innerHTML = "";

  world.platforms.forEach((platform) => {
    const platformElement = document.createElement("div");
    platformElement.className = "platform";
    platformElement.style.left = `${(platform.x / world.width) * 100}%`;
    platformElement.style.bottom = `${worldConfig.groundHeight + platform.y}px`;
    platformElement.style.width = `${(platform.width / world.width) * 100}%`;
    platformElement.style.height = `${platform.height}px`;
    elements.platformLayer.append(platformElement);
  });

  world.doors.forEach((door, index) => {
    const doorElement = document.createElement("button");
    doorElement.type = "button";
    doorElement.className = "door-card";
    doorElement.innerHTML = `
      <div class="door-top">${escapeHtml(door.label)}</div>
      <p>${escapeHtml(door.prompt || door.answer)}</p>
    `;
    doorElement.style.left = `${(door.x / world.width) * 100}%`;
    doorElement.style.bottom = `${worldConfig.groundHeight + door.y}px`;
    doorElement.addEventListener("click", () => {
      world.avatar.x = door.x + 78;
      world.avatar.y = door.y;
      world.avatar.vy = 0;
      world.avatar.onGround = true;
      world.activeDoorIndex = index;
      syncWorldVisuals();
    });
    elements.doorTrack.append(doorElement);
  });
}

function syncWorldVisuals() {
  const world = state.world;
  [...elements.doorTrack.querySelectorAll(".door-card")].forEach((doorElement, index) => {
    doorElement.classList.toggle("active", world.activeDoorIndex === index);
  });
  elements.playerAvatar.style.left = `${(world.avatar.x / world.width) * 100}%`;
  elements.playerAvatar.style.bottom = `${worldConfig.groundHeight + world.avatar.y}px`;
  elements.playerAvatar.classList.toggle(
    "running",
    world.input.left || world.input.right || world.input.targetX !== null
  );
}

function updateActiveDoor() {
  const world = state.world;
  let closestIndex = -1;
  let closestDistance = Number.POSITIVE_INFINITY;

  world.doors.forEach((door, index) => {
    const centerX = door.x + 78;
    const dx = Math.abs(world.avatar.x - centerX);
    const dy = Math.abs(world.avatar.y - door.y);
    const distance = dx + dy * 1.4;
    if (dx <= worldConfig.interactDistance && dy <= 90 && distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  world.activeDoorIndex = closestIndex;
}

function stepWorld(timestamp) {
  if (!state.world.active) {
    return;
  }

  const world = state.world;
  const delta = world.lastTimestamp ? Math.min((timestamp - world.lastTimestamp) / 16.67, 1.4) : 1;
  world.lastTimestamp = timestamp;

  if (!state.grading) {
    if (world.input.left === world.input.right) {
      if (world.input.targetX !== null) {
        const dx = world.input.targetX - world.avatar.x;
        if (Math.abs(dx) <= worldConfig.moveSpeed * delta * 1.2) {
          world.avatar.x = world.input.targetX;
          world.input.targetX = null;
        } else if (dx < 0) {
          world.avatar.x -= worldConfig.moveSpeed * delta;
          world.avatar.facing = -1;
        } else {
          world.avatar.x += worldConfig.moveSpeed * delta;
          world.avatar.facing = 1;
        }
      } else {
        world.avatar.facing = world.avatar.facing || 1;
      }
    } else if (world.input.left) {
      world.avatar.x -= worldConfig.moveSpeed * delta;
      world.avatar.facing = -1;
    } else if (world.input.right) {
      world.avatar.x += worldConfig.moveSpeed * delta;
      world.avatar.facing = 1;
    }
  }

  world.avatar.x = Math.min(world.width - 46, Math.max(46, world.avatar.x));

  const supportHeight = getSupportHeight(world.avatar.x);
  if (world.avatar.onGround && world.avatar.y > supportHeight + 1) {
    world.avatar.onGround = false;
  }

  if (!world.avatar.onGround) {
    world.avatar.vy -= worldConfig.gravity * delta;
    world.avatar.y += world.avatar.vy * delta;
    const landingHeight = getSupportHeight(world.avatar.x);
    if (world.avatar.y <= landingHeight) {
      world.avatar.y = landingHeight;
      world.avatar.vy = 0;
      world.avatar.onGround = true;
    }
  } else {
    world.avatar.y = supportHeight;
  }

  updateActiveDoor();
  syncWorldVisuals();
  worldLoopId = requestAnimationFrame(stepWorld);
}

function startWorldLoop() {
  stopWorldLoop();
  state.world.active = true;
  state.world.lastTimestamp = 0;
  renderWorldLayout();
  syncWorldVisuals();
  worldLoopId = requestAnimationFrame(stepWorld);
}

function renderDoorScene(question) {
  const mode = getCurrentMode();
  const theme = getWorldTheme(question);
  const layout = buildWorldLayout(question);
  elements.choices.hidden = true;
  elements.choices.innerHTML = "";
  updateWorldStrip(question);

  state.world = {
    ...makeWorldState(),
    active: true,
    platforms: layout.platforms,
    doors: layout.doors
  };

  if (question.type === "choice") {
    elements.stageTitle.textContent = mode.textOnly ? "Svarsportarna" : theme.name;
    elements.stageInstruction.textContent = `${theme.choiceInstruction}. ${isTouchDevice ? "Tryck i världen eller använd knapparna för att springa fram till en port." : "Spring fram till en port."}`;
    elements.openDoorButton.textContent = "Öppna port";
  } else {
    elements.stageTitle.textContent = mode.textOnly ? "Finalportalen" : theme.name;
    elements.stageInstruction.textContent = `${mode.textOnly ? "Spring till portalen och svara med egna ord" : theme.textInstruction}. ${isTouchDevice ? "Tryck i världen för att gå till portalen snabbare." : ""}`.trim();
    elements.openDoorButton.textContent = "Använd portalen";
  }

  updateActiveDoor();
  startWorldLoop();
  setInteractionDisabled(false);
}

function renderCoachScene(question) {
  const theme = getWorldTheme(question);
  updateWorldStrip(question);
  stopWorldLoop();
  elements.obbyPanel.hidden = true;
  elements.coachPanel.hidden = false;
  elements.choices.hidden = true;
  elements.choices.innerHTML = "";
  elements.coachPrompt.textContent = question.question;
  elements.stageTitle.textContent = `${theme.name}: AI-coachen`;
  elements.stageInstruction.textContent = "Svara med egna ord och få tydlig feedback direkt";
}

function renderQuestion() {
  const current = questions[state.currentIndex];
  if (!current) {
    showResults();
    return;
  }

  const difficultyInfo = getDifficultyInfo(current.difficulty);
  const mode = getCurrentMode();
  elements.resultCard.hidden = true;
  elements.categoryPill.textContent = current.category;
  elements.questionCount.textContent = `Fråga ${state.currentIndex + 1} / ${questions.length}`;
  elements.difficultyPill.textContent = difficultyInfo.label;
  elements.difficultyPill.className = `difficulty-pill ${difficultyInfo.className}`;
  elements.questionText.textContent = current.question;
  elements.answerModePill.textContent = mode.simpleChat
    ? "AI-coach"
    : mode.textOnly
      ? "Finalväg: textsvar"
      : current.type === "text"
        ? "Textfråga"
        : "Dörrfråga";
  elements.nextButton.textContent = mode.simpleChat ? "Nästa fråga" : "Nästa bana";
  elements.nextButton.disabled = true;
  elements.textAnswer.value = "";
  elements.textAnswerPanel.hidden = !(mode.simpleChat || current.type === "text");
  elements.obbyPanel.hidden = mode.simpleChat;
  elements.coachPanel.hidden = !mode.simpleChat;
  elements.textAnswer.maxLength = mode.textOnly ? 280 : 180;
  elements.textAnswer.placeholder = mode.simpleChat
    ? "Skriv ett kort men tydligt svar. 1-2 meningar räcker fint."
    : mode.textOnly
      ? "Skriv 1-2 meningar och förklara med egna ord."
      : "Skriv ett kort svar. Ett eller några ord räcker ofta.";
  elements.textAnswerLabel.textContent = mode.simpleChat ? "Ditt svar till AI-coachen" : "Skriv ditt svar";
  elements.textHelp.textContent = mode.simpleChat
    ? "AI-coachen rättar ditt svar och förklarar lugnt vad som var bra och vad du kan förbättra."
    : "AI-domaren godkänner korta svar och små stavfel.";
  elements.submitTextButton.textContent = mode.simpleChat ? "Få AI-feedback" : "Skicka till AI-domaren";
  elements.submitTextButton.disabled = false;
  elements.feedbackBox.className = "feedback-box";
  elements.feedbackBox.innerHTML = `
    <strong>${difficultyInfo.intro}</strong>
    ${mode.simpleChat
      ? "Här får du en fråga i taget. Svara i textfältet så rättar AI-coachen och ger tydlig återkoppling."
      : current.type === "text"
        ? "Gå fram till portalen och svara med egna ord. AI-domaren letar efter vad du förstår."
        : "Styr med vänster, höger och hoppa. Öppna sedan den dörr du tror är rätt."}
  `;

  updateControlHint(current);
  if (mode.simpleChat) {
    renderCoachScene(current);
    requestAnimationFrame(() => elements.textAnswer.focus());
  } else {
    renderDoorScene(current);
  }
  updateAvatarVisual();
  setInteractionDisabled(false);
  if (!isAiReady()) {
    renderOfflineHint();
  }

  renderMilestones();
}

function awardBadge(id, text) {
  if (state.unlockedBadges.has(id)) {
    return;
  }
  state.unlockedBadges.add(id);
  renderBadges();
  showToast(text);
}

function evaluateBadges() {
  if (state.score >= 1) {
    awardBadge("spawn", "Badge upplåst: Startgnista!");
  }
  if (state.bestStreak >= 3) {
    awardBadge("combo", "Badge upplåst: Jämförelsecombo!");
  }
  if (state.textWins >= 3) {
    awardBadge("creator", "Badge upplåst: Textspjutet!");
  }
  if (state.hardWins >= 2) {
    awardBadge("boss", "Badge upplåst: Skillnadsspåraren!");
  }

  const commonQuestions = questions.filter((question) => question.category === "Gemensamt");
  if (commonQuestions.length > 0 && commonQuestions.every((question) => state.questionResults[question.id] === true)) {
    awardBadge("eid", "Badge upplåst: Gemensam Blick!");
  }

  if (state.answers.length === questions.length && state.score === questions.length) {
    awardBadge("perfect", "Badge upplåst: Perfekt Runda!");
  }
}

function createSparkBurst() {
  elements.sparkZone.innerHTML = "";
  const colors = ["#ff8f1f", "#14c3c6", "#ff5da8", "#ffe16a", "#59d98e"];

  for (let index = 0; index < 18; index += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.left = `${50 + (Math.random() * 20 - 10)}%`;
    spark.style.top = `${48 + (Math.random() * 18 - 9)}%`;
    spark.style.background = colors[index % colors.length];
    spark.style.setProperty("--dx", `${Math.random() * 240 - 120}px`);
    spark.style.setProperty("--dy", `${Math.random() * -220 - 20}px`);
    elements.sparkZone.append(spark);
  }

  setTimeout(() => {
    elements.sparkZone.innerHTML = "";
  }, 950);
}

function jumpAvatar() {
  if (!state.world?.active || state.grading) {
    return;
  }
  if (!state.world.avatar.onGround) {
    return;
  }
  state.world.avatar.onGround = false;
  state.world.avatar.vy = worldConfig.jumpVelocity;
  elements.playerAvatar.classList.add("jumping");
  clearTimeout(jumpAvatar.timer);
  jumpAvatar.timer = setTimeout(() => {
    elements.playerAvatar.classList.remove("jumping");
  }, 220);
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 2200);
}

function setInteractionDisabled(disabled) {
  const current = questions[state.currentIndex];
  const aiReady = isAiReady();
  const isText = current?.type === "text" || isCoachMode();
  [...elements.doorTrack.querySelectorAll(".door-card")].forEach((door) => {
    door.disabled = disabled || !aiReady;
  });
  elements.moveLeftButton.disabled = disabled || !aiReady || !current || isCoachMode();
  elements.moveRightButton.disabled = disabled || !aiReady || !current || isCoachMode();
  elements.jumpButton.disabled = disabled || !aiReady || !current || isCoachMode();
  elements.openDoorButton.disabled = disabled || !aiReady || isCoachMode();
  elements.textAnswer.disabled = disabled || !aiReady || !isText;
  elements.submitTextButton.disabled = disabled || !aiReady || !isText;
}

function markChoiceDoors(userAnswer, correctAnswer) {
  [...elements.doorTrack.querySelectorAll(".door-card")].forEach((door) => {
    door.disabled = true;
    const text = door.querySelector("p")?.textContent || "";
    if (text === userAnswer) {
      door.classList.add("active");
    }
    if (text === correctAnswer) {
      door.classList.add("correct");
    }
    if (text === userAnswer && userAnswer !== correctAnswer) {
      door.classList.add("wrong");
    }
  });
}

function setMoveInput(direction, enabled) {
  if (!state.world?.active) {
    return;
  }
  if (enabled) {
    state.world.input.targetX = null;
  }
  state.world.input[direction] = enabled;
}

function handleOpenDoor() {
  const current = questions[state.currentIndex];
  if (!current || state.grading) {
    return;
  }

  const activeDoor = state.world.doors[state.world.activeDoorIndex];
  if (!activeDoor) {
    showToast(current.type === "text" ? "Spring fram till portalen först." : "Gå fram till en port först.");
    return;
  }

  if (current.type === "choice") {
    gradeAnswer(activeDoor.answer);
    return;
  }

  elements.textAnswer.focus();
  elements.textAnswer.scrollIntoView({ block: "nearest", behavior: "smooth" });
  showToast("Portalen är öppen. Skriv ditt svar nedanför.");
}

async function gradeAnswer(rawAnswer) {
  const current = questions[state.currentIndex];
  if (!current || state.grading || current.verdict) {
    return;
  }

  const answer = String(rawAnswer).trim();
  if (!answer) {
    showToast("Skriv ett svar först.");
    return;
  }

  if (!isAiReady()) {
    renderOfflineHint();
    return;
  }

  state.grading = true;
  setInteractionDisabled(true);
  elements.nextButton.disabled = true;
  elements.feedbackBox.className = "feedback-box loading";
  elements.feedbackBox.innerHTML = "<strong>AI-domaren tänker...</strong> Bedömer svaret mot faktatexten nu.";

  try {
    const response = await fetch("/api/grade-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        questionId: current.id,
        answer,
        playerName: elements.playerName.value.trim() || "Quizhjälte"
      })
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "AI-bedömningen misslyckades.");
    }

    applyGrade(current, answer, payload.grade);
  } catch (error) {
    elements.feedbackBox.className = "feedback-box bad";
    elements.feedbackBox.innerHTML = `
      <strong>AI-domaren tappade kontakten.</strong>
      ${escapeHtml(error.message || "Prova igen om en liten stund.")}
    `;
    await refreshAiStatus();
    renderQuestion();
  } finally {
    state.grading = false;
  }
}

function applyGrade(question, userAnswer, grade) {
  const verdict = ["correct", "almost", "incorrect"].includes(grade.verdict) ? grade.verdict : "incorrect";
  const nextStreak = verdict === "correct" ? state.streak + 1 : 0;
  const rewards = getRewardBundle(verdict, nextStreak, question.difficulty);

  question.selected = userAnswer;
  question.verdict = verdict;
  state.answers.push({
    id: question.id,
    question: question.question,
    verdict,
    selected: userAnswer,
    correctAnswer: grade.correct_answer || question.correctAnswer || "",
    category: question.category,
    difficulty: question.difficulty
  });
  state.questionResults[question.id] = verdict === "correct";

  if (verdict === "correct") {
    state.score += rewards.score;
    state.streak = nextStreak;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    if (question.type === "text") {
      state.textWins += 1;
    }
    if (question.difficulty === "hard") {
      state.hardWins += 1;
    }
  } else {
    state.streak = 0;
  }

  state.xp += rewards.xp;
  state.gems += rewards.gems;

  if (question.type === "choice") {
    markChoiceDoors(userAnswer, grade.correct_answer || question.correctAnswer);
  }

  const feedbackClass = verdict === "correct" ? "good" : verdict === "almost" ? "okay" : "bad";
  elements.feedbackBox.className = `feedback-box ${feedbackClass}`;
  elements.feedbackBox.innerHTML = `
    <strong>${escapeHtml(grade.feedback_title || "Svar bedömt")} +${rewards.xp} XP</strong>
    ${escapeHtml(grade.feedback_text || "")}
    <br />
    <b>${isCoachMode() ? "Det viktiga i svaret:" : "Rätt svar:"}</b> ${escapeHtml(grade.correct_answer || question.correctAnswer || "")}
    <br />
    <b>${isCoachMode() ? "AI-coachen tipsar:" : "Nästa steg:"}</b> ${escapeHtml(grade.coach_tip || "Bra jobbat, fortsätt så.")}
  `;

  if (verdict === "correct") {
    createSparkBurst();
  }

  evaluateBadges();
  updateHud();
  renderQuests();
  elements.nextButton.disabled = false;
}

function rankPlayer() {
  const ratio = questions.length === 0 ? 0 : state.score / questions.length;
  if (ratio === 1) {
    return "Jämförelselegend";
  }
  if (ratio >= 0.8) {
    return "Trevägsmästare";
  }
  if (ratio >= 0.6) {
    return "Likhetsspanare";
  }
  return "Faktautforskare";
}

function showResults() {
  stopWorldLoop();
  const notPerfect = state.answers.filter((answer) => answer.verdict !== "correct");
  const mode = getCurrentMode();
  const character = getSelectedCharacter();

  elements.categoryPill.textContent = "Målgång";
  elements.questionCount.textContent = `Klar! ${state.score} / ${questions.length}`;
  elements.difficultyPill.textContent = mode.textOnly ? "Final" : "Jakt";
  elements.difficultyPill.className = `difficulty-pill ${mode.textOnly ? "hard" : "medium"}`;
  elements.answerModePill.textContent = mode.name;
  elements.questionText.textContent = `${elements.playerName.value || "Spelare"}, ${character.name} klarade runnen!`;
  elements.stageTitle.textContent = mode.simpleChat ? "Coachsammanfattning" : "Segerportalen";
  elements.stageInstruction.textContent = mode.simpleChat ? "Du klarade frågestunden" : "Du klarade banan";
  updateWorldStrip();
  elements.obbyPanel.hidden = mode.simpleChat;
  elements.coachPanel.hidden = !mode.simpleChat;
  if (mode.simpleChat) {
    elements.coachPrompt.textContent = `${character.name} klarade hela ${mode.name}. Nu kan du läsa återkopplingen och spela igen.`;
  } else {
    elements.platformLayer.innerHTML = "";
    elements.doorTrack.innerHTML = `
      <div class="door-card active" style="left:42%; bottom:${worldConfig.groundHeight + 24}px;">
        <div class="door-top">GG</div>
        <p>${escapeHtml(character.name)} tog sig genom hela ${mode.name}.</p>
      </div>
    `;
  }
  elements.textAnswerPanel.hidden = true;
  elements.feedbackBox.className = "feedback-box good";
  elements.feedbackBox.innerHTML = `<strong>GG!</strong> Du samlade ${state.xp} XP, ${state.gems} gems, ${state.textWins} textvinster och ${state.hardWins} boss-segrar.`;
  elements.nextButton.disabled = true;

  elements.resultTitle.textContent = rankPlayer();
  elements.resultSummary.textContent = `Du spelade som ${character.name}, klarade ${mode.name} och fick ${state.score} helt rätta svar av ${questions.length}. Du nådde nivå ${getLevel()} och klarade ${state.hardWins} svåra frågor. ${
    notPerfect.length === 0 ? "Perfekt run utan fel." : "Här kommer en snabb repetition av svar att kika extra på."
  }`;

  elements.reviewList.innerHTML = "";
  if (notPerfect.length === 0) {
    const item = document.createElement("div");
    item.className = "review-item";
    item.innerHTML =
      "<div class=\"badge-icon\">GG</div><div><strong>Allt satt!</strong><span>Du svarade rätt på varje fråga i hela jämförelsebanan.</span></div>";
    elements.reviewList.append(item);
  } else {
    notPerfect.slice(0, 5).forEach((answer) => {
      const item = document.createElement("div");
      item.className = "review-item";
      item.innerHTML = `
        <div class="badge-icon">R</div>
        <div>
          <strong>${escapeHtml(answer.question)}</strong>
          <span>Nivå: ${escapeHtml(getDifficultyInfo(answer.difficulty).label)}</span>
          <span>Ditt svar: ${escapeHtml(answer.selected)}</span>
          <span>Rätt svar: ${escapeHtml(answer.correctAnswer)}</span>
        </div>
      `;
      elements.reviewList.append(item);
    });
  }

  elements.resultCard.hidden = false;
  elements.playerAvatar.classList.remove("running", "jumping");
  elements.playerAvatar.style.left = "50%";
  elements.playerAvatar.style.bottom = `${worldConfig.groundHeight}px`;
  renderMilestones();
}

function goToNextQuestion() {
  state.currentIndex += 1;
  if (state.currentIndex >= questions.length) {
    renderMilestones();
    showResults();
    return;
  }
  renderQuestion();
}

async function startGame() {
  stopWorldLoop();
  state = makeInitialState();
  renderModeSelector();
  renderCharacterGrid();
  updateAvatarVisual();
  updateHud();
  renderQuests();
  renderBadges();

  try {
    questions = await loadQuestions();
    await refreshAiStatus();
    renderQuestion();
    showToast(`${getCurrentMode().name} startad för ${getSelectedCharacter().name}.`);
  } catch (error) {
    elements.feedbackBox.className = "feedback-box bad";
    elements.feedbackBox.innerHTML = `
      <strong>Appen kunde inte starta.</strong>
      ${escapeHtml(error.message || "Kunde inte ladda frågorna.")}
    `;
  }
}

function setMode(modeId) {
  if (!gameModes[modeId] || currentMode === modeId) {
    return;
  }
  currentMode = modeId;
  savePreferredMode();
  renderModeSelector();
  startGame();
}

function isEditableElement(element) {
  if (!element) {
    return false;
  }

  const tagName = element.tagName;
  return tagName === "INPUT" || tagName === "TEXTAREA" || element.isContentEditable;
}

elements.nextButton.addEventListener("click", goToNextQuestion);
elements.restartTopButton.addEventListener("click", startGame);
elements.playAgainButton.addEventListener("click", startGame);
elements.saveNameButton.addEventListener("click", savePlayerName);
elements.sidePanelToggle?.addEventListener("click", () => {
  setSidePanelOpen(!sidePanelOpen);
});
elements.standardModeButton.addEventListener("click", () => setMode("standard"));
elements.coachModeButton.addEventListener("click", () => setMode("coach"));
elements.finalModeButton.addEventListener("click", () => setMode("final"));
elements.moveLeftButton.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  setMoveInput("left", true);
});
elements.moveRightButton.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  setMoveInput("right", true);
});
elements.obbyScene.addEventListener("pointerdown", (event) => {
  if (!state.world?.active || state.grading || event.target.closest(".door-card")) {
    return;
  }

  setSceneTargetFromClientX(event.clientX);
});
elements.obbyScene.addEventListener("pointermove", (event) => {
  if (!state.world?.active || state.grading || event.buttons !== 1 || event.target.closest(".door-card")) {
    return;
  }

  setSceneTargetFromClientX(event.clientX);
});
elements.jumpButton.addEventListener("click", jumpAvatar);
elements.openDoorButton.addEventListener("click", handleOpenDoor);
elements.submitTextButton.addEventListener("click", () => gradeAnswer(elements.textAnswer.value));
elements.textAnswer.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    gradeAnswer(elements.textAnswer.value);
  }
});
elements.playerName.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    savePlayerName();
  }
});
window.addEventListener("resize", () => {
  syncSidePanelLayout();
  requestAnimationFrame(() => {
    if (state.world?.active) {
      syncWorldVisuals();
    }
  });
});
window.addEventListener("pointerup", () => {
  setMoveInput("left", false);
  setMoveInput("right", false);
});
window.addEventListener("pointercancel", () => {
  setMoveInput("left", false);
  setMoveInput("right", false);
});
window.addEventListener("keydown", (event) => {
  if (state.grading || state.currentIndex >= questions.length) {
    return;
  }

  if (isEditableElement(event.target) || isEditableElement(document.activeElement)) {
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    setMoveInput("left", true);
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    setMoveInput("right", true);
    return;
  }

  if (event.key === " " || event.key === "ArrowUp") {
    event.preventDefault();
    jumpAvatar();
    return;
  }

  if (event.key === "Enter" && document.activeElement !== elements.textAnswer && document.activeElement !== elements.playerName) {
    event.preventDefault();
    handleOpenDoor();
  }
});
window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    setMoveInput("left", false);
  }
  if (event.key === "ArrowRight") {
    setMoveInput("right", false);
  }
});

loadPlayerName();
loadPreferredMode();
loadPreferredCharacter();
syncSidePanelLayout();
startGame();
