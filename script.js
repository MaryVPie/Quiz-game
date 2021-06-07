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
        class: "correct",
        text: "Arial",
        isCorrect: true,
        id: 11
      },
      {
        class: "wrong",
        text: "conob=sdfshh",
        isCorrect: false,
        id: 10
      },
    ]
  },
  {
    id:2,
    color: "purple",
    text: "times new roman",
    penalty: 20,
    wasAsked: false,
    correctInput: false,
    scoreGen: 1,

    answers: [
      {
        class: "correct",
        text: "asdsadsadasdsa",
        isCorrect: true,
        id: 11
      },
      {
        class: "wrong",
        text: "77777777",
        isCorrect: false,
        id: 10
      },
    ]
  }
 
];
let sessionHighscore =0;

// Selects element by class
var timeEl = document.querySelector(".time");

// Selects element by id
var mainEl = document.getElementById("main");

var secondsLeft = 10;

var btnStart = document.querySelector("#starts-quiz");

btnStart.addEventListener("click", startQuiz);

function startQuiz() {

  //hides start block
  var greetingsBlock = document.querySelector("#greetings");
  greetingsBlock.classList.add("hidden");
  //shows question block
  var quizMainBlock = document.querySelector("#quiz-main");
  quizMainBlock.classList.remove("hidden");
  var bla = document.querySelector("#bla");
  renderQuestion(bla);

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

  var ulQuestion = document.createElement("ul");
  ulQuestion.classList.add("ul-questions");
  q.wasAsked = true;

  for (let i = 0; i < q.answers.length; i++) {
    const el = q.answers[i];
    renderAnswer(ulQuestion, el, q.id);
  }



  let headQ = document.createElement("h2");
  headQ.innerHTML = q.text;

  element.appendChild(headQ);
  element.appendChild(ulQuestion);
 
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
  var bla = document.querySelector("#bla");
  bla.innerHTML ='';
  renderQuestion(bla);
//1. затереть Inner html in index.html block with id "bla" line
//2. Обработать вопрос:
//  2.1 достать ид вопроса из triggerli (getAttribute(<attributeName>)) и достать ид данного ответа из triggerli (см 108 и 109 за именами атриьутов и логикой)
//  2.2 начти по ид вопроса из 2.1 в коллекции questions соответствующий вопрос.
//  2.3 найти по ид ответа в ответаъ на вопрос из 2.2 ответ данный пользователем (мы знаем какой т.к. он кдикнуо на li и мы достали ид ответа на шаге 2.1)
//  2.4 Посмотерть дал ли он правильный ответ (свойство isCorrect) в ответе полученном на шаге 2.3
//    2.4.1 Если да, повысить глобальный скор,
//3. Показать новый вопрос (renderQuestion(bla))
  console.log(this);
}

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

// Function to create and append image at the end of the quiz
function sendMessage() {
  timeEl.textContent = " ";
  var imgEl = document.createElement("img");
  imgEl.setAttribute("src", "images/Thats-all.jpg");
  imgEl.classList.add("img");
  mainEl.appendChild(imgEl);

}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}