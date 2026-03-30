const state = {
  questions: [],
  currentQuestion: null,
  recentQuestionIds: [],
  answeredIds: new Set(),
  focusAnsweredIds: new Set(),
  focusTarget: 0,
  rewardedIds: new Set(),
  pawCount: 0,
  learningByQuestion: {},
  currentPassIds: new Set(),
  completedPasses: 0
};

const REWARD_STORAGE_KEY = "religion-elsa-paws-v1";
const REWARDED_IDS_STORAGE_KEY = "religion-elsa-rewarded-v1";
const LEARNING_PROGRESS_STORAGE_KEY = "religion-elsa-learning-v1";
const PASS_PROGRESS_STORAGE_KEY = "religion-elsa-pass-v1";
const RECENT_QUESTIONS_STORAGE_KEY = "religion-elsa-recent-questions-v1";
const RECENT_QUESTION_LIMIT = 5;
const REWARD_LEVELS = [
  { paws: 0, name: "Valpstart" },
  { paws: 6, name: "Tasskompis" },
  { paws: 14, name: "Mejas hjälpreda" },
  { paws: 24, name: "Cavapoo-pluggare" },
  { paws: 36, name: "Tassproffs" },
  { paws: 50, name: "Cavapoo-mästare" }
];
const GRADE_ORDER = {
  "Öva lite till": 0,
  "På väg": 1,
  Säkert: 2
};
const GRADE_PROGRESS = {
  "Öva lite till": 0.34,
  "På väg": 0.67,
  Säkert: 1
};

const statusBanner = document.querySelector("#statusBanner");
const questionPrompt = document.querySelector("#questionPrompt");
const focusBadge = document.querySelector("#focusBadge");
const sectionBadge = document.querySelector("#sectionBadge");
const levelBadge = document.querySelector("#levelBadge");
const questionHint = document.querySelector("#questionHint");
const answerInput = document.querySelector("#answerInput");
const checkButton = document.querySelector("#checkButton");
const coachButton = document.querySelector("#coachButton");
const nextButton = document.querySelector("#nextButton");
const coachModal = document.querySelector("#coachModal");
const coachCloseButton = document.querySelector("#coachCloseButton");
const coachMeaning = document.querySelector("#coachMeaning");
const coachStep = document.querySelector("#coachStep");
const coachStarterText = document.querySelector("#coachStarter");
const coachBook = document.querySelector("#coachBook");
const coachWords = document.querySelector("#coachWords");
const feedbackModal = document.querySelector("#feedbackModal");
const feedbackCloseButton = document.querySelector("#feedbackCloseButton");
const feedbackTitle = document.querySelector("#feedbackTitle");
const gradeBadge = document.querySelector("#gradeBadge");
const strengthList = document.querySelector("#strengthList");
const nextStepText = document.querySelector("#nextStepText");
const textReferenceText = document.querySelector("#textReferenceText");
const miniHintText = document.querySelector("#miniHintText");
const idealAnswerText = document.querySelector("#idealAnswerText");
const feedbackEmpty = document.querySelector("#feedbackEmpty");
const practiceProgress = document.querySelector("#practiceProgress");
const progressCaption = document.querySelector("#progressCaption");
const pawCount = document.querySelector("#pawCount");
const pawCaption = document.querySelector("#pawCaption");
const rewardTitle = document.querySelector("#rewardTitle");
const rewardHint = document.querySelector("#rewardHint");
const rewardToast = document.querySelector("#rewardToast");
const rewardToastTitle = document.querySelector("#rewardToastTitle");
const rewardToastText = document.querySelector("#rewardToastText");
const cavapooFill = document.querySelector("#cavapooFill");
const masteryPercent = document.querySelector("#masteryPercent");
const learningSummary = document.querySelector("#learningSummary");
const coverageStat = document.querySelector("#coverageStat");
const coverageCaption = document.querySelector("#coverageCaption");
const passStat = document.querySelector("#passStat");
const passCaption = document.querySelector("#passCaption");

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Något gick fel.");
  }

  return data;
}

