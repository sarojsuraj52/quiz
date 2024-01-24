function playAgain() {
  // Redirect to the quiz page for a new quiz
  window.location.href = "../index.html";
}
// Retrieve the score from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const finalScore = urlParams.get("score");

// Calculate correct and incorrect counts based on the score out of 10
const totalQuestions = 10;
const correctCount = Math.round((finalScore / 10) * totalQuestions);
const incorrectCount = totalQuestions - correctCount;

// Display the final score, correct count, and incorrect count on the result page
const finalScoreElement = document.getElementById("final-score");
finalScoreElement.textContent = finalScore;

const correctCountElement = document.getElementById("correct-count");
correctCountElement.textContent = correctCount;

const incorrectCountElement = document.getElementById("incorrect-count");
incorrectCountElement.textContent = incorrectCount;

// Display a comment based on the final score
const commentTextElement = document.getElementById("comment-text");
if (finalScore >= 8) {
  commentTextElement.textContent = "Wow! You're a Quiz Master!";
} else if (finalScore >= 5) {
  commentTextElement.textContent = "Great job! You know your stuff!";
} else {
  commentTextElement.textContent = "Keep learning! You'll get better!";
}

// Dynamically create fireflies
for (let i = 0; i < 40; i++) {
  createFirefly();
}

function createFirefly() {
  const firefly = document.createElement("div");
  firefly.className = "firefly";
  const maxX = window.innerWidth;
  const maxY = window.innerHeight;
  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;
  firefly.style.left = `${randomX}px`;
  firefly.style.top = `${randomY}px`;
  document.body.appendChild(firefly);
}
