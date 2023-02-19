// section transition: https://www.w3schools.com/w3css/w3css_slideshow.asp

let timer = 0; // set the timer to 75 seconds
let intervalId = 0; // set the interval id to 0
let score = 0; // set the score to 0

let sectionIndex = 1; // set the section index to 1
setSection(sectionIndex); // set the section to 1

const answerKey = [3, 3, 4, 3, 4];

const setSectionIndex = (n) => {
  // set the section index to n
  sectionIndex = n;
  setSection(sectionIndex);
};

function setSection(n) {
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
}

const startGame = () => {
  // setTimer function will be called when the start button is clicked

  score = 0; // set the score to 0

  setSectionIndex(2); // switch to section 2

  timer = 7; // set the timer to 75 seconds

  // setTimer will initially set the timer to 75 seconds
  document.getElementById("time").innerHTML = timer;

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

  var answer = document.getElementById("answerResponse");

  if (response.answer === answerKey[response.question - 1]) {
    answer.textContent = "Correct!";
    score++;
  } else {
    answer.textContent = "Wrong!";
    timer -= 10;
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

// This will be called when the start button is clicked
document.getElementById("start").addEventListener("click", startGame);
