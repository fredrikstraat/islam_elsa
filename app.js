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
const runPlan = {
  easy: 6,
  medium: 6,
  hard: 6
};

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

const scoreRules = {
  correct: { score: 1, xp: (streak) => 14 + Math.min(streak * 2, 12), gems: (streak) => 10 + Math.max(streak - 1, 0) * 2 },
  almost: { score: 0, xp: () => 8, gems: () => 4 },
  incorrect: { score: 0, xp: () => 2, gems: () => 1 }
};

const elements = {
  playerName: document.querySelector("#playerName"),
  saveNameButton: document.querySelector("#saveNameButton"),
  welcomeText: document.querySelector("#welcomeText"),
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

function buildQuestionRun(allQuestions) {
  const grouped = {
    easy: [],
    medium: [],
    hard: []
  };

  allQuestions.forEach((question) => {
    grouped[normalizeDifficulty(question.difficulty)].push(question);
  });

  const ordered = [];
  for (const difficulty of ["easy", "medium", "hard"]) {
    ordered.push(...shuffle(grouped[difficulty]).slice(0, runPlan[difficulty]));
  }

  const selectedIds = new Set(ordered.map((question) => question.id));
  const leftovers = shuffle(allQuestions.filter((question) => !selectedIds.has(question.id)));
  const targetCount = Object.values(runPlan).reduce((sum, count) => sum + count, 0);

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

async function loadQuestions() {
  const response = await fetch("./questions.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Kunde inte ladda quizfrågorna.");
  }

  const loaded = await response.json();
  return buildQuestionRun(loaded);
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
  elements.answerModePill.textContent = current.type === "text" ? "Textfråga" : "Flervalsfråga";
  elements.nextButton.disabled = true;
  elements.choices.innerHTML = "";
  elements.textAnswer.value = "";
  elements.textAnswerPanel.hidden = current.type !== "text";
  elements.submitTextButton.disabled = false;
  elements.feedbackBox.className = "feedback-box";
  elements.feedbackBox.innerHTML = `
    <strong>${difficultyInfo.intro}</strong>
    ${current.type === "text" ? "Skriv ett kort svar och skicka det till AI-domaren." : "Tryck på det svar du tror stämmer med faktatexten."}
  `;

  if (current.type === "choice") {
    current.options.forEach((option) => {
      const button = document.createElement("button");
      button.className = "choice-button";
      button.type = "button";
      button.textContent = option;
      button.disabled = !isAiReady();
      button.addEventListener("click", () => gradeAnswer(option));
      elements.choices.append(button);
    });
  }

  if (!isAiReady()) {
    if (current.type === "text") {
      elements.submitTextButton.disabled = true;
      elements.textAnswer.disabled = true;
    } else {
      [...elements.choices.querySelectorAll(".choice-button")].forEach((button) => {
        button.disabled = true;
      });
    }
    renderOfflineHint();
  } else {
    elements.textAnswer.disabled = current.type !== "text";
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

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 2200);
}

function setInteractionDisabled(disabled) {
  [...elements.choices.querySelectorAll(".choice-button")].forEach((button) => {
    button.disabled = disabled;
  });
  elements.textAnswer.disabled = disabled || elements.textAnswerPanel.hidden;
  elements.submitTextButton.disabled = disabled;
}

function markChoiceButtons(userAnswer, correctAnswer) {
  [...elements.choices.querySelectorAll(".choice-button")].forEach((button) => {
    button.disabled = true;
    if (button.textContent === userAnswer) {
      button.classList.add("selected");
    }
    if (button.textContent === correctAnswer) {
      button.classList.add("correct");
    }
    if (button.textContent === userAnswer && userAnswer !== correctAnswer) {
      button.classList.add("wrong");
    }
  });
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
    setInteractionDisabled(false);
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
    markChoiceButtons(userAnswer, grade.correct_answer || question.correctAnswer);
  }

  const feedbackClass = verdict === "correct" ? "good" : verdict === "almost" ? "okay" : "bad";
  elements.feedbackBox.className = `feedback-box ${feedbackClass}`;
  elements.feedbackBox.innerHTML = `
    <strong>${escapeHtml(grade.feedback_title || "Svar bedömt")} +${rewards.xp} XP</strong>
    ${escapeHtml(grade.feedback_text || "")}
    <br />
    <b>Rätt svar:</b> ${escapeHtml(grade.correct_answer || question.correctAnswer || "")}
    <br />
    <b>Coach:</b> ${escapeHtml(grade.coach_tip || "Bra jobbat, fortsätt så.")}
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
  const notPerfect = state.answers.filter((answer) => answer.verdict !== "correct");

  elements.categoryPill.textContent = "Målgång";
  elements.questionCount.textContent = `Klar! ${state.score} / ${questions.length}`;
  elements.difficultyPill.textContent = "Mix";
  elements.difficultyPill.className = "difficulty-pill medium";
  elements.answerModePill.textContent = "Run clear";
  elements.questionText.textContent = `${elements.playerName.value || "Spelare"}, din run är klar.`;
  elements.choices.innerHTML = "";
  elements.textAnswerPanel.hidden = true;
  elements.feedbackBox.className = "feedback-box good";
  elements.feedbackBox.innerHTML = `<strong>GG!</strong> Du samlade ${state.xp} XP, ${state.gems} gems, ${state.textWins} textvinster och ${state.hardWins} boss-segrar.`;
  elements.nextButton.disabled = true;

  elements.resultTitle.textContent = rankPlayer();
  elements.resultSummary.textContent = `Du fick ${state.score} helt rätta svar av ${questions.length}, nådde nivå ${getLevel()}, klarade ${state.hardWins} svåra frågor och hade som bäst en streak på ${state.bestStreak}. ${
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
  state = makeInitialState();
  updateHud();
  renderQuests();
  renderBadges();

  try {
    questions = await loadQuestions();
    await refreshAiStatus();
    renderQuestion();
    showToast("Ny AI-run startad.");
  } catch (error) {
    elements.feedbackBox.className = "feedback-box bad";
    elements.feedbackBox.innerHTML = `
      <strong>Appen kunde inte starta.</strong>
      ${escapeHtml(error.message || "Kunde inte ladda frågorna.")}
    `;
  }
}

elements.nextButton.addEventListener("click", goToNextQuestion);
elements.restartTopButton.addEventListener("click", startGame);
elements.playAgainButton.addEventListener("click", startGame);
elements.saveNameButton.addEventListener("click", savePlayerName);
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

loadPlayerName();
startGame();
