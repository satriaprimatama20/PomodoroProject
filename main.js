const timer = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakIterval: 4,
};

let interval;

const modeButtons = document.querySelector("#js-mode-buttons");
const clockElement = document.querySelector("#js-clock");

modeButtons.addEventListener("click", handleMode = (e) => {
    const { mode } = e.target.dataset;
    if (!mode) return;

    switchMode(mode);

})

function switchMode(mode) {
    timer.mode = mode;
    timer.remainingTime = {
        total: timer[mode] * 60,
        minutes: timer[mode],
        seconds: 0,
    }
    document
        .querySelectorAll("button[data-mode]")
        .forEach(e => { e.classList.remove("active") });
    document.querySelector(`[data-mode="${mode}"]`).classList.add("active");
    document.body.style.backgroundColor = `var(--${mode})`;

    updateClock();

}

function getRemainingTime(endTime) {
    const currentTime = Date.parse(new Date());
    const difference = endTime - currentTime;
  
    const total = Number.parseInt(difference / 1000, 10);
    const minutes = Number.parseInt((total / 60) % 60, 10);
    const seconds = Number.parseInt(total % 60, 10);
  
    return {
      total,
      minutes,
      seconds,
    };
  }

function startTimer() {
    let { total } = timer.remainingTime;
    const endTime = Date.parse(new Date()) + total * 1000;

    interval = setInterval(function () {
        timer.remainingTime = getRemainingTime(endTime);
        updateClock();

        total = timer.remainingTime.total;
        if (total <= 0) {
            clearInterval(interval);
        }
    }, 1000);
}
function updateClock() {
    const { remainingTime } = timer;
    const minutes = `${remainingTime.minutes}`.padStart(2, "0");
    const seconds = `${remainingTime.seconds}`.padStart(2, "0");

    const min = document.querySelector("#js-minutes");
    const sec = document.querySelector("#js-seconds");

    min.textContent = minutes;
    sec.textContent = seconds;
}