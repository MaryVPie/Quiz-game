// Selects element by class
var timeEl = document.querySelector(".time");

// Selects element by id
var mainEl = document.getElementById("main");

var secondsLeft = 10;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }

  }, 1000);
}

// Function to create and append colorsplosion image
function sendMessage() {
  timeEl.textContent = " ";
  var imgEl = document.createElement("img");
  imgEl.setAttribute("src", "images/Thats-all.jpg");
  imgEl.classList.add("img");
  mainEl.appendChild(imgEl);

}

var btnStart = document.querySelector("#starts-quiz");

btnStart.addEventListener("click", startQuiz);

function startQuiz() {

  //hides start block
  var greetingsBlock = document.querySelector("#greetings");
  greetingsBlock.classList.add("hidden");
  //shows question block
  var greetingsBlock = document.querySelector("#quiz-main");
  greetingsBlock.classList.remove("hidden");

  //starts timer
  setTime();
}