function setPopupOpen(popup, open) {
  popup.classList.toggle("is-hidden", !open);
  popup.setAttribute("aria-hidden", String(!open));
  const anyPopupOpen =
    !coachModal.classList.contains("is-hidden") ||
    !feedbackModal.classList.contains("is-hidden");
  document.body.classList.toggle("popup-open", anyPopupOpen);
}

function closeAllPopups() {
  setPopupOpen(coachModal, false);
  setPopupOpen(feedbackModal, false);
}

function showStatus(message, tone = "info") {
  statusBanner.textContent = message;
  statusBanner.className = `status-banner tone-${tone}`;
}

function hideStatus() {
  statusBanner.className = "status-banner is-hidden";
  statusBanner.textContent = "";
}

function loadRewards() {
  try {
    const savedPaws = Number(localStorage.getItem(REWARD_STORAGE_KEY) || "0");
    const savedRewardedIds = JSON.parse(
      localStorage.getItem(REWARDED_IDS_STORAGE_KEY) || "[]"
    );

    state.pawCount = Number.isFinite(savedPaws) ? savedPaws : 0;
    state.rewardedIds = new Set(Array.isArray(savedRewardedIds) ? savedRewardedIds : []);
  } catch {
    state.pawCount = 0;
    state.rewardedIds = new Set();
  }
}

function saveRewards() {
  localStorage.setItem(REWARD_STORAGE_KEY, String(state.pawCount));
  localStorage.setItem(
    REWARDED_IDS_STORAGE_KEY,
    JSON.stringify([...state.rewardedIds])
  );
}

function loadLearningProgress() {
  try {
    const savedLearning = JSON.parse(
      localStorage.getItem(LEARNING_PROGRESS_STORAGE_KEY) || "{}"
    );
    const savedPassData = JSON.parse(
      localStorage.getItem(PASS_PROGRESS_STORAGE_KEY) ||
        "{\"completedPasses\":0,\"currentPassIds\":[]}"
    );

    state.learningByQuestion =
      savedLearning && typeof savedLearning === "object" ? savedLearning : {};
    state.completedPasses = Number(savedPassData.completedPasses) || 0;
    state.currentPassIds = new Set(
      Array.isArray(savedPassData.currentPassIds) ? savedPassData.currentPassIds : []
    );
  } catch {
    state.learningByQuestion = {};
    state.completedPasses = 0;
    state.currentPassIds = new Set();
  }
}

function loadRecentQuestions() {
  try {
    const savedRecent = JSON.parse(
      localStorage.getItem(RECENT_QUESTIONS_STORAGE_KEY) || "[]"
    );
    state.recentQuestionIds = Array.isArray(savedRecent)
      ? savedRecent.slice(0, RECENT_QUESTION_LIMIT)
      : [];
  } catch {
    state.recentQuestionIds = [];
  }
}

function saveRecentQuestions() {
  localStorage.setItem(
    RECENT_QUESTIONS_STORAGE_KEY,
    JSON.stringify(state.recentQuestionIds.slice(0, RECENT_QUESTION_LIMIT))
  );
}

function saveLearningProgress() {
  localStorage.setItem(
    LEARNING_PROGRESS_STORAGE_KEY,
    JSON.stringify(state.learningByQuestion)
  );
  localStorage.setItem(
    PASS_PROGRESS_STORAGE_KEY,
    JSON.stringify({
      completedPasses: state.completedPasses,
      currentPassIds: [...state.currentPassIds]
    })
  );
}

function getRewardLevelInfo() {
  let currentLevel = REWARD_LEVELS[0];
  let currentIndex = 0;

  REWARD_LEVELS.forEach((level, index) => {
    if (state.pawCount >= level.paws) {
      currentLevel = level;
      currentIndex = index;
    }
  });

  return {
    level: currentLevel,
    index: currentIndex,
    nextLevel: REWARD_LEVELS[currentIndex + 1] || null
  };
}

