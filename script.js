// Basic quiz data
const QUESTIONS = [
  {
    text: "Which HTML tag is used to define a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    correctIndex: 0,
  },
  {
    text: "Which CSS property controls the text size?",
    options: ["font-style", "font-weight", "text-size", "font-size"],
    correctIndex: 3,
  },
  {
    text: "Inside which HTML element do we put the JavaScript?",
    options: ["<javascript>", "<js>", "<script>", "<code>"],
    correctIndex: 2,
  },
  {
    text: "Which symbol is used for comments in JavaScript (single line)?",
    options: ["//", "/* */", "#", "<!-- -->"],
    correctIndex: 0,
  },
  {
    text: "Which CSS property is used to change the background color?",
    options: ["color", "bg-color", "background-color", "background-image"],
    correctIndex: 2,
  },
  {
    text: "Which array method adds an element to the end of an array in JavaScript?",
    options: ["push()", "pop()", "shift()", "concat()"],
    correctIndex: 0,
  },
  {
    text: "Which HTML tag is used to display the largest heading?",
    options: ["<h3>", "<heading>", "<h1>", "<head>"],
    correctIndex: 2,
  },
  {
    text: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets",
    ],
    correctIndex: 1,
  },
  {
    text: "Which JavaScript keyword is used to declare a variable that can change?",
    options: ["const", "let", "static", "define"],
    correctIndex: 1,
  },
  {
    text: "Which HTML attribute is used to define inline styles?",
    options: ["style", "class", "id", "css"],
    correctIndex: 0,
  },
];

// DOM elements
const views = {
  login: document.getElementById("login-view"),
  quiz: document.getElementById("quiz-view"),
  result: document.getElementById("result-view"),
  leaderboard: document.getElementById("leaderboard-view"),
  learn: document.getElementById("learn-view"),
  daily: document.getElementById("daily-view"),
  dashboard: document.getElementById("dashboard-view"),
};

const navButtons = document.querySelectorAll(".nav-btn");

const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const dashboardUsernameEl = document.getElementById("dashboard-username");
const dashboardTiles = document.querySelectorAll(".dashboard-tile");

// Learn page DOM
const learnTopicsGrid = document.getElementById("learn-topics-grid");
const learnTopicDetail = document.getElementById("learn-topic-detail");
const learnTopicTitle = document.getElementById("learn-topic-title");
const learnTopicDescription = document.getElementById("learn-topic-description");
const learnTopicExplanation = document.getElementById("learn-topic-explanation");
const learnTopicKeypoints = document.getElementById("learn-topic-keypoints");
const learnTopicExamples = document.getElementById("learn-topic-examples");
const learnTopicFlashcards = document.getElementById("learn-topic-flashcards");
const learnTopicPractice = document.getElementById("learn-topic-practice");
const learnBackBtn = document.getElementById("learn-back-btn");
const learnStartQuizBtn = document.getElementById("learn-start-quiz-btn");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionProgress = document.getElementById("question-progress");
const questionTimer = document.getElementById("question-timer");
const liveScoreLabel = document.getElementById("live-score");
const nextBtn = document.getElementById("next-btn");
const competitionStatusEl = document.getElementById("competition-status");

const finalScoreEl = document.getElementById("final-score");
const correctCountEl = document.getElementById("correct-count");
const wrongCountEl = document.getElementById("wrong-count");
const percentageEl = document.getElementById("percentage");
const restartBtn = document.getElementById("restart-btn");
const viewLeaderboardBtn = document.getElementById("view-leaderboard-btn");

const leaderboardBody = document.getElementById("leaderboard-body");
const backToLoginBtn = document.getElementById("back-to-login-btn");

// Daily challenge DOM
const dailyStatusMessage = document.getElementById("daily-status-message");
const dailyStartBtn = document.getElementById("daily-start-btn");
const dailyCountdownWrapper = document.getElementById("daily-countdown-wrapper");
const dailyCountdownEl = document.getElementById("daily-countdown");

// Quiz state
let currentUser = null;
let currentQuestionIndex = 0;
let currentQuestionSet = QUESTIONS;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let timerId = null;
let remainingTime = 15;
let hasAnsweredCurrent = false;
let isDailyMode = false;
let dailyCountdownId = null;
let currentLearnTopicId = null;

