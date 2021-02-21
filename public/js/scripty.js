// initializing vars
const pomodoroTimer = document.querySelector('#pomodoro-timer');
const startButton = document.querySelector('#pomodoro-start');
const pauseButton = document.querySelector('#pomodoro-pause');
const stopButton = document.querySelector('#pomodoro-stop');

let type = 'Study';

// Start button
startButtron.addEventListener('click', () => {
    toggleClock();
})

// Pause button 
pauseButton.addEventListener('click', () => {
    toggleClock();
})

// Stop button 
stopButton.addEventListener('click', () => {
    toggleClock(true);
})

let isClockRunning = false;


// 25 min in seconds
let workSessionDuration = 1500;
letcurrentTimeLeftInSession = 1500;
// 5 min in seconds
let breakSessionDuration = 300;


// Toggling clock function
const toggleClock = (reset) => {
    if (reset) {
        // Stop
        stopClock();
    } else {
        if (isClockRunning === true) {
            // Pause
            clearInterval(clockTimer);
            isClockRunning = false;
        } else {
            // Start
            isClockRunning = true;
            clockTimer = setInterval(() => {
                // Decrease time left, increase time spent
                stepDown();
                displayCurrentTimeLeftInSession();
            }, 1000)
        }
    }
}


// Displaying Time Function
const displayCurrentTimeLeftInSession = () => {
    const secondsLeft = currentTImeLeftInSession;
    let result = '';
    const seconds = secondsLeft % 60;
    const minutes = parseInt(secondsLeft / 60) % 60;
    let hours = parseInt(secondsLeft / 3600);

    // Adding leading zeros if <10
    function addLeadingZeroes(time) {
        return time < 10 ? `0${time}` : time
  }

  // Adding together strings and numbers
  if (hours > 0) result += `${hours}:`
  result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
  pomodoroTimer.innerText = result.toString();

  pomodoroTimer.innerText = result;  // not sure where this line goes
}


// Stopping the clock func
const stopClock = () => {
    clearInterval(clockTimer);
    isClockRunning = false;
    currentTimeLeftInSession = workSessionDuration;
    displayCurrentTimeLeftInSession();
}


// Toggling between work/study
const stepDown = () => {
    if (currentTimeLeftInSession > 0) {
        currentTimeLeftInSession--;
    } else if (currentTimeLeftInSession === 0) {
        if (type === 'Study') {
            currentTimeLeftInSession = breakSessionDuration;
            displaySessionLog('Study');
            type = 'Break';
        } else {
            currentTimeLeftInSession = workSessionDuration;
            type = 'Study';
            displaySessionLog('Break');
        }
    }
    displayCurrentTimeLeftInSession();
}