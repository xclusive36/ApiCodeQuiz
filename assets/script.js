// section transition: https://www.w3schools.com/w3css/w3css_slideshow.asp

let timer = 0; // set the timer to 75 seconds
let intervalId = 0; // set the interval id to 0
let score = 0; // set the score to 0

let sectionIndex = 1; // set the section index to 1
const answerKey = [3, 3, 4, 3, 4];
let scoresArray = JSON.parse(localStorage.getItem("scores")) || []; // get the scores from local storage

const setSectionIndex = (n) => {
  // set the section index to n
  sectionIndex = n;
  setSection(sectionIndex);
};

const setSection = (n) => {
  var i;
  var x = document.getElementsByClassName("slide");
  if (n > x.length) {
    sectionIndex = 1;
  }
  if (n < 1) {
    sectionIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[sectionIndex - 1].style.display = "block";
};

setSection(sectionIndex); // set the section to 1

const startGame = () => {
  // This will be called when the start button is clicked

  score = 0; // set the score to 0

  setSectionIndex(2); // switch to section 2

  timer = 75; // set the timer to 75 seconds

  // setTimer will initially set the timer to 75 seconds
  document.getElementById("time").innerHTML = timer;

  // setTimer will start the timer
  intervalId = window.setInterval(() => {
    // This will be called every second

    timer--; // decrement the timer by 1

    // update the timer on the page
    document.getElementById("time").innerHTML = timer;

    if (timer === 0) {
      // if the timer is 0
      window.clearInterval(intervalId); // stop the timer

      setTimeout(() => {
        // delay for a fraction of a second to ensure the timer is 0

        alert("Time is up!"); // show an alert
        document.getElementById(
          "score"
        ).innerHTML = `Your final score is: ${score}`; // update the score on the page
        setSectionIndex(7);
      }, 10);
    }
  }, 1000);
};

const checkAnswer = (response) => {
  // Check question and update the score
  // then move to next question

  var answer = document.getElementById("answerResponse"); // get the answer response element

  if (response.answer === answerKey[response.question - 1]) {
    answer.textContent = "Correct!"; // show the correct response
    score++; // increment the score by 1
  } else {
    answer.textContent = "Wrong!"; // show the wrong response

    if (timer > 10) {
      timer -= 10; // subtract 10 from the timer
    } else {
      timer = 1; // otherwise set the timer to 1 so the game will end naturally
      setTimeout(() => {
        // just wait a second to ensure the timer is 0
      }, 1000);
    }
  }

  if (response.question === 5) {
    document.getElementById(
      "score"
    ).innerHTML = `Your final score is: ${score}`; // update the score on the page
    window.clearInterval(intervalId); // stop the timer
  }

  // because the sections are indexed starting at 1, we need to add 2
  // to the response.question number to get the next section
  setSectionIndex(response.question + 2); // move to next question

  setTimeout(() => {
    // set a delay before clearing the answer response
    answer.textContent = ""; // clear the answer response
  }, 2000);
};

const showScores = () => {
  // show the scores

  let highScoreOutput = ""; // set the high score output to an empty string

  scoresArray.sort((a, b) => {
    // sort the scores array
    return b.score - a.score; // sort the scores array
  });

  scoresArray.forEach((highScore, index) => {
    // loop through the scores array
    highScoreOutput += `<div class="high-score-output">${index + 1}. ${
      highScore.initials
    } - ${highScore.score}</div>`; // add the score to the high score output
  }); // loop through the scores array

  document.getElementById("highscores").innerHTML = highScoreOutput; // set high scores to the dom

  setSectionIndex(8); // move to scores section
};

const setScore = (event) => {
  event.preventDefault(); // prevent the form from submitting
  const initials = document.getElementById("initials").value; // get the initials from the form
  const newScore = {
    // create a new score object
    initials: initials.toUpperCase(),
    score: score,
  };

  scoresArray.push(newScore); // add the score to the array

  localStorage.setItem("scores", JSON.stringify(scoresArray)); // save the score to local storage

  showScores(); // show the scores
};

const goBack = () => {
  timer = 0; // set the timer to 0
  score = 0; // set the score to 0

  // update the timer on the page
  document.getElementById("time").innerHTML = timer;

  setSectionIndex(1); // move to start section
};

const clearScores = () => {
  scoresArray = []; // clear the scores array
  localStorage.removeItem("scores"); // remove the scores from local storage
  document.getElementById("highscores").innerHTML = "&nbsp;"; // set high scores to the dom
};

// This will be called when the start button is clicked
document.getElementById("start").addEventListener("click", startGame);
