const TOTAL_MS = 25 * 60 * 1000;

const page = document.getElementById("page");
const timerText = document.getElementById("timer");
const startButton = document.getElementById("start");
const toggleButton = document.getElementById("toggle");
const resetButton = document.getElementById("reset");

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
  }
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

resetButton.addEventListener("click", () => {
  stop();
  remainingMs = TOTAL_MS;
  showTime();
  page.classList.remove("running");
  toggleButton.hidden = true;
  startButton.hidden = false;
});
