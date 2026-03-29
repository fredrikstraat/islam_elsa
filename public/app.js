const state = {
  questions: [],
  currentQuestion: null,
  answeredIds: new Set(),
  focusAnsweredIds: new Set(),
  focusTarget: 0
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
const coachPanel = document.querySelector("#coachPanel");
const coachMeaning = document.querySelector("#coachMeaning");
const coachStep = document.querySelector("#coachStep");
const coachStarterText = document.querySelector("#coachStarter");
const coachBook = document.querySelector("#coachBook");
const coachWords = document.querySelector("#coachWords");
const feedbackPanel = document.querySelector("#feedbackPanel");
const feedbackTitle = document.querySelector("#feedbackTitle");
const gradeBadge = document.querySelector("#gradeBadge");
const strengthList = document.querySelector("#strengthList");
const nextStepText = document.querySelector("#nextStepText");
const miniHintText = document.querySelector("#miniHintText");
const idealAnswerText = document.querySelector("#idealAnswerText");
const feedbackEmpty = document.querySelector("#feedbackEmpty");
const practiceProgress = document.querySelector("#practiceProgress");
const progressCaption = document.querySelector("#progressCaption");

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Något gick fel.");
  }

  return data;
}

function showStatus(message, tone = "info") {
  statusBanner.textContent = message;
  statusBanner.className = `status-banner tone-${tone}`;
}

function hideStatus() {
  statusBanner.className = "status-banner is-hidden";
  statusBanner.textContent = "";
}

function resetFeedback() {
  feedbackPanel.classList.add("is-empty");
  feedbackEmpty.classList.remove("is-hidden");
  feedbackTitle.textContent =
    "Här ser Elsa direkt vad som redan sitter och vad som ska läggas till.";
  gradeBadge.textContent = "-";
  gradeBadge.dataset.band = "";
  strengthList.innerHTML = "";
  nextStepText.textContent = "";
  miniHintText.textContent = "";
  idealAnswerText.textContent = "";
}

function resetCoachPanel() {
  coachPanel.classList.add("is-hidden");
  coachMeaning.textContent = "";
  coachStep.textContent = "";
  coachStarterText.textContent = "";
  coachBook.textContent = "";
  coachWords.textContent = "";
  coachButton.disabled = false;
  coachButton.textContent = "Jag behöver coach-hjälp";
}

function chooseNextQuestion() {
  if (state.questions.length === 0) {
    return;
  }

  const unansweredFocus = state.questions.filter(
    (question) => question.isFocus && !state.focusAnsweredIds.has(question.id)
  );
  const unansweredOthers = state.questions.filter(
    (question) => !state.answeredIds.has(question.id)
  );
  const nonCurrent = state.questions.filter(
    (question) => question.id !== state.currentQuestion?.id
  );

  let chosenPool = [];

  if (unansweredFocus.length > 0) {
    chosenPool = unansweredFocus;
  } else if (unansweredOthers.length > 0) {
    chosenPool = unansweredOthers;
  } else if (nonCurrent.length > 0) {
    chosenPool = nonCurrent;
  } else {
    chosenPool = state.questions;
  }

  const randomIndex = Math.floor(Math.random() * chosenPool.length);
  state.currentQuestion = chosenPool[randomIndex];

  questionPrompt.textContent = state.currentQuestion.prompt;
  focusBadge.textContent = state.currentQuestion.focusLabel || "Viktigt till provet";
  focusBadge.classList.toggle("is-hidden", !state.currentQuestion.isFocus);
  sectionBadge.textContent = state.currentQuestion.sectionLabel;
  levelBadge.textContent = `${state.currentQuestion.level}-nivå`;
  questionHint.textContent = state.currentQuestion.hint;
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
  feedbackPanel.classList.remove("is-empty");
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
  miniHintText.textContent = feedback.miniHint;
  idealAnswerText.textContent = feedback.idealAnswer;
  answerInput.blur();
  feedbackPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderCoachHelp(coach) {
  coachPanel.classList.remove("is-hidden");
  coachMeaning.textContent = coach.questionInSimpleWords;
  coachStep.textContent = coach.firstStep;
  coachStarterText.textContent = coach.sentenceStarter;
  coachBook.textContent = coach.bookConnection;
  coachWords.textContent = coach.lookForWords.join(", ");
  coachPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

async function loadApp() {
  try {
    const [status, questions] = await Promise.all([
      fetchJson("/api/status"),
      fetchJson("/api/questions")
    ]);

    state.questions = questions.questions;
    state.focusTarget = questions.focusCount;

    if (!status.configured) {
      showStatus(
        "OpenAI-nyckel saknas just nu. Lägg in OPENAI_API_KEY i .env för coach-hjälp och bedömning.",
        "warn"
      );
    } else {
      showStatus(`OpenAI är redo. Modellen som används är ${status.model}.`, "ok");
    }

    updatePracticeProgress();
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
    renderFeedback(data.feedback);
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

loadApp();