const QUESTION_TIME = 15; // seconds
const POINTS_PER_CORRECT = 10;
const DAILY_ATTEMPT_KEY_PREFIX = "quiz_arena_daily_attempt_";
const DAILY_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

// Learn topics content
const LEARN_TOPICS = [
  {
    id: "science",
    icon: "🔬",
    title: "Science",
    description: "Explore the basics of physics, chemistry, and biology.",
    explanation:
      "Science helps us understand how the world works by observing, experimenting, and explaining natural phenomena.",
    keypoints: [
      "Physics studies matter, energy, motion, and forces.",
      "Chemistry focuses on substances, their reactions, and properties.",
      "Biology is the study of living organisms and life processes.",
    ],
    examples: [
      "Gravity pulls objects towards the Earth.",
      "Water (H₂O) is made from hydrogen and oxygen.",
      "Plants use photosynthesis to convert sunlight into energy.",
    ],
    flashcards: [
      {
        question: "What is the process by which plants make their own food?",
        answer: "Photosynthesis.",
      },
      {
        question: "What force keeps planets in orbit around the sun?",
        answer: "Gravity.",
      },
    ],
    practiceQuestions: [
      {
        question: "Which of these is NOT a state of matter?",
        options: ["Solid", "Liquid", "Gas", "Light"],
        correctIndex: 3,
      },
      {
        question: "Which gas do humans need to breathe to stay alive?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        correctIndex: 0,
      },
      {
        question: "Which organ pumps blood throughout the human body?",
        options: ["Brain", "Heart", "Lungs", "Liver"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "math",
    icon: "➗",
    title: "Mathematics",
    description: "Strengthen your skills with numbers, shapes, and patterns.",
    explanation:
      "Mathematics is the language of patterns, quantities, and logical relationships, used in nearly every field.",
    keypoints: [
      "Arithmetic deals with basic operations like addition and subtraction.",
      "Algebra uses symbols and letters to represent numbers and relationships.",
      "Geometry focuses on shapes, sizes, and positions of figures.",
    ],
    examples: [
      "An equation like 2x + 3 = 7 can be solved to find x.",
      "The sum of angles in a triangle is always 180°.",
      "Percentages are another way to write fractions and decimals.",
    ],
    flashcards: [
      {
        question: "What is 7 × 8?",
        answer: "56.",
      },
      {
        question: "What is the value of π (pi) approximately?",
        answer: "About 3.14.",
      },
    ],
    practiceQuestions: [
      {
        question: "What is 15 + 27?",
        options: ["32", "40", "42", "44"],
        correctIndex: 2,
      },
      {
        question: "A triangle has angles 40° and 60°. What is the third angle?",
        options: ["60°", "70°", "80°", "90°"],
        correctIndex: 2,
      },
      {
        question: "What is 1/2 written as a percentage?",
        options: ["25%", "40%", "50%", "75%"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "tech",
    icon: "💻",
    title: "Technology",
    description: "Learn core ideas behind computers, the web, and coding.",
    explanation:
      "Technology uses scientific knowledge to create tools, systems, and devices that solve real-world problems.",
    keypoints: [
      "Hardware is the physical part of a computer (like CPU, RAM, and disk).",
      "Software is the code and programs that run on hardware.",
      "The internet connects millions of computers around the world.",
    ],
    examples: [
      "A web browser (like Chrome) is software used to access websites.",
      "Smartphones combine hardware (screen, battery) and software (apps).",
      "Programming languages like JavaScript and Python tell computers what to do.",
    ],
    flashcards: [
      {
        question: "What does CPU stand for?",
        answer: "Central Processing Unit.",
      },
      {
        question: "What does HTML stand for?",
        answer: "HyperText Markup Language.",
      },
    ],
    practiceQuestions: [
      {
        question: "Which of these is an example of software?",
        options: ["Keyboard", "Monitor", "Web browser", "CPU"],
        correctIndex: 2,
      },
      {
        question: "Which device is used to store long-term data on a computer?",
        options: ["RAM", "Hard drive / SSD", "CPU", "Mouse"],
        correctIndex: 1,
      },
      {
        question: "Which language is commonly used for web development?",
        options: ["HTML", "Photoshop", "Excel", "PowerPoint"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "gk",
    icon: "🌍",
    title: "General Knowledge",
    description: "Discover facts about the world, history, and important events.",
    explanation:
      "General knowledge covers a wide range of topics like countries, history, culture, and current affairs.",
    keypoints: [
      "Countries have capitals, flags, and unique cultures.",
      "Historical events shape the modern world.",
      "Knowing general facts helps in exams and conversations.",
    ],
    examples: [
      "The capital of France is Paris.",
      "The Great Wall of China is a famous landmark.",
      "The Earth orbits the Sun once every year.",
    ],
    flashcards: [
      {
        question: "What is the largest ocean on Earth?",
        answer: "The Pacific Ocean.",
      },
      {
        question: "Which continent is India in?",
        answer: "Asia.",
      },
    ],
    practiceQuestions: [
      {
        question: "Which is the longest river in the world?",
        options: ["Amazon", "Nile", "Ganges", "Yangtze"],
        correctIndex: 1,
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Jupiter", "Mars", "Saturn"],
        correctIndex: 2,
      },
      {
        question: "Which country is famous for the Eiffel Tower?",
        options: ["Italy", "France", "Spain", "Germany"],
        correctIndex: 1,
      },
    ],
  },
];

function switchView(viewName) {
  Object.values(views).forEach((v) => v.classList.remove("active-view"));

  if (viewName === "login") views.login.classList.add("active-view");
  if (viewName === "quiz") views.quiz.classList.add("active-view");
  if (viewName === "result") views.result.classList.add("active-view");
  if (viewName === "leaderboard") views.leaderboard.classList.add("active-view");
  if (viewName === "learn") views.learn.classList.add("active-view");
  if (viewName === "daily") views.daily.classList.add("active-view");
  if (viewName === "dashboard") views.dashboard.classList.add("active-view");

  if (viewName !== "daily") {
    clearDailyCountdown();
  }
}

// LOGIN
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  if (!username) return;
  currentUser = username;
  if (dashboardUsernameEl) {
    dashboardUsernameEl.textContent = currentUser;
  }
  switchView("dashboard");
});

// NAVIGATION BUTTONS (header)
navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-view");
    if (target === "login-view") {
      resetQuizState();
      switchView("login");
    }
    if (target === "dashboard-view") {
      if (currentUser && dashboardUsernameEl) {
        dashboardUsernameEl.textContent = currentUser;
      }
      switchView("dashboard");
    }
    if (target === "leaderboard-view") {
      loadLeaderboard();
      switchView("leaderboard");
    }
    if (target === "learn-view") {
      switchView("learn");
    }
    if (target === "quiz-view") {
      startQuiz();
    }
    if (target === "daily-view") {
      if (!currentUser) {
        switchView("login");
        return;
      }
      setupDailyView();
      switchView("daily");
    }
  });
});

backToLoginBtn.addEventListener("click", () => {
  switchView("login");
});

// DASHBOARD TILE ACTIONS
dashboardTiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    const action = tile.dataset.action;
    if (action === "learn") {
      switchView("learn");
      return;
    }
    if (action === "quiz") {
      startQuiz();
      return;
    }
    if (action === "daily") {
      if (!currentUser) {
        switchView("login");
        return;
      }
      setupDailyView();
      switchView("daily");
      return;
    }
    if (action === "leaderboard") {
      loadLeaderboard();
      switchView("leaderboard");
    }
  });
});

// LEARN PAGE LOGIC
function renderLearnTopics() {
  if (!learnTopicsGrid) return;
  learnTopicsGrid.innerHTML = "";
  LEARN_TOPICS.forEach((topic) => {
    const card = document.createElement("button");
    card.className = "learn-topic-card";
    card.dataset.topicId = topic.id;

    card.innerHTML = `
      <div class="learn-topic-icon">${topic.icon}</div>
      <div class="learn-topic-content">
        <h3 class="learn-topic-title">${topic.title}</h3>
        <p class="learn-topic-description">${topic.description}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      showLearnTopic(topic.id);
    });

    learnTopicsGrid.appendChild(card);
  });
}

function showLearnTopic(topicId) {
  const topic = LEARN_TOPICS.find((t) => t.id === topicId);
  if (!topic || !learnTopicDetail) return;
  currentLearnTopicId = topicId;

  // Fill main fields
  if (learnTopicTitle) learnTopicTitle.textContent = `${topic.icon} ${topic.title}`;
  if (learnTopicDescription) learnTopicDescription.textContent = topic.description;
  if (learnTopicExplanation) learnTopicExplanation.textContent = topic.explanation;

  // Key points
  if (learnTopicKeypoints) {
    learnTopicKeypoints.innerHTML = "";
    topic.keypoints.forEach((kp) => {
      const li = document.createElement("li");
      li.textContent = kp;
      learnTopicKeypoints.appendChild(li);
    });
  }

  // Examples
  if (learnTopicExamples) {
    learnTopicExamples.innerHTML = "";
    topic.examples.forEach((ex) => {
      const exCard = document.createElement("div");
      exCard.className = "learn-example-card";
      exCard.textContent = ex;
      learnTopicExamples.appendChild(exCard);
    });
  }

  // Flashcards
  if (learnTopicFlashcards) {
    learnTopicFlashcards.innerHTML = "";
    topic.flashcards.forEach((fc) => {
      const card = document.createElement("div");
      card.className = "flashcard";
      card.innerHTML = `
        <div class="flashcard-inner">
          <div class="flashcard-face flashcard-front">
            <p>${fc.question}</p>
          </div>
          <div class="flashcard-face flashcard-back">
            <p>${fc.answer}</p>
          </div>
        </div>
      `;
      card.addEventListener("click", () => {
        card.classList.toggle("flipped");
      });
      learnTopicFlashcards.appendChild(card);
    });
  }

  // Practice questions
  if (learnTopicPractice) {
    learnTopicPractice.innerHTML = "";
    topic.practiceQuestions.forEach((pq, idx) => {
      const block = document.createElement("div");
      block.className = "practice-question-block";

      const qEl = document.createElement("p");
      qEl.className = "practice-question-text";
      qEl.textContent = `${idx + 1}. ${pq.question}`;
      block.appendChild(qEl);

      const optionsWrapper = document.createElement("div");
      optionsWrapper.className = "practice-options";

      pq.options.forEach((opt, optIdx) => {
        const btn = document.createElement("button");
        btn.className = "practice-option-btn";
        btn.textContent = opt;
        btn.addEventListener("click", () => {
          handlePracticeAnswerClick(optionsWrapper, optIdx, pq.correctIndex);
        });
        optionsWrapper.appendChild(btn);
      });

      block.appendChild(optionsWrapper);
      learnTopicPractice.appendChild(block);
    });
  }

  // Show detail, hide grid
  if (learnTopicsGrid) learnTopicsGrid.classList.add("hidden");
  learnTopicDetail.classList.remove("hidden");
}

function handlePracticeAnswerClick(wrapper, selectedIndex, correctIndex) {
  const buttons = wrapper.querySelectorAll(".practice-option-btn");
  buttons.forEach((btn, idx) => {
    btn.classList.add("disabled");
    if (idx === correctIndex) {
      btn.classList.add("correct");
    }
    if (idx === selectedIndex && idx !== correctIndex) {
      btn.classList.add("wrong");
    }
  });
}

if (learnBackBtn) {
  learnBackBtn.addEventListener("click", () => {
    if (learnTopicDetail) learnTopicDetail.classList.add("hidden");
    if (learnTopicsGrid) learnTopicsGrid.classList.remove("hidden");
    currentLearnTopicId = null;
  });
}

if (learnStartQuizBtn) {
  learnStartQuizBtn.addEventListener("click", () => {
    startQuiz();
  });
}

// DAILY CHALLENGE HELPERS
function getDailyAttemptKey(username) {
  return `${DAILY_ATTEMPT_KEY_PREFIX}${username}`;
}

function getDailyAttemptInfo(username) {
  try {
    const raw = localStorage.getItem(getDailyAttemptKey(username));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.lastCompletedAt !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

function recordDailyAttempt(username) {
  const info = {
    lastCompletedAt: Date.now(),
  };
  localStorage.setItem(getDailyAttemptKey(username), JSON.stringify(info));
}

function hasCompletedDailyToday(username) {
  const info = getDailyAttemptInfo(username);
  if (!info) return false;
  const elapsed = Date.now() - info.lastCompletedAt;
  return elapsed < DAILY_COOLDOWN_MS;
}

function getDailyRemainingMs(username) {
  const info = getDailyAttemptInfo(username);
  if (!info) return 0;
  const elapsed = Date.now() - info.lastCompletedAt;
  const remaining = DAILY_COOLDOWN_MS - elapsed;
  return remaining > 0 ? remaining : 0;
}

function formatMsToHHMMSS(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function clearDailyCountdown() {
  if (dailyCountdownId !== null) {
    clearInterval(dailyCountdownId);
    dailyCountdownId = null;
  }
}

function startDailyCountdown(username) {
  clearDailyCountdown();
  const update = () => {
    const remaining = getDailyRemainingMs(username);
    if (remaining <= 0) {
      dailyCountdownEl.textContent = "00:00:00";
      dailyStatusMessage.textContent =
        "A new daily challenge is now available. Refresh this view to start!";
      dailyStartBtn.disabled = false;
      clearDailyCountdown();
      return;
    }
    dailyCountdownEl.textContent = formatMsToHHMMSS(remaining);
  };
  update();
  dailyCountdownId = setInterval(update, 1000);
}

function getDailyQuestionsForToday() {
  // Simple deterministic rotation of questions based on day index
  const today = new Date();
  const dayIndex = Math.floor(today.getTime() / DAILY_COOLDOWN_MS);
  const total = QUESTIONS.length;
  const dailyCount = Math.min(5, total); // Up to 5 questions per daily challenge
  const selected = [];
  for (let i = 0; i < dailyCount; i++) {
    const idx = (dayIndex + i) % total;
    selected.push(QUESTIONS[idx]);
  }
  return selected;
}

function setupDailyView() {
  if (!currentUser) {
    dailyStatusMessage.textContent = "Please log in to access the Daily Challenge.";
    dailyStartBtn.disabled = true;
    dailyCountdownWrapper.classList.add("hidden");
    clearDailyCountdown();
    return;
  }

  if (hasCompletedDailyToday(currentUser)) {
    dailyStatusMessage.textContent =
      "You have already completed today\u2019s challenge. Come back tomorrow!";
    dailyStartBtn.disabled = true;
    dailyCountdownWrapper.classList.remove("hidden");
    startDailyCountdown(currentUser);
  } else {
    dailyStatusMessage.textContent =
      "Today\u2019s challenge is ready. You will only get one attempt for the next 24 hours.";
    dailyStartBtn.disabled = false;
    dailyCountdownWrapper.classList.add("hidden");
    clearDailyCountdown();
  }
}

dailyStartBtn.addEventListener("click", () => {
  if (!currentUser) {
    switchView("login");
    return;
  }
  if (hasCompletedDailyToday(currentUser)) {
    setupDailyView();
    return;
  }
  startDailyQuiz();
});

// QUIZ LOGIC
function startQuiz() {
  isDailyMode = false;
  currentQuestionSet = QUESTIONS;
  if (competitionStatusEl) {
    competitionStatusEl.textContent = "Competition Mode: Live";
  }
  resetQuizState();
  switchView("quiz");
  renderQuestion();
  startTimer();
}

function startDailyQuiz() {
  isDailyMode = true;
  currentQuestionSet = getDailyQuestionsForToday();
  if (competitionStatusEl) {
    competitionStatusEl.textContent = "Daily Challenge Mode";
  }
  resetQuizState();
  switchView("quiz");
  renderQuestion();
  startTimer();
}

function resetQuizState() {
  currentQuestionIndex = 0;
  score = 0;
  correctCount = 0;
  wrongCount = 0;
  remainingTime = QUESTION_TIME;
  hasAnsweredCurrent = false;
  updateScoreLabel();
  clearTimer();
  nextBtn.disabled = true;
}

function renderQuestion() {
  const q = currentQuestionSet[currentQuestionIndex];
  questionText.textContent = q.text;

  // Progress display
  questionProgress.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestionSet.length}`;

  // Reset options
  optionsContainer.innerHTML = "";
  const labels = ["A", "B", "C", "D"];

  q.options.forEach((opt, idx) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.dataset.index = String(idx);
    button.dataset.label = labels[idx];
    button.textContent = opt;
    button.addEventListener("click", () => handleOptionClick(idx));
    optionsContainer.appendChild(button);
  });

  // Reset state for the new question
  remainingTime = QUESTION_TIME;
  hasAnsweredCurrent = false;
  nextBtn.disabled = true;
}

function handleOptionClick(selectedIndex) {
  if (hasAnsweredCurrent) return;
  hasAnsweredCurrent = true;

  const currentQuestion = currentQuestionSet[currentQuestionIndex];
  const correctIndex = currentQuestion.correctIndex;

  const optionButtons = optionsContainer.querySelectorAll(".option-btn");

  optionButtons.forEach((btn) => {
    const idx = Number(btn.dataset.index);
    btn.classList.add("disabled");
    if (idx === correctIndex) {
      btn.classList.add("correct");
    }
    if (idx === selectedIndex && idx !== correctIndex) {
      btn.classList.add("wrong");
    }
  });

  if (selectedIndex === correctIndex) {
    correctCount++;
    score += POINTS_PER_CORRECT;
    pulseScore();
  } else {
    wrongCount++;
  }

  updateScoreLabel();
  clearTimer();
  nextBtn.disabled = false;
}

function pulseScore() {
  liveScoreLabel.classList.add("score-pulse");
  setTimeout(() => {
    liveScoreLabel.classList.remove("score-pulse");
  }, 400);
}

function updateScoreLabel() {
  liveScoreLabel.textContent = `${score} pts`;
}

function startTimer() {
  clearTimer();
  remainingTime = QUESTION_TIME;
  updateTimerLabel();
  timerId = setInterval(() => {
    remainingTime--;
    updateTimerLabel();
    if (remainingTime <= 0) {
      clearTimer();
      // Treat as unanswered/wrong
      if (!hasAnsweredCurrent) {
        hasAnsweredCurrent = true;
        wrongCount++;
        // Highlight correct answer even if time ran out
        const q = currentQuestionSet[currentQuestionIndex];
        const correctIndex = q.correctIndex;
        const optionButtons = optionsContainer.querySelectorAll(".option-btn");
        optionButtons.forEach((btn) => {
          const idx = Number(btn.dataset.index);
          btn.classList.add("disabled");
          if (idx === correctIndex) {
            btn.classList.add("correct");
          }
        });
      }
      nextBtn.disabled = false;
    }
  }, 1000);
}

function clearTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function updateTimerLabel() {
  questionTimer.textContent = `${remainingTime}s`;
  if (remainingTime <= 5) {
    questionTimer.style.color = "#f97373";
  } else {
    questionTimer.style.color = "#e5e7eb";
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < currentQuestionSet.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
    startTimer();
  } else {
    finishQuiz();
  }
});

function finishQuiz() {
  clearTimer();
  const totalQuestions = currentQuestionSet.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  finalScoreEl.textContent = score;
  correctCountEl.textContent = correctCount;
  wrongCountEl.textContent = wrongCount;
  percentageEl.textContent = `${percentage}%`;

  // Save to leaderboard
  if (currentUser) {
    saveToLeaderboard(currentUser, score);
  }

  // Record daily attempt if this was a daily challenge
  if (isDailyMode && currentUser) {
    recordDailyAttempt(currentUser);
  }

  switchView("result");
}

// RESULT ACTIONS
restartBtn.addEventListener("click", () => {
  startQuiz();
});

viewLeaderboardBtn.addEventListener("click", () => {
  loadLeaderboard();
  switchView("leaderboard");
});

// LEADERBOARD (localStorage)
const LEADERBOARD_KEY = "quiz_arena_leaderboard";

function getLeaderboard() {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveToLeaderboard(username, scoreValue) {
  const list = getLeaderboard();
  list.push({
    username,
    score: scoreValue,
    date: Date.now(),
  });

  // Sort descending by score, then by newest
  list.sort((a, b) => {
    if (b.score === a.score) {
      return b.date - a.date;
    }
    return b.score - a.score;
  });

  // keep only top 10
  const trimmed = list.slice(0, 10);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed));
}

function loadLeaderboard() {
  const list = getLeaderboard();
  leaderboardBody.innerHTML = "";

  if (list.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 3;
    cell.textContent = "No games played yet. Be the first to set a score!";
    row.appendChild(cell);
    leaderboardBody.appendChild(row);
    return;
  }

  list.forEach((entry, index) => {
    const row = document.createElement("tr");

    const rankCell = document.createElement("td");
    rankCell.textContent = `#${index + 1}`;

    const userCell = document.createElement("td");
    userCell.textContent = entry.username;

    const scoreCell = document.createElement("td");
    scoreCell.textContent = `${entry.score} pts`;

    row.appendChild(rankCell);
    row.appendChild(userCell);
    row.appendChild(scoreCell);

    leaderboardBody.appendChild(row);
  });
}

// Initial leaderboard load if user opens it directly
loadLeaderboard();

// Initial learn topics render
renderLearnTopics();