function updateRewardPanel() {
  const { level, nextLevel } = getRewardLevelInfo();
  const pawsLeft = nextLevel ? Math.max(nextLevel.paws - state.pawCount, 0) : 0;

  pawCount.textContent = String(state.pawCount);
  rewardTitle.textContent = level.name;
  pawCaption.textContent =
    state.pawCount === 1
      ? "Elsa har samlat 1 tass."
      : `Elsa har samlat ${state.pawCount} tassar.`;
  rewardHint.textContent = nextLevel
    ? `${pawsLeft} tassar kvar till ${nextLevel.name}.`
    : "Alla hundnivåer är upplåsta.";
}

function showRewardToast(title, text) {
  rewardToastTitle.textContent = title;
  rewardToastText.textContent = text;
  rewardToast.classList.remove("is-hidden");
}

function hideRewardToast() {
  rewardToast.classList.add("is-hidden");
  rewardToastTitle.textContent = "";
  rewardToastText.textContent = "";
}

function getPawReward(gradeBand) {
  if (gradeBand === "Säkert") {
    return 3;
  }

  if (gradeBand === "På väg") {
    return 2;
  }

  return 1;
}

function applyRewardForAnswer(questionId, gradeBand) {
  const alreadyRewarded = state.rewardedIds.has(questionId);
  const previousLevelIndex = getRewardLevelInfo().index;

  if (alreadyRewarded) {
    showRewardToast(
      "Meja hejar ändå",
      "Den här frågan är redan räknad. Nästa fråga kan ge fler tassavtryck."
    );
    return;
  }

  const pawsEarned = getPawReward(gradeBand);
  state.pawCount += pawsEarned;
  state.rewardedIds.add(questionId);
  saveRewards();
  updateRewardPanel();

  const { level, index } = getRewardLevelInfo();
  if (index > previousLevelIndex) {
    showRewardToast(
      `Ny nivå: ${level.name}!`,
      `Elsa fick ${pawsEarned} tassar och låste upp en ny hundnivå.`
    );
    return;
  }

  showRewardToast(
    `+${pawsEarned} tassar`,
    gradeBand === "Säkert"
      ? "Meja viftar extra mycket på svansen för det svaret."
      : "Bra kämpat. Små steg framåt ger också nya tassar."
  );
}

function getMasteredCount() {
  return state.questions.filter((question) => {
    const progress = state.learningByQuestion[question.id];
    return progress?.bestBand === "Säkert";
  }).length;
}

function getLearningScore() {
  return state.questions.reduce((total, question) => {
    const progress = state.learningByQuestion[question.id];
    return total + (GRADE_PROGRESS[progress?.bestBand] ?? 0);
  }, 0);
}

function getCoveredCount() {
  return state.questions.filter((question) => {
    const progress = state.learningByQuestion[question.id];
    return Boolean(progress?.attempts);
  }).length;
}

function updateLearningPanel() {
  const total = Math.max(state.questions.length, 1);
  const mastered = getMasteredCount();
  const covered = getCoveredCount();
  const currentPassCount = state.currentPassIds.size;
  const learningScore = getLearningScore();
  const percent = Math.round((learningScore / total) * 100);

  cavapooFill.style.clipPath = `inset(${100 - percent}% 0 0 0)`;
  masteryPercent.textContent = `${percent}%`;
  learningSummary.textContent =
    covered === 0
      ? "Meja börjar fyllas så fort Elsa svarar."
      : mastered === 0
        ? `Elsa är igång. ${covered} frågor är påbörjade och Meja fylls steg för steg.`
        : `Elsa har ${mastered} av ${total} frågor som sitter säkert just nu.`;
  coverageStat.textContent = `${covered} av ${total} provade`;
  coverageCaption.textContent =
    covered === total
      ? "Alla frågor från underlaget har blivit besvarade minst en gång."
      : "Ni ser hur många frågor Elsa faktiskt hunnit svara på från hela underlaget.";
  passStat.textContent =
    state.completedPasses === 1
      ? "1 helt pass"
      : `${state.completedPasses} hela pass`;
  passCaption.textContent =
    currentPassCount === 0 && state.completedPasses > 0
      ? "Nytt pass har börjat. Nu fylls nästa runda från början."
      : `${currentPassCount} av ${total} frågor i det pågående passet.`;
}

function updateLearningProgressForAnswer(questionId, gradeBand) {
  const previous = state.learningByQuestion[questionId] || {
    attempts: 0,
    bestBand: "Öva lite till"
  };
  const previousRank = GRADE_ORDER[previous.bestBand] ?? 0;
  const newRank = GRADE_ORDER[gradeBand] ?? 0;

  state.learningByQuestion[questionId] = {
    attempts: previous.attempts + 1,
    bestBand: newRank > previousRank ? gradeBand : previous.bestBand,
    lastBand: gradeBand,
    lastAnsweredAt: new Date().toISOString()
  };

  state.currentPassIds.add(questionId);

  let completedPass = false;
  if (state.currentPassIds.size >= state.questions.length && state.questions.length > 0) {
    state.completedPasses += 1;
    state.currentPassIds = new Set();
    completedPass = true;
  }

  saveLearningProgress();
  updateLearningPanel();
  return completedPass;
}

function resetFeedback() {
  setPopupOpen(feedbackModal, false);
  feedbackEmpty.classList.remove("is-hidden");
  feedbackTitle.textContent =
    "Här ser Elsa direkt vad som redan sitter och vad som ska läggas till.";
  gradeBadge.textContent = "-";
  gradeBadge.dataset.band = "";
  strengthList.innerHTML = "";
  nextStepText.textContent = "";
  textReferenceText.textContent = "";
  miniHintText.textContent = "";
  idealAnswerText.textContent = "";
  hideRewardToast();
}

function resetCoachPanel() {
  setPopupOpen(coachModal, false);
  coachMeaning.textContent = "";
  coachStep.textContent = "";
  coachStarterText.textContent = "";
  coachBook.textContent = "";
  coachWords.textContent = "";
  coachButton.disabled = false;
  coachButton.textContent = "Jag behöver coach-hjälp";
}

function lowercaseFirst(text) {
  if (!text) {
    return "";
  }

  return text.charAt(0).toLowerCase() + text.slice(1);
}

function uniqueTexts(values) {
  return [...new Set(values.filter(Boolean).map((value) => value.trim()))];
}

function getPromptOptions(question) {
  return uniqueTexts([
    question.prompt,
    `Förklara med egna ord: ${lowercaseFirst(question.prompt)}`,
    `Visa att du kan detta: ${lowercaseFirst(question.prompt)}`
  ]);
}

function getHintOptions(question) {
  return uniqueTexts([
    question.hint,
    `Tips från texten: ${question.hint}`,
    `Börja här: ${question.hint}`
  ]);
}

function pickRandomItem(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return "";
  }

  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

function buildQuestionCopy(question) {
  return {
    prompt: pickRandomItem(getPromptOptions(question)) || question.prompt,
    hint: pickRandomItem(getHintOptions(question)) || question.hint
  };
}

function rememberQuestion(questionId) {
  const withoutCurrent = state.recentQuestionIds.filter((id) => id !== questionId);
  state.recentQuestionIds = [questionId, ...withoutCurrent].slice(0, RECENT_QUESTION_LIMIT);
  saveRecentQuestions();
}

function pickBestQuestion(candidates) {
  if (candidates.length === 0) {
    return null;
  }

  const ranked = [...candidates]
    .map((question) => {
      const progress = state.learningByQuestion[question.id] || {};
      const attempts = Number(progress.attempts) || 0;
      const bandRank = GRADE_ORDER[progress.bestBand] ?? -1;
      const recencyPenalty = state.recentQuestionIds.includes(question.id) ? 7 : 0;
      const currentPenalty = question.id === state.currentQuestion?.id ? 12 : 0;
      const passPenalty = state.currentPassIds.has(question.id) ? 6 : 0;
      const focusBonus = question.isFocus ? -2 : 0;
      const score =
        attempts * 2 + bandRank * 3 + recencyPenalty + currentPenalty + passPenalty + focusBonus;

      return {
        question,
        score: score + Math.random()
      };
    })
    .sort((left, right) => left.score - right.score);

  const finalists = ranked.slice(0, Math.min(3, ranked.length));
  return finalists[Math.floor(Math.random() * finalists.length)].question;
}

function chooseQuestionPool() {
  const recentSet = new Set(state.recentQuestionIds);
  const currentId = state.currentQuestion?.id;
  const basePool = state.questions.filter((question) => question.id !== currentId);
  const freshFocus = basePool.filter(
    (question) => question.isFocus && !state.currentPassIds.has(question.id)
  );
  const freshOthers = basePool.filter(
    (question) => !question.isFocus && !state.currentPassIds.has(question.id)
  );
  const needsPractice = basePool.filter((question) => {
    const bestBand = state.learningByQuestion[question.id]?.bestBand;
    return bestBand !== "Säkert";
  });

  const pools = [freshFocus, freshOthers, needsPractice, basePool, state.questions];
  for (const pool of pools) {
    if (pool.length === 0) {
      continue;
    }

    const nonRecent = pool.filter((question) => !recentSet.has(question.id));
    if (nonRecent.length > 0) {
      return nonRecent;
    }

    return pool;
  }

  return state.questions;
}

function chooseNextQuestion() {
  if (state.questions.length === 0) {
    return;
  }

  state.currentQuestion = pickBestQuestion(chooseQuestionPool()) || state.questions[0];
  const questionCopy = buildQuestionCopy(state.currentQuestion);

  rememberQuestion(state.currentQuestion.id);

  questionPrompt.textContent = questionCopy.prompt;
  focusBadge.textContent = state.currentQuestion.focusLabel || "Viktigt till provet";
  focusBadge.classList.toggle("is-hidden", !state.currentQuestion.isFocus);
  sectionBadge.textContent = state.currentQuestion.sectionLabel;
  levelBadge.textContent = `${state.currentQuestion.level}-nivå`;
  questionHint.textContent = questionCopy.hint;
  answerInput.value = "";
  resetCoachPanel();
  resetFeedback();
  answerInput.focus();
}

function updatePracticeProgress() {
  const current = state.focusAnsweredIds.size;
  const target = Math.max(state.focusTarget, 1);
  const percent = Math.min((current / target) * 100, 100);

  practiceProgress.style.width = `${percent}%`;
  progressCaption.textContent = `${current} av ${target} fokusfrågor tränade`;
}

function renderFeedback(feedback) {
  feedbackEmpty.classList.add("is-hidden");
  feedbackTitle.textContent = feedback.encouragement;
  gradeBadge.textContent = feedback.gradeBand;
  gradeBadge.dataset.band = feedback.gradeBand;

  strengthList.innerHTML = "";
  feedback.whatWasGood.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    strengthList.appendChild(li);
  });

  nextStepText.textContent = feedback.nextStep;
  textReferenceText.textContent = feedback.textReference;
  miniHintText.textContent = feedback.miniHint;
  idealAnswerText.textContent = feedback.idealAnswer;
  setPopupOpen(feedbackModal, true);
}

function renderCoachHelp(coach) {
  coachMeaning.textContent = coach.questionInSimpleWords;
  coachStep.textContent = coach.firstStep;
  coachStarterText.textContent = coach.sentenceStarter;
  coachBook.textContent = coach.bookConnection;
  coachWords.textContent = coach.lookForWords.join(", ");
  setPopupOpen(coachModal, true);
}

async function loadApp() {
  try {
    const [status, questions] = await Promise.all([
      fetchJson("/api/status"),
      fetchJson("/api/questions")
    ]);

    state.questions = questions.questions;
    state.focusTarget = questions.focusCount;
    loadRewards();
    loadLearningProgress();
    loadRecentQuestions();

    if (!status.configured) {
      showStatus(
        "OpenAI-nyckel saknas just nu. Lägg in OPENAI_API_KEY i .env för coach-hjälp och bedömning.",
        "warn"
      );
    } else {
      showStatus(`OpenAI är redo. Modellen som används är ${status.model}.`, "ok");
    }

    updatePracticeProgress();
    updateRewardPanel();
    updateLearningPanel();
    chooseNextQuestion();
  } catch (error) {
    showStatus(error.message, "error");
  }
}

async function checkAnswer() {
  const answer = answerInput.value.trim();

  if (!state.currentQuestion) {
    showStatus("Ingen fråga laddad än.", "error");
    return;
  }

  if (answer.length < 4) {
    showStatus("Skriv lite mer först, helst en tydlig mening.", "warn");
    return;
  }

  hideStatus();
  checkButton.disabled = true;
  checkButton.textContent = "Tänker ...";

  try {
    const data = await fetchJson("/api/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        questionId: state.currentQuestion.id,
        answer
      })
    });

    state.answeredIds.add(state.currentQuestion.id);
    if (state.currentQuestion.isFocus) {
      state.focusAnsweredIds.add(state.currentQuestion.id);
    }

    updatePracticeProgress();
    const completedPass = updateLearningProgressForAnswer(
      state.currentQuestion.id,
      data.feedback.gradeBand
    );
    applyRewardForAnswer(state.currentQuestion.id, data.feedback.gradeBand);
    renderFeedback(data.feedback);

    if (completedPass) {
      showStatus("Elsa har klarat ett helt pass genom alla frågor. Snyggt jobbat!", "ok");
    }
  } catch (error) {
    showStatus(error.message, "error");
  } finally {
    checkButton.disabled = false;
    checkButton.textContent = "Kolla svar";
  }
}

async function getCoachHelp() {
  if (!state.currentQuestion) {
    showStatus("Ingen fråga laddad än.", "error");
    return;
  }

  hideStatus();
  coachButton.disabled = true;
  coachButton.textContent = "Hjälper ...";

  try {
    const data = await fetchJson("/api/coach", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        questionId: state.currentQuestion.id
      })
    });

    renderCoachHelp(data.coach);
  } catch (error) {
    showStatus(error.message, "error");
  } finally {
    coachButton.disabled = false;
    coachButton.textContent = "Jag behöver coach-hjälp";
  }
}

checkButton.addEventListener("click", checkAnswer);
coachButton.addEventListener("click", getCoachHelp);
nextButton.addEventListener("click", chooseNextQuestion);
answerInput.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    checkAnswer();
  }
});
coachCloseButton.addEventListener("click", () => {
  setPopupOpen(coachModal, false);
  answerInput.focus();
});
feedbackCloseButton.addEventListener("click", () => {
  setPopupOpen(feedbackModal, false);
  answerInput.focus();
});
document.addEventListener("click", (event) => {
  const closeTarget = event.target.closest("[data-close-popup]");
  if (!closeTarget) {
    return;
  }

  const popupName = closeTarget.getAttribute("data-close-popup");
  if (popupName === "coach") {
    setPopupOpen(coachModal, false);
  }
  if (popupName === "feedback") {
    setPopupOpen(feedbackModal, false);
  }
  answerInput.focus();
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  if (!coachModal.classList.contains("is-hidden")) {
    setPopupOpen(coachModal, false);
    answerInput.focus();
  }

  if (!feedbackModal.classList.contains("is-hidden")) {
    setPopupOpen(feedbackModal, false);
    answerInput.focus();
  }
});

loadApp();
