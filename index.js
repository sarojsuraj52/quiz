// API endpoint for fetching quiz questions
const apiUrl = "https://the-trivia-api.com/v2/questions";

// Variables to keep track of the current question index and the player's score
let currentQuestionIndex = 0;
let score = 0;

// Function to fetch trivia questions from the API
async function fetchQuestions() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

// Function to display a trivia question and its options
function displayQuestion(questionData) {
    // DOM elements for question, options, score, and progress bar
    const questionContainer = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const scoreContainer = document.getElementById("score");
    const progressBar = document.getElementById("progress-bar");
  
    // Displaying the question text
    questionContainer.textContent = questionData.question.text;
  
    // Combine correct and incorrect answers and shuffle them
    const allOptions = [...questionData.incorrectAnswers, questionData.correctAnswer];
    const shuffledOptions = shuffleArray(allOptions);
  
    // Clearing previous options and setting flex direction based on option length
    optionsContainer.innerHTML = "";
    const optionsDirection = shuffledOptions.some((option) => option.length > 20) ? "column" : "row";
    optionsContainer.style.flexDirection = optionsDirection;
  
    // Creating buttons for each shuffled option and adding event listeners
    shuffledOptions.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.className = "option";
      button.addEventListener("click", () =>
        checkAnswer(button, option === questionData.correctAnswer)
      );
      optionsContainer.appendChild(button);
    });
  
    // Displaying the current score and updating progress bar
    scoreContainer.textContent = `Score: ${score} / Current Question: ${currentQuestionIndex + 1}`;
    const progressPercentage = (currentQuestionIndex / (questions.length - 1)) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  }
  
  // Function to shuffle an array using the Fisher-Yates algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  

// Function to check the player's answer and proceed to the next question
function checkAnswer(button, isCorrect) {
  const selectedAnswer = button.textContent;
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  if (selectedAnswer === correctAnswer) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("incorrect");
  }

  // Set timeout for a delay before moving to the next question
  setTimeout(() => {
    button.classList.remove("correct", "incorrect");
    currentQuestionIndex++;

    // Check if there are more questions or show the result page
    if (currentQuestionIndex < questions.length) {
      displayQuestion(questions[currentQuestionIndex]);
    } else {
      showResultPage();
    }
  }, 1000); // Delay before moving to the next question
}

// Function to reset the quiz and display the first question
function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  displayQuestion(questions[currentQuestionIndex]);
}

// Function to navigate to the result page with the final score as a query parameter
function showResultPage() {
  window.location.href = `pages/result.html?score=${score}`;
}

// Event handler for window onload to fetch questions and start the quiz
window.onload = async function () {
  questions = await fetchQuestions();
  if (questions.length > 0) {
    displayQuestion(questions[currentQuestionIndex]);
  } else {
    alert("Unable to fetch questions. Please try again later.");
  }
};
