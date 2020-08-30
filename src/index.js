import "./styles.css";
let turns = 0;
let logo = document.getElementById("logo");
let gameOver = false;
let point = -1;
let title = "HANGMAN";
let colors = ["violet", "indigo", "blue", "green", "yellow", "orange", "red"];
let hintCount = 0;
let lettersCorrect = [];
let reset = document.getElementById("reset");
for (let i = 0; i < title.length; i++) {
  let newLetter = document.createElement("span");
  newLetter.innerHTML = title[i];
  newLetter.style.color = colors[i];
  logo.appendChild(newLetter);
}

let buttons = document.getElementById("buttons");

let start = 65;

for (let i = 65; i < 91; i++) {
  let newButton = document.createElement("button");
  newButton.innerHTML = String.fromCharCode(i);
  newButton.classList.add("btn");
  newButton.classList.add("rounded-circle");
  newButton.classList.add("btn-primary");
  newButton.classList.add("inputOptions");
  newButton.addEventListener("click", (event) => guess(newButton, i));

  buttons.appendChild(newButton);
}

let words = [
  "HANGMAN",
  "ANIMALS",
  "POLYESTER",
  "BURGMAN",
  "MONTREAL",
  "IMPOSSIBLE",
  "INTERSTELLAR",
  "MISSION",
  "FAST",
  "FURIOUS"
];
// Math.round(Math.random() * 7)
let currentWord = words[Math.round(Math.random() * words.length - 1)];
let inputDiv = document.getElementById("input");

for (let i = 0; i < currentWord.length; i++) {
  let newBlank = document.createElement("div");
  newBlank.classList.add("inputBlank");
  newBlank.id = i;
  inputDiv.appendChild(newBlank);
}

const guess = (button, num) => {
  if (gameOver) {
    return;
  }
  let message = document.getElementById("message");
  button.classList.remove("btn-primary");
  button.classList.add("border-primary");
  button.setAttribute("disabled", true);
  if (currentWord.includes(String.fromCharCode(num))) {
    let isEmpty = 0;
    for (let i = 0; i < currentWord.length; i++) {
      let b = document.getElementById(i);
      if (String.fromCharCode(num) === currentWord[i]) {
        b = document.getElementById(i);
        b.innerHTML = currentWord[i];
        lettersCorrect.push(currentWord[i]);
      }
      console.log(b);
      if (b != null && b.innerHTML !== "") {
        isEmpty++;
      }
      if (isEmpty === currentWord.length) {
        message.innerHTML = "Congratulation!!! You Won.";
        updatePoints();
        gameOver = true;
        reset.classList.remove("hide");
        hintButton.setAttribute("disabled", true);
      }
    }
  } else if (turns < 6) {
    let currImage = document.getElementById("img" + turns);
    currImage.classList.add("hide");
    turns++;
    currImage = document.getElementById("img" + turns);
    currImage.classList.remove("hide");
  }
  if (turns === 6) {
    //show lost message
    message.innerHTML = "Sorry... try again.";
    for (let i = 0; i < currentWord.length; i++) {
      let b = document.getElementById(i);
      b.innerHTML = currentWord[i];
    }
    reset.classList.remove("hide");
    gameOver = true;
    hintButton.setAttribute("disabled", true);
  }
};

let hintButton = document.getElementById("hint");

hintButton.addEventListener("click", (event) => hint(hintButton));

const hint = (button) => {
  if (hintCount === 2) {
    window.alert("No more hints available.");
    return;
  }
  hintCount++;
  let temp = 0;
  for (let i = 0; i < currentWord.length; i++) {
    if (!lettersCorrect.includes(currentWord[i])) {
      temp = document.getElementById("buttons").firstChild;
      while (temp.innerHTML !== currentWord[i]) {
        temp = temp.nextSibling;
      }
      break;
    }
  }
  guess(temp, temp.innerHTML.charCodeAt(0));
};

const updatePoints = () => {
  point++;
  let scoreCard = document.getElementById("points");
  scoreCard.innerHTML = "Points:" + point;
  console.log(scoreCard);
};
reset.addEventListener("click", (event) => resetButton());
const resetButton = () => {
  //reset image
  //reset gameOver
  //reset buttons
  //reset inputSpace
  //change current word
  //reset hint

  let temp = buttons.firstChild;
  while (temp !== null) {
    temp.classList.remove("border-primary");
    temp.classList.add("btn-primary");
    temp.disabled = false;
    temp = temp.nextSibling;
  }
  gameOver = false;
  currentWord = words[Math.round(Math.random() * words.length - 1)];
  lettersCorrect = [];
  hintCount = 0;
  while (inputDiv.firstChild) {
    inputDiv.removeChild(inputDiv.lastChild);
  }
  for (let i = 0; i < currentWord.length; i++) {
    let newBlank = document.createElement("div");
    newBlank.classList.add("inputBlank");
    newBlank.id = i;
    inputDiv.appendChild(newBlank);
  }
  let message = document.getElementById("message");
  message.innerHTML = "";
  hintButton.disabled = false;
  reset.classList.add("hide");
  turns = 0;

  for (let i = 1; i <= 6; i++) {
    temp = document.getElementById("img" + i);
    temp.classList.add("hide");
  }

  document.getElementById("img" + 0).classList.remove("hide");
};

updatePoints();
