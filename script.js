
const questions = [
  {
    question: "Quelle est la grand ville au maroc ?",
    answers: ["casablanca", "safi", "fes", "rabat"],
    correct: 0
  },
  {
    question: "Combien 5 * 3 ?",
    answers: ["8", "10", "15", "20"],
    correct: 2
  },
  {
    question: "combien 5+13 ?",
    answers: ["12", "18", "20", "19"],
    correct: 1
  }
];

let currentQuestion = 0;
let selectedAnswers = new Array(questions.length).fill(null);

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const scoreEl = document.getElementById("score");
const playAgainBtn = document.getElementById("play-again-btn");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach((answer, i) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(i);
    if (selectedAnswers[currentQuestion] !== null) {
      btn.disabled = true;
      if (i === q.correct) btn.classList.add("correct");
      else if (i === selectedAnswers[currentQuestion]) btn.classList.add("wrong");
    }
    answersEl.appendChild(btn);
  });

  prevBtn.disabled = currentQuestion === 0;
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "Terminer " : "Suivant ";
  nextBtn.style.display = "inline-block";
  playAgainBtn.style.display = "none";
  scoreEl.textContent = "";
}

function selectAnswer(index) {
  selectedAnswers[currentQuestion] = index;
  const q = questions[currentQuestion];
  const buttons = answersEl.querySelectorAll("button");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add("correct");
    else if (i === index) btn.classList.add("wrong");
  });
}

nextBtn.onclick = () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    showScore();
  }
};

prevBtn.onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
};

function showScore() {
  const score = selectedAnswers.reduce((acc, ans, i) => {
    return ans === questions[i].correct ? acc + 1 : acc;
  }, 0);

  questionEl.textContent = "Quiz terminé ";
  answersEl.innerHTML = "";
  nextBtn.style.display = "none";
  prevBtn.style.display = "none";
  playAgainBtn.style.display = "inline-block";
  scoreEl.textContent = `Votre score : ${score} / ${questions.length}`;
}

playAgainBtn.onclick = () => {
  currentQuestion = 0;
  selectedAnswers = new Array(questions.length).fill(null);
  nextBtn.style.display = "inline-block";
  prevBtn.style.display = "inline-block";
  loadQuestion();
};

loadQuestion();
