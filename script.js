//Quiz questions

var questions = [
  {
    id: 1,
    color: "purple",
    text: "What is an arrangement of words and symbols in a language?",
    penalty: 20,
    wasAsked: false,
    correctInput: false,
    scoreGen: 1,

    answers: [
      {
        class: "correct",
        text: "Syntax",
        isCorrect: true,
        id: 11
      },
      {
        class: "wrong",
        text: "CSS",
        isCorrect: false,
        id: 10
      },
      {
        class: "wrong",
        text: "Class",
        isCorrect: false,
        id: 12
      },
      {
        class: "wrong",
        text: "element",
        isCorrect: false,
        id: 13
      },
    ]
  },
  {
    id: 2,
    color: "purple",
    text: "The part of the CSS rule which specifies HOW the property/attribute will be modified:",
    penalty: 20,
    wasAsked: false,
    correctInput: false,
    scoreGen: 1,

    answers: [
      {
        class: "correct",
        text: "value",
        isCorrect: true,
        id: 14
      },
      {
        class: "wrong",
        text: "property",
        isCorrect: false,
        id: 15
      },
      {
        class: "wrong",
        text: "element",
        isCorrect: false,
        id: 16
      },
      {
        class: "wrong",
        text: "type",
        isCorrect: false,
        id: 17
      },
    ]
  },
  {
    id: 3,
    color: "purple",
    text: "Which are types of variable scope?",
    penalty: 20,
    wasAsked: false,
    correctInput: false,
    scoreGen: 1,

    answers: [
      {
        class: "correct",
        text: "Local and Global",
        isCorrect: true,
        id: 18
      },
      {
        class: "wrong",
        text: "Local and Undefied",
        isCorrect: false,
        id: 19
      },
      {
        class: "wrong",
        text: "Variables have not any types",
        isCorrect: false,
        id: 20
      },
      {
        class: "wrong",
        text: "String and index",
        isCorrect: false,
        id: 21
      },
    ]
  },
  {
    id: 4,
    color: "purple",
    text: "javascript starts counting on what?",
    penalty: 20,
    wasAsked: false,
    correctInput: false,
    scoreGen: 1,

    answers: [
      {
        class: "correct",
        text: "0",
        isCorrect: true,
        id: 22
      },
      {
        class: "wrong",
        text: "1",
        isCorrect: false,
        id: 23
      },
      {
        class: "wrong",
        text: "any number as you wish",
        isCorrect: false,
        id: 24
      },
      {
        class: "wrong",
        text: "1 or any number as you wish",
        isCorrect: false,
        id: 25
      },
    ]
  },
  {
    id: 5,
    color: "purple",
    text: "What does &lta&gt mean in HTML?",
    penalty: 20,
    wasAsked: false,
    correctInput: false,
    scoreGen: 1,

    answers: [
      {
        class: "correct",
        text: "Defines a hyperlink",
        isCorrect: true,
        id: 11
      },
      {
        class: "wrong",
        text: "Defines an abbreviation",
        isCorrect: false,
        id: 10
      },
      {
        class: "wrong",
        text: "Not supported in HTML 5",
        isCorrect: false,
        id: 12
      },
      {
        class: "wrong",
        text: "Defines an address element",
        isCorrect: false,
        id: 13
      },
    ]
  }
];

let sessionHighscore = 0;

// Selects element by id
var mainEl = document.getElementById("main");

var btnStart = document.querySelector("#starts-quiz");

btnStart.addEventListener("click", startQuiz);

function startQuiz() {

  //hides start block
  var greetingsBlock = document.querySelector("#greetings");
  greetingsBlock.classList.add("hidden");
  //shows question block
  var quizMainBlock = document.querySelector("#quiz-main");
  quizMainBlock.classList.remove("hidden");
  var questionContainer = document.querySelector("#questionContainer");
  renderQuestion(questionContainer);

  //starts timer
  setTime();

}
//function renders random question
function renderQuestion(element) {
  let result = questions.filter(question => !question.wasAsked);
  if (result.length === 0) {

    let timeEl = document.querySelector(".time"); 
    endQuiz(timerInterval, timeEl);
  }

  let idx = getRandomInt(result.length);
  let q = result[idx];
  console.log(q);

  var olQuestion = document.createElement("ol");
  olQuestion.classList.add("ol-questions");
  q.wasAsked = true;

  for (let i = 0; i < q.answers.length; i++) {
    const el = q.answers[i];
    renderAnswer(olQuestion, el, q.id);
  }

  let headQ = document.createElement("h2");
  headQ.innerHTML = q.text;

  element.appendChild(headQ);
  element.appendChild(olQuestion);

}
//function renders answers
function renderAnswer(olQuestion, answer, questionId) {
  let el = document.createElement("li");
  el.classList.add("li-answers");
  el.setAttribute("id", answer.id);
  el.setAttribute("questionId", questionId);
  el.setAttribute("isCorrect", answer.isCorrect);
  el.innerHTML = answer.text;
  el.addEventListener("click", processAnswer);
  
  olQuestion.appendChild(el);
}

function processAnswer() {
  // this gives the element which triggered the event (in our case it is li element and we know it)
  let triggeredLi = this;
  let questionId = triggeredLi.getAttribute("questionId");
  let answerId = triggeredLi.getAttribute("id");
  let isCorrect = triggeredLi.getAttribute("iscorrect") == 'true';
  var questionContainer = document.querySelector("#questionContainer");
  questionContainer.innerHTML = '';
  renderQuestion(questionContainer);
debugger;
  let correctnessDiv = document.querySelector("#correctness");
  correctnessDiv.innerHTML = '';
  correctnessDiv.classList.remove("hidden");
  if (isCorrect) {
    correctnessDiv.innerHTML = "Correct!"
  }
  else {
    correctnessDiv.innerHTML = "Wrong!"
  }

  setTimeout(function() {
    correctnessDiv.classList.add("hidden");
  }, 700);
  
  //2. Обработать вопрос:
  //  2.1 достать ид вопроса из triggerli (getAttribute(<attributeName>)) и достать ид данного ответа из triggerli (см 108 и 109 за именами атриьутов и логикой)
  //  2.2 начти по ид вопроса из 2.1 в коллекции questions соответствующий вопрос.
  //  2.3 найти по ид ответа в ответаъ на вопрос из 2.2 ответ данный пользователем (мы знаем какой т.к. он кдикнуо на li и мы достали ид ответа на шаге 2.1)
  //  2.4 Посмотерть дал ли он правильный ответ (свойство isCorrect) в ответе полученном на шаге 2.3
  //    2.4.1 Если да, повысить глобальный скор,
  //3. Показать новый вопрос (renderQuestion(bla))
  console.log(this);
}

var timerInterval = null;

function setTime() {

  var secondsLeft = 20;

  // Selects element by class
  var timeEl = document.querySelector(".time");
  // Sets interval in variable
  timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft === 0) {


      // Calls function to create and append image
      endQuiz(timerInterval, timeEl);
    }

  }, 1000);
}

// Function to create and append image at the end of the quiz
function endQuiz(timer, timeEl) {

  timeEl.textContent = " ";
  // Stops execution of action at set interval
  clearInterval(timer);

  var imgEl = document.createElement("img");

  imgEl.setAttribute("src", "images/Thats-all.jpg");
  imgEl.classList.add("img");
  mainEl.appendChild(imgEl);
//function stoppes showing the image
  setTimeout(function() {
    imgEl.classList.add("hidden");

    var formDone = document.querySelector("#form");
    formDone.classList.remove("hidden");

    var buttonHighScore = document.querySelector("#score-container");
    buttonHighScore.classList.remove("hidden");

    var buttonRestart = document.querySelector("#restart-btn");
    buttonRestart.classList.remove("hidden");
  
    var buttonClearScore = document.querySelector("#clear-score-btn");
    buttonClearScore.classList.remove("hidden");

  }, 2000);

  var questionContainer = document.querySelector("#questionContainer");

  questionContainer.classList.add("hidden");

  calculateScore();

}

function formFunction() {
  var nameInitia = document.getElementById("myText").form.id;
  document.getElementById("demo").innerHTML = nameInitia;
}

function calculateScore() {

}

//generate random value from 0 to max not including max
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}