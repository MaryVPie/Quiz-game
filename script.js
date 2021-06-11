//Quiz questions

var questions = [
  {
    id: 1,
    color: "purple",
    text: "What is an arrangement of words and symbols in a language?",
    penalty: 3,
    wasAsked: false,
    correctInput: false,
    scoreGen: 5,

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
    penalty: 3,
    wasAsked: false,
    correctInput: false,
    scoreGen: 5,

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
    penalty: 3,
    wasAsked: false,
    correctInput: false,
    scoreGen: 5,

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
    penalty: 3,
    wasAsked: false,
    correctInput: false,
    scoreGen: 5,

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
    penalty: 3,
    wasAsked: false,
    correctInput: false,
    scoreGen: 5,

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
    return;
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
  let quest = questions.find(x => x.id == questionId);
  let answerId = triggeredLi.getAttribute("id");
  let isCorrect = triggeredLi.getAttribute("iscorrect") == 'true';
  quest.correctInput = isCorrect;
  var questionContainer = document.querySelector("#questionContainer");
  questionContainer.innerHTML = '';
  renderQuestion(questionContainer);
  // debugger;
  let correctnessDiv = document.querySelector("#correctness");
  correctnessDiv.innerHTML = '';
  correctnessDiv.classList.remove("hidden");
  if (isCorrect) {
    correctnessDiv.innerHTML = "Correct!"
  }
  else {
    correctnessDiv.innerHTML = "Wrong!"
  }
  //debugger;
  setTimeout(function () {
    correctnessDiv.classList.add("hidden");
  }, 700);

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
  setTimeout(function () {
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

  sessionHighscore = calculateScore();

  let yourScore = document.querySelector("#yourScore");
  yourScore.innerHTML = "Yor score is: " + sessionHighscore;
  //debugger;
}



function calculateScore() {

  let score = 0;

  for (let idx = 0; idx < questions.length; idx++) {
    const qustElement = questions[idx];

    if (qustElement.wasAsked) {
      if (qustElement.correctInput) {
        score += qustElement.scoreGen;
      }
      else {
        score -= qustElement.penalty;
      }
    }

  }
  if (score < 0) {
    return 0;
  }
  return score;

}
//stores score
function saveScores() {

  let namePerson = document.querySelector("#myText");

  const person = {
    name: namePerson.value,
    scoring: sessionHighscore
  };

  let K = "user_" + person.name;

  window.localStorage.setItem(K, JSON.stringify(person));

  const nameClient = localStorage.getItem(K);
  console.log(JSON.parse(nameClient));
  console.log(person);
}

//shows stored results in generated table

function viewScore() {

  var scoreTabl = document.createElement("table");

  let scoreContainer = document.querySelector("#score-container");

  scoreTabl.classList.add("table");
  var headerTabl = document.createElement("tr");
  var scoreTh = document.createElement("th");
  scoreTh.innerHTML = "Score: ";
  var nameTh = document.createElement("th");
  nameTh.innerHTML = "Name: ";

  headerTabl.appendChild(scoreTh);
  headerTabl.appendChild(nameTh);
  scoreTabl.appendChild(headerTabl);

  scoreContainer.appendChild(scoreTabl);


  for (let i = 0; i < localStorage.length; i++) {
    let storedValue = localStorage.key(i);

    if (storedValue.includes("user_")) {

      // get item from local storage and convert it to javascript object
      // call render row passing table and javascript object
      let jsonRes = localStorage.getItem(storedValue);
      let personRes = JSON.parse(jsonRes);

      renderRow(scoreTabl, personRes);

    }
    console.log(`Item at ${i}: ${storedValue}`);
  }

}

function renderRow(tblEl, clicker) {
  var row = document.createElement("tr");
  var scoreColumn = document.createElement("td");
  scoreColumn.innerHTML = clicker.scoring;

  var nameColumn = document.createElement("td");
  nameColumn.innerHTML = clicker.name;

  row.appendChild(scoreColumn);
  row.appendChild(nameColumn);
  tblEl.appendChild(row);
}

//должна чистить весьь Highscore при клике на кнопку Clear Highscore

function clearScore() {
  
}

//должна перезапускать запрос вопросов при клике на кнопку restart








//generate random value from 0 to max not including max
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}