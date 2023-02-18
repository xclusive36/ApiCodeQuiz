// section transition: https://www.w3schools.com/w3css/w3css_slideshow.asp

let timer = 0; // set the timer to 75 seconds

let sectionIndex = 1; // set the section index to 1
setSection(sectionIndex); // set the section to 1

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

  setSectionIndex(2);

  timer = 75; // set the timer to 75 seconds

  // setTimer will initially set the timer to 75 seconds
  document.getElementById("time").innerHTML = timer;

  let intervalId = window.setInterval(() => {
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
        setSectionIndex(1);
      }, 10);
    }
  }, 1000);
};

const question1Check = (response) => {
  // Check question #1 and update the score
  // then move to question #2

  setTimeout(() => {
    // set a delay before moving to the next question
    setSectionIndex(3); // move to question #2
  }, 2000);
};

// This will be called when the start button is clicked
document.getElementById("start").addEventListener("click", startGame);
