const gameModes = {
  standard: {
    id: "standard",
    name: "Obby Mix",
    tag: "Obby Mix",
    hint: "Spring genom dörrbanan och välj rätt port med din hjälte.",
    runPlan: { easy: 6, medium: 6, hard: 6 },
    textOnly: false
  },
  final: {
    id: "final",
    name: "Creator Tower: Endbossbanan",
    tag: "Finalväg",
    hint: "Sista tornet med bara textsvar. Här räcker det inte med att gissa.",
    runPlan: { easy: 5, medium: 5, hard: 5 },
    textOnly: true
  }
};

const characterConfig = [
  {
    id: "khadija",
    name: "Khadija",
    title: "Karavanmästaren",
    icon: "K",
    accent: "#ff8f1f",
    description: "Lugn, klok och snabb på att hitta rätt väg."
  },
  {
    id: "aisha",
    name: "Aisha",
    title: "Kunskapssamlaren",
    icon: "A",
    accent: "#14c3c6",
    description: "Läser ledtrådar noga och gillar kluriga svar."
  },
  {
    id: "bilal",
    name: "Bilal",
    title: "Minaretscouten",
    icon: "B",
    accent: "#59d98e",
    description: "Rör sig snabbt mellan dörrar och håller fokus."
  },
  {
    id: "fatima",
    name: "Fatima",
    title: "Stjärnväktaren",
    icon: "F",
    accent: "#ff5da8",
    description: "Modig på bossbanor och stark i finalen."
  }
];

const badgeConfig = [
  { id: "spawn", icon: "S", name: "Spawn Boost", description: "Få ditt första rätta svar." },
  { id: "combo", icon: "C", name: "Combo Cube", description: "Få 3 rätta i rad." },
  { id: "creator", icon: "T", name: "Text Titan", description: "Klara 3 textfrågor rätt." },
  { id: "boss", icon: "B", name: "Boss Rush", description: "Klara 2 svåra frågor rätt." },
  { id: "eid", icon: "E", name: "Eid Expert", description: "Klara båda eid-frågorna." },
  { id: "perfect", icon: "P", name: "Perfect Run", description: "Gå igenom hela banan utan fel." }
];

const questConfig = [
  {
    id: "three-streak",
    icon: "1",
    title: "Combo-uppdrag",
    description: "Få 3 rätta svar i rad."
  },
  {
    id: "text-pro",
    icon: "2",
    title: "Creator Mode",
    description: "Klara 3 textfrågor rätt."
  },
  {
    id: "hard-mode",
    icon: "3",
    title: "Boss mode",
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
  "Grundfakta": {
    name: "Ökenporten",
    choiceInstruction: "Vandra genom portarna i startoasen",
    textInstruction: "Berätta med egna ord för att lämna den första gården",
    mission: "Samla grundfakta och lås upp nästa gård i palatset.",
    skyTop: "#f2b56b",
    skyBottom: "#fde8be",
    groundTop: "#c98a47",
    groundBottom: "#8a5524"
  },
  Gud: {
    name: "Tawhidterrassen",
    choiceInstruction: "Välj porten som stämmer med tron på Gud",
    textInstruction: "Förklara tydligt vad texten säger om Gud",
    mission: "Visa att du har koll på vem muslimer tror på.",
    skyTop: "#35608f",
    skyBottom: "#9dc6dd",
    groundTop: "#1d7f87",
    groundBottom: "#114e57"
  },
  "Gud och profeten": {
    name: "Budbärargången",
    choiceInstruction: "Passera rätt port i sandstensgången",
    textInstruction: "Svara lugnt och klart för att passera budbärarporten",
    mission: "Lås upp rätt väg genom att minnas vem Muhammed var.",
    skyTop: "#7c4f4b",
    skyBottom: "#f1c39a",
    groundTop: "#d98c54",
    groundBottom: "#8c4c22"
  },
  "Helig skrift": {
    name: "Skriftens Gård",
    choiceInstruction: "Spring till den port som passar texten bäst",
    textInstruction: "Skriv 1-2 meningar om det du minns från skriften",
    mission: "Samla kunskap från den heliga skriften för att gå vidare.",
    skyTop: "#4e4c8c",
    skyBottom: "#d9c2f2",
    groundTop: "#7d68c8",
    groundBottom: "#46338b"
  },
  Moské: {
    name: "Minaretgränden",
    choiceInstruction: "Navigera mellan valv och mosképortar",
    textInstruction: "Beskriv vad som händer i moskén för att öppna portalen",
    mission: "Hitta rätt väg i minaretkvarteren.",
    skyTop: "#578a93",
    skyBottom: "#d7efe2",
    groundTop: "#3da087",
    groundBottom: "#1c5f54"
  },
  Maten: {
    name: "Kryddbasaren",
    choiceInstruction: "Ta rätt matport genom basaren",
    textInstruction: "Beskriv regeln tydligt för att komma vidare",
    mission: "Klara matbanan med rätt fakta i bagaget.",
    skyTop: "#d8904a",
    skyBottom: "#f8dfb7",
    groundTop: "#c66a36",
    groundBottom: "#8f3f1f"
  },
  "De fem pelarna": {
    name: "Pelarpalatset",
    choiceInstruction: "Hoppa mellan pelarportarna och välj rätt",
    textInstruction: "Förklara en pelare i egna ord för att låsa upp nästa sal",
    mission: "Visa att du kan islams fem pelare steg för steg.",
    skyTop: "#2f4e83",
    skyBottom: "#f1d59b",
    groundTop: "#6c74bf",
    groundBottom: "#2d376d"
  },
  Högtider: {
    name: "Eidmarknaden",
    choiceInstruction: "Hitta högtidsporten som leder vidare",
    textInstruction: "Berätta vad högtiden handlar om för att passera",
    mission: "Fira dig vidare genom rätt högtidskunskap.",
    skyTop: "#8f4564",
    skyBottom: "#f5d6b7",
    groundTop: "#d96f8b",
    groundBottom: "#8f3557"
  },
  "Livet efter döden": {
    name: "Domens Port",
    choiceInstruction: "Välj sista porten med rätt kunskap",
    textInstruction: "Formulera ett tydligt svar för att klara slutportalen",
    mission: "Det här är slutet av runnen, så tänk igenom svaret noga.",
    skyTop: "#1e2958",
    skyBottom: "#d8b77d",
    groundTop: "#6657b0",
    groundBottom: "#2b2358"
  },
  default: {
    name: "Palatsbanan",
    choiceInstruction: "Välj rätt port för att fortsätta",
    textInstruction: "Svara med egna ord för att öppna portalen",
    mission: "Spring vidare genom kunskapspalatset.",
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
  questList: document.querySelector("#questList"),
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
  choices: document.querySelector("#choices"),
  textAnswerPanel: document.querySelector("#textAnswerPanel"),
  textAnswer: document.querySelector("#textAnswer"),
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
let selectedCharacterId = "aisha";
let worldLoopId = 0;

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
  const safeName = elements.playerName.value.trim() || "Roblox-stjärna";
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
    selectedCharacterId = "aisha";
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
  showToast(`${getSelectedCharacter().name} är redo för obbyn!`);
}

function renderModeSelector() {
  const mode = getCurrentMode();
  elements.modeNameTag.textContent = mode.tag;
  elements.modeHint.textContent = mode.hint;
  elements.standardModeButton.classList.toggle("active", currentMode === "standard");
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
      right: false
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
  const eidQuestions = questions.filter((question) => question.category === "Högtider");
  const eidDone = eidQuestions.length > 0 && eidQuestions.every((question) => state.questionResults[question.id] === true);

  return {
    "three-streak": state.bestStreak >= 3,
    "text-pro": state.textWins >= 3,
    "hard-mode": state.hardWins >= 2,
    "eid-pair": eidDone
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
  elements.playerAvatar.classList.toggle("running", world.input.left || world.input.right);
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
      world.avatar.facing = world.avatar.facing || 1;
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
    elements.stageInstruction.textContent = `${theme.choiceInstruction}. Spring fram till en port.`;
    elements.openDoorButton.textContent = "Öppna port";
  } else {
    elements.stageTitle.textContent = mode.textOnly ? "Creator Tower" : theme.name;
    elements.stageInstruction.textContent = `${mode.textOnly ? "Spring till portalen och svara med egna ord" : theme.textInstruction}.`;
    elements.openDoorButton.textContent = "Använd portalen";
  }

  updateActiveDoor();
  startWorldLoop();
  setInteractionDisabled(false);
}

function renderQuestion() {
  const current = questions[state.currentIndex];
  if (!current) {
    showResults();
    return;
  }

  const difficultyInfo = getDifficultyInfo(current.difficulty);
  elements.resultCard.hidden = true;
  elements.categoryPill.textContent = current.category;
  elements.questionCount.textContent = `Fråga ${state.currentIndex + 1} / ${questions.length}`;
  elements.difficultyPill.textContent = difficultyInfo.label;
  elements.difficultyPill.className = `difficulty-pill ${difficultyInfo.className}`;
  elements.questionText.textContent = current.question;
  elements.answerModePill.textContent = getCurrentMode().textOnly ? "Finalväg: textsvar" : current.type === "text" ? "Textfråga" : "Dörrfråga";
  elements.nextButton.disabled = true;
  elements.textAnswer.value = "";
  elements.textAnswerPanel.hidden = current.type !== "text";
  elements.textAnswer.maxLength = getCurrentMode().textOnly ? 280 : 180;
  elements.textAnswer.placeholder = getCurrentMode().textOnly
    ? "Skriv 1-2 meningar och förklara med egna ord."
    : "Skriv ett kort svar. Ett eller några ord räcker ofta.";
  elements.submitTextButton.disabled = false;
  elements.feedbackBox.className = "feedback-box";
  elements.feedbackBox.innerHTML = `
    <strong>${difficultyInfo.intro}</strong>
    ${current.type === "text"
      ? "Gå fram till portalen och svara med egna ord. AI-domaren letar efter vad du förstår."
      : "Styr med vänster, höger och hoppa. Öppna sedan den dörr du tror är rätt."}
  `;

  renderDoorScene(current);
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
    awardBadge("spawn", "Badge upplåst: Spawn Boost!");
  }
  if (state.bestStreak >= 3) {
    awardBadge("combo", "Badge upplåst: Combo Cube!");
  }
  if (state.textWins >= 3) {
    awardBadge("creator", "Badge upplåst: Text Titan!");
  }
  if (state.hardWins >= 2) {
    awardBadge("boss", "Badge upplåst: Boss Rush!");
  }

  const eidQuestions = questions.filter((question) => question.category === "Högtider");
  if (eidQuestions.length > 0 && eidQuestions.every((question) => state.questionResults[question.id] === true)) {
    awardBadge("eid", "Badge upplåst: Eid Expert!");
  }

  if (state.answers.length === questions.length && state.score === questions.length) {
    awardBadge("perfect", "Badge upplåst: Perfect Run!");
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
  const isText = current?.type === "text";
  [...elements.doorTrack.querySelectorAll(".door-card")].forEach((door) => {
    door.disabled = disabled || !aiReady;
  });
  elements.moveLeftButton.disabled = disabled || !aiReady || !current;
  elements.moveRightButton.disabled = disabled || !aiReady || !current;
  elements.jumpButton.disabled = disabled || !aiReady || !current;
  elements.openDoorButton.disabled = disabled || !aiReady;
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
        playerName: elements.playerName.value.trim() || "Roblox-stjärna"
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
    <b>Rätt svar:</b> ${escapeHtml(grade.correct_answer || question.correctAnswer || "")}
    <br />
    <b>Nästa steg:</b> ${escapeHtml(grade.coach_tip || "Bra jobbat, fortsätt så.")}
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
    return "Mekka Master";
  }
  if (ratio >= 0.8) {
    return "Koran Keeper";
  }
  if (ratio >= 0.6) {
    return "Moskémästare";
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
  elements.difficultyPill.textContent = mode.textOnly ? "Final" : "Mix";
  elements.difficultyPill.className = `difficulty-pill ${mode.textOnly ? "hard" : "medium"}`;
  elements.answerModePill.textContent = mode.name;
  elements.questionText.textContent = `${elements.playerName.value || "Spelare"}, ${character.name} klarade runnen!`;
  elements.stageTitle.textContent = "Segerportalen";
  elements.stageInstruction.textContent = "Du klarade banan";
  updateWorldStrip();
  elements.platformLayer.innerHTML = "";
  elements.doorTrack.innerHTML = `
    <div class="door-card active" style="left:42%; bottom:${worldConfig.groundHeight + 24}px;">
      <div class="door-top">GG</div>
      <p>${escapeHtml(character.name)} tog sig genom hela ${mode.name}.</p>
    </div>
  `;
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
      "<div class=\"badge-icon\">GG</div><div><strong>Allt satt!</strong><span>Du svarade rätt på varje fråga i hela obbyn.</span></div>";
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

elements.nextButton.addEventListener("click", goToNextQuestion);
elements.restartTopButton.addEventListener("click", startGame);
elements.playAgainButton.addEventListener("click", startGame);
elements.saveNameButton.addEventListener("click", savePlayerName);
elements.standardModeButton.addEventListener("click", () => setMode("standard"));
elements.finalModeButton.addEventListener("click", () => setMode("final"));
elements.moveLeftButton.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  setMoveInput("left", true);
});
elements.moveRightButton.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  setMoveInput("right", true);
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
startGame();
