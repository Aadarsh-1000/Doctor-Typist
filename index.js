const textDisplay = document.getElementById("text");
const input = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accEl = document.getElementById("accuracy");
const mistakesEl = document.getElementById("mistakes");

const testText =
  "Typing fast is a skill that improves with practice and patience.";

let time = 30;
let timerStarted = false;
let timer;
let mistakes = 0;

function loadText() {
  textDisplay.innerHTML = "";
  testText.split("").forEach(char => { 
    const span = document.createElement("span");
    span.innerText = char;
    textDisplay.appendChild(span);
  });
}

loadText();

input.addEventListener("input", () => {
  if (!timerStarted) {
    timerStarted = true;
    timer = setInterval(updateTime, 1000);
  }

  const chars = textDisplay.querySelectorAll("span");
  const typed = input.value.split("");

  mistakes = 0;

  chars.forEach((char, index) => {
    if (typed[index] == null) {
      char.classList.remove("correct", "wrong");
    } else if (typed[index] === char.innerText) {
      char.classList.add("correct");
      char.classList.remove("wrong");
    } else {
      char.classList.add("wrong");
      char.classList.remove("correct");
      mistakes++;
    }
  });

  mistakesEl.innerText = mistakes;

  const correctChars = document.querySelectorAll(".correct").length;
  const accuracy = typed.length
    ? Math.round((correctChars / typed.length) * 100)
    : 100;

  accEl.innerText = accuracy;
});

function updateTime() {
  time--;
  timeEl.innerText = time;

  if (time === 0) {
    clearInterval(timer);
    input.disabled = true;

    const wordsTyped = input.value.trim().split(" ").length;
    const wpm = wordsTyped * 2; // 30s test
    wpmEl.innerText = wpm;
  }
}

function restartTest() {
  clearInterval(timer);
  time = 30;
  timerStarted = false;
  mistakes = 0;

  timeEl.innerText = 30;
  wpmEl.innerText = 0;
  accEl.innerText = 100;
  mistakesEl.innerText = 0;

  input.value = "";
  input.disabled = false;
  loadText();
}
