const TOTAL_MS = 25 * 60 * 1000;

const page = document.getElementById("page");
const timerText = document.getElementById("timer");
const startButton = document.getElementById("start");
const toggleButton = document.getElementById("toggle");
const resetButton = document.getElementById("reset");
const restartButton = document.getElementById("restart");
const label = document.getElementById("label");
const nameText = document.getElementById("name");
const metaText = document.getElementById("meta");

let remainingMs = TOTAL_MS;
let endTime = 0;
let intervalId = null;

function showTime() {
  const totalSeconds = Math.ceil(remainingMs / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  timerText.textContent = minutes + ":" + seconds;
}

// Work out the time left from the real clock, so it stays right in a background tab.
function tick() {
  remainingMs = Math.max(0, endTime - Date.now());
  showTime();
  if (remainingMs === 0) {
    clearInterval(intervalId);
    intervalId = null;
    finish();
  }
}

// Made-up painting details. They are only put on the page when the timer finishes.
function finish() {
  nameText.textContent = "Evening Over the Water";
  metaText.textContent = "Marguerite Bellaire, 1887";
  label.hidden = false;
  page.classList.add("finished");
  toggleButton.hidden = true;
  resetButton.hidden = true;
  restartButton.hidden = false;
}

function run() {
  endTime = Date.now() + remainingMs;
  intervalId = setInterval(tick, 250);
}

function stop() {
  if (intervalId !== null) {
    tick();
    clearInterval(intervalId);
    intervalId = null;
  }
}

startButton.addEventListener("click", () => {
  page.classList.add("running");
  startButton.hidden = true;
  toggleButton.hidden = false;
  toggleButton.textContent = "Pause";
  run();
});

toggleButton.addEventListener("click", () => {
  if (toggleButton.textContent === "Pause") {
    stop();
    toggleButton.textContent = "Resume";
  } else {
    run();
    toggleButton.textContent = "Pause";
  }
});

function backToStart() {
  stop();
  remainingMs = TOTAL_MS;
  showTime();
  nameText.textContent = "";
  metaText.textContent = "";
  label.hidden = true;
  page.classList.remove("running", "finished");
  toggleButton.hidden = true;
  restartButton.hidden = true;
  resetButton.hidden = false;
  startButton.hidden = false;
}

resetButton.addEventListener("click", backToStart);
restartButton.addEventListener("click", backToStart);
