"use strict";

let questions;

let baseURL = "https://talentflicks.com/";

let currentQuestionIndex = 0;

const userAnswers = [];

let compId;

let timerInterval;

async function fetchQuizData() {
  const apiEndpoint = `${baseURL}api/quizz/test/questions`; // Replace with your API endpoint
  try {
    const tk = sessionStorage.getItem("tok");

    const header = {
      apitoken: `${tk}`,
    };

    const response = await fetch(apiEndpoint, {
      headers: header,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json(); // Get the data from the response

    if (responseData.success) {
      // If the API call is successful, set the questions
      questions = responseData.data.items;
      // displayQuestionOrAd();
      // Now that we have the data, we can display the first question
    } else {
      console.error("Failed to fetch quiz data:", responseData.message);
    }
  } catch (error) {
    console.error("Error fetching quiz data:", error);
  }
}

async function fetchComp() {
  const apiEndpoint = `${baseURL}api/comp-details`; // Replace with your API endpoint
  try {
    const tk = sessionStorage.getItem("tok");

    const header = {
      apitoken: `${tk}`,
    };

    const response = await fetch(apiEndpoint, {
      headers: header,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json(); // Get the data from the response

    if (responseData.success) {
      // If the API call is successful, set the questions
      // displayQuestionOrAd();
      compId = responseData.data.items[0].comp_id;
      // Now that we have the data, we can display the first question
    } else {
      console.error("Failed to fetch quiz data:", responseData.message);
    }
  } catch (error) {
    console.error("Error fetching quiz data:", error);
  }
}

// Call the function to fetch data when the page loads
document.addEventListener("DOMContentLoaded", (event) => {
  fetchQuizData(); // Fetch the data and start the quiz
  fetchComp();
});

// Extract questions from the response

const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-btn");
const finishButton = document.getElementById("finish-btn");
const timerElement = document.getElementById("timer");
const adImageContainer = document.getElementById("ad-image-container");
const thanksgreeting = document.getElementById("thanks-greeting");
const homebtn = document.getElementById("home-btn");
const loader = document.querySelector(".loader-outer");
const innerQuiz = document.getElementById("inner-quiz");

// Function to display the current question or ad image
async function displayQuestionOrAd() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    const optionsHTML = currentQuestion.options
      .map(
        (option, index) => `
      <input type="radio" class="radioBtn" name="question" value="${option.qo_id}" id="option${index}">
      <label class="option" for="option${index}">${option.qo_option_value}</label><br>
    `,
      )
      .join("");

    questionContainer.innerHTML = `
      <div class="question">${questions.indexOf(currentQuestion) + 1}) ${
        currentQuestion.qt_text
      }</div>
      <div class="options">${optionsHTML}</div>
    `;

    questionContainer.style.display = "flex";
    questionContainer.style.flexDirection = "column";
    questionContainer.style.alignItems = "center";

    if (currentQuestionIndex < questions.length - 1) {
      nextButton.style.display = "block";
      finishButton.style.display = "none";
    } else {
      nextButton.style.display = "none";
      finishButton.style.display = "block";
    }

    // Start the timer for the current question
    startQuestionTimer();
    adImageContainer.style.display = "none"; // Hide ad image
  } else {
    quizContainer.style.display = "none";
    await displayAd(); // Show ad after the last question
  }
}

// Function to start the timer for the current question
function startQuestionTimer() {
  let timeLeft = 12; // 12 seconds for each question
  updateTimerUI(timeLeft);

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerUI(timeLeft);

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      handleTimeOut();
    }
  }, 1000);
}

// Function to update the timer UI
function updateTimerUI(timeLeft) {
  timerElement.textContent = `${timeLeft}`;
}

const adPosters = [
  { src: "./Images/Ban1.png", alt: "Ad 1" },
  { src: "./Images/Ban2.png", alt: "Ad 2" },
  { src: "./Images/Ban3.png", alt: "Ad 3" },
  { src: "./Images/Ban4.png", alt: "Ad 4" },
  { src: "./Images/Ban5.png", alt: "Ad 5" },
  { src: "./Images/Ban1.png", alt: "Ad 6" },
  { src: "./Images/Ban2.png", alt: "Ad 7" },
  { src: "./Images/Ban3.png", alt: "Ad 8" },
  { src: "./Images/Ban4.png", alt: "Ad 9" },
  { src: "./Images/Ban5.png", alt: "Ad 10" },
];

async function displayAd() {
  const quizIsOver = currentQuestionIndex >= questions.length - 1; // Check if quiz is over

  if (quizIsOver) {
    // If quiz is over, show the final page or final ad
    quizContainer.style.display = "none";
    adImageContainer.style.display = "block";
    setTimeout(() => {
      adImageContainer.style.display = "none";
      finishButton.style.display = "none";
      innerQuiz.style.display = "none";
      loader.style.display = "flex";
      finishQuiz();
    }, 5000);
  } else {
    // Display an ad for the current question
    const adIndex = currentQuestionIndex % adPosters.length;
    adImageContainer.innerHTML = `<img src="${adPosters[adIndex].src}" class="adImage" alt="${adPosters[adIndex].alt}">`;
    adImageContainer.style.display = "block";

    // Hide the quiz temporarily
    quizContainer.style.display = "none";
    finishButton.style.display = "none";

    // After 5 seconds, display the quiz and hide the ad
    setTimeout(() => {
      adImageContainer.style.display = "none"; // Hide ad
      quizContainer.style.display = "block"; // Show quiz
      currentQuestionIndex += 1;
      displayQuestionOrAd(); // Continue to the next question or ad
    }, 5000);
  }
}

// Function to handle when the time for a question runs out
async function handleTimeOut() {
  const selectedOption = document.querySelector(
    'input[name="question"]:checked',
  );
  // Default userAnswerId to 0 if the user didn't select an option within the time
  if (!selectedOption) {
    // Default userAnswerId to 0 if the user didn't select an option
    userAnswers.push({
      question_id: questions[currentQuestionIndex].qt_id,
      option_id: 0, // No answer selected
    });
  } else {
    userAnswers.push({
      question_id: questions[currentQuestionIndex].qt_id,
      option_id: parseInt(selectedOption.value),
    });
  }
  await displayAd();
}

// Event listener for the next button
nextButton.addEventListener("click", async () => {
  const selectedOption = document.querySelector(
    'input[name="question"]:checked',
  );
  if (!selectedOption) {
    // Default userAnswerId to 0 if the user didn't select an option
    userAnswers.push({
      question_id: questions[currentQuestionIndex].qt_id,
      option_id: 0, // No answer selected
    });
  } else {
    userAnswers.push({
      question_id: questions[currentQuestionIndex].qt_id,
      option_id: parseInt(selectedOption.value),
    });
  }

  clearInterval(timerInterval); // Stop the timer
  await displayAd();
});

// Event listener for the finish button
finishButton.addEventListener("click", async () => {
  clearInterval(timerInterval); // Stop the timer

  const selectedOption = document.querySelector(
    'input[name="question"]:checked',
  );

  if (!selectedOption) {
    // Default userAnswerId to 0 if the user didn't select an option
    userAnswers.push({
      question_id: questions[currentQuestionIndex].qt_id,
      option_id: 0, // No answer selected
    });
  } else {
    userAnswers.push({
      question_id: questions[currentQuestionIndex].qt_id,
      option_id: parseInt(selectedOption.value),
    });
  }

  await displayAd();
});

// Function to finish the quiz
async function finishQuiz() {
  // Here you can send the userAnswers array to the backend

  let url = `${baseURL}api/quizz/useranswer`;

  const tk = sessionStorage.getItem("tok");

  const testId = sessionStorage.getItem("testid");

  var postAnswer = {
    test_id: testId,
    answers: userAnswers,
  };

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apitoken: `${tk}`,
    },
    body: JSON.stringify(postAnswer),
  })
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        loader.style.display = "none";
        innerQuiz.style.display = "block";
        thanksgreeting.style.display = "block";
        homebtn.style.display = "block";
      }, 2000);
    })
    .catch((error) => {
      setTimeout(() => {
        loader.style.display = "none";
        innerQuiz.style.display = "block";
        thanksgreeting.style.display = "block";
        homebtn.style.display = "block";
      }, 2000);
    });

  // Reset the quiz or perform any other action
}

// Display the first question when the page loads

let showQuiz = async (event) => {
  event.preventDefault();
  var container1 = document.querySelector("#container1");
  var container2 = document.querySelector("#container2");
  var container3 = document.querySelector("#container3");

  displayQuestionOrAd();

  let url = `${baseURL}api/quizz/test/user`;

  const tk = sessionStorage.getItem("tok");

  var postData = {
    competition_id: compId,
    average_score: 0,
    test_score: 0,
    result: 0,
    quiz_start_by: 0,
    quiz_approved_by: 0,
  };

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apitoken: `${tk}`,
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        container1.style.display = "none";
        container2.style.display = "flex";
        container3.style.display = "none";
        sessionStorage.setItem("testid", data.data.item.id);
      } else {
        container1.style.display = "none";
        container2.style.display = "none";
        container3.style.display = "flex";
      }
    })
    .catch((error) => {});
};

let goHome = async (event) => {
  event.preventDefault();
  const tk = sessionStorage.getItem("tok");

  let url = `${baseURL}api/user/logout`;

  await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apitoken: `${tk}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        window.location.href = "index.html";
        sessionStorage.clear();
      } else {
        window.location.href = "index.html";
        sessionStorage.clear();
      }
    })
    .catch((error) => {
      window.location.href = "index.html";
      sessionStorage.clear();
    });

  window.location.href = "index.html";
  sessionStorage.clear();
  console.log("logout");
};
