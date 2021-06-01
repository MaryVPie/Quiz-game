

//Quiz questions

var questions = [
  {
    id:1,
    color: "purple",
    text: "times new roman",
    penalty: 20,
    wasAsked: false,
    correctInput: false,
    scoreGen: 1,

    answers: [
      {
        color: "green",
        text: "Arial",
        isCorrect: true,
        id: 11
      },
      {
        color: "yellow",
        text: "conob=sdfshh",
        isCorrect: false,
        id: 10
      },
    ]
  },
 
];
let sessionHighscore =0;

//questions[0].text
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
  var quizMainBlock = document.querySelector("#quiz-main");
  quizMainBlock.classList.remove("hidden");

  renderQuestion(quizMainBlock);

  //starts timer
  setTime();

}
//function renders random question
function renderQuestion(element) 
{
  let result = questions.filter(question => !question.wasAsked);
  let idx = getRandomInt(result.length);
  let q =  result[idx];
  console.log(q);

  var ulQuestions = document.createElement("ul");
  ulQuestions.classList.add("ul-questions");

  for (let i = 0; i < q.answers.length; i++) {
    const el = q.answers[i];
    renderAnswer(ulQuestions, el, q.id);
  }

  element.appendChild(ulQuestions);

}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function renderAnswer(ulQuestion, answer,questionId) 
{
  let el = document.createElement("li");
  el.classList.add("li-answers");
  el.setAttribute("id", answer.id);
  el.setAttribute("questionId", questionId);
  el.setAttribute("isCorrect", answer.isCorrect);
  el.innerHTML=answer.text;
  el.addEventListener("click", processAnswer);

  ulQuestion.appendChild(el);
}

function processAnswer() {
  // this gives you the element which triggered the event (in our case it is li element and we know it)
  let triggeredLi = this;
  console.log(this);
}