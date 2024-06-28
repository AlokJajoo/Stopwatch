let startTime, updatedTime, difference;
let timerInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('start-stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    display.innerHTML =
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + "." +
        (milliseconds < 100 ? "0" : "") + (milliseconds < 10 ? "0" : "") + milliseconds;
}

function startStop() {
    if (!running) {
        running = true;
        startStopBtn.innerHTML = 'Stop';
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTime, 10);
    } else {
        running = false;
        startStopBtn.innerHTML = 'Start';
        clearInterval(timerInterval);
    }
}

function reset() {
    running = false;
    clearInterval(timerInterval);
    startStopBtn.innerHTML = 'Start';
    display.innerHTML = '00:00:00.00';
    laps.innerHTML = '';
    difference = 0;
    lapCounter = 0;
}

function lap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('div');
        lapTime.innerHTML = `Lap ${lapCounter}: ${display.innerHTML}`;
        laps.appendChild(lapTime);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
