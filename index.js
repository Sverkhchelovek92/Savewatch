const display = document.querySelector("#display");
const savedTimes = document.querySelector("#savedTimes");

const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const resetBtn = document.querySelector("#resetBtn");
const saveBtn = document.querySelector("#saveBtn");

let timer = null;
let startTime = 0;
let elapsedTime = 0;

let paused = true;

let intervalId;

let hrs = 0;
let mins = 0;
let secs = 0;
let mlsecs = 0;

// Stopwatch

startBtn.addEventListener("click", () => {
  if (paused) {
    paused = false;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
  }
});

stopBtn.addEventListener("click", () => {
  if (!paused) {
    paused = true;
    elapsedTime = Date.now() - startTime;
    clearInterval(timer);
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  startTime = 0;
  elapsedTime = 0;
  hrs = 0;
  mins = 0;
  secs = 0;
  mlsecs = 0;
  paused = true;
  display.textContent = "00:00:00:00";
});

function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  mlsecs = Math.floor((elapsedTime % 1000) / 10);
  secs = Math.floor((elapsedTime / 1000) % 60);
  mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
  hrs = Math.floor(elapsedTime / (1000 * 60 * 60));

  mlsecs = pad(mlsecs);
  secs = pad(secs);
  mins = pad(mins);
  hrs = pad(hrs);

  display.textContent = `${hrs}:${mins}:${secs}:${mlsecs}`;

  function pad(unit) {
    return ("0" + unit).length > 2 ? unit : "0" + unit;
  }
}

// Saved Times

function addTime() {
  const timeSaved = display.textContent;

  createSavedTime(timeSaved);
}

saveBtn.addEventListener("click", addTime);

function createSavedTime(time) {
  const listTime = document.createElement("li");
  listTime.textContent = time;
  listTime.className = "time__li";

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "del-btn";

  listTime.appendChild(delBtn);

  savedTimes.appendChild(listTime);

  delBtn.addEventListener("click", function () {
    savedTimes.removeChild(listTime);
  });
}
