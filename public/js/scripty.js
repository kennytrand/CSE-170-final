
// initializing vars
const pomodoroTimer = document.querySelector('#pomodoro-timer');
const startButton = document.querySelector('#pomodoro-start');
const stopButton = document.querySelector('#pomodoro-stop');
const progressBar = new ProgressBar.Circle('#pomodoro-timer', {
    strokeWidth: 2,;
    text: {
      value: '25:00',
    },
    trailColor: '#f4f4f4',
  })

let type = 'Study';
let timeSpentInCurrentSession = 0;
let currentTaskLabel = document.querySelector('pomodoro-clock-task');
let updatedWorkSessionDuration
let updatedBreakSessionDuration
let workDurationInput = document.querySelector('#input-work-duration')
let breakDurationInput = document.querySelector('#input-break-duration')
let isClockStopped = true;
let isClockRunning = false;

workDurationInput.value = '25'
breakDurationInput.value = '5'



// Start button
startButtron.addEventListener('click', () => {
    toggleClock();
})

// Stop button 
stopButton.addEventListener('click', () => {
    toggleClock(true);
})

// Update Study time
workDurationInput.addEventListener('input', () => {
  updatedWorkSessionDuration = minuteToSeconds(workDurationInput.value)
})

// Update Pause time
breakDurationInput.addEventListener('input', () => {
  updatedBreakSessionDuration = minuteToSeconds(breakDurationInput.value)
})

const minuteToSeconds = (mins) => {
    return mins*60;
}


// 25 min in seconds
let workSessionDuration = 1500;
letcurrentTimeLeftInSession = 1500;
// 5 min in seconds
let breakSessionDuration = 300;


// Toggling clock function
const toggleClock = (reset) => {
  togglePlayPauseIcon(reset);
  if (reset) {
    stopClock();
  } else {
    console.log(isClockStopped);
    if (isClockStopped) {
      setUpdatedTimers();
      isClockStopped = false;
    }
    if (isClockRunning === true) {
      // pause
      clearInterval(clockTimer);
      // update icon to the play one
      isClockRunning = false;
    } else {
      // start
      clockTimer = setInterval(() => {
        stepDown();
        displayCurrentTimeLeftInSession();
      }, 1000)
      isClockRunning = true;
    }
    showStopIcon();
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
        return time < 10 ? `0${time}` : time;
  }

  // Adding together strings and numbers
  if (hours > 0) result += `${hours}:`
  result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
  progressBar.text.innerText = result.toString();

  pomodoroTimer.innerText = result;  // not sure where this line goes
}


// Stopping the clock func
const stopClock = () => {
    setUpdatedTimers();
    displaySessionLog(type);
    clearInterval(clockTimer);
    isClockStopped = true;
    isClockRunning = false;
    currentTimeLeftInSession = workSessionDuration;
    displayCurrentTimeLeftInSession();
    type = 'Study';
    timeSpentInCurrentSession = 0;  
    //type = type === 'Study' ? 'Break' : 'Study';
}


// Toggling between work/study
const stepDown = () => {
    if (currentTimeLeftInSession > 0) {
        currentTimeLeftInSession--;
        timeSpentInCurrentSession++;
    } else if (currentTimeLeftInSession === 0) {
        timeSpentInCurrentSession = 0;
        // Timer is over -> if work switch to break, viceversa
        if (type === 'Study') {
            currentTimeLeftInSession = breakSessionDuration;
            displaySessionLog('Study');
            type = 'Break';
            setUpdatedTimers();
            currentTaskLabel.value = 'Break';
            currentTaskLabel.disabled = true;
        } else {
            currentTimeLeftInSession = workSessionDuration;
            type = 'Study';
            setUpdatedTimers();
            if (currentTaskLabel.value === 'Break') {
                currentTaskLabel.value = workSessionLabel;
            }
            currentTaskLabel.disabled = true;  //change if want to label breaks
            displaySessionLog('Break');
        }
    }
    displayCurrentTimeLeftInSession();
}


// Display Session log
const displaySessionLog = (type) => {
    const sessionsList = document.querySelector('#pomodoro-sessions');
    const li = document.createElement('li');

    if (type === 'Study') {
        sessionLabel = currentTaskLabel.value ? currentTaskLabel.value : 'Work';
        workSessionLabel = sessionLabel;
    } else {
        sessionLabel = 'Break';
    }

    let elapsedTime = parseInt(timeSpentInCurrentSession / 60);
    elapsedTime = elapsedTime > 0 ? elapsedTime : '<1';

    const text = document.createTextNode(`${sessionLabel} : ${elapsedTime} min`)
    li.appendChild(text);
    sessionsList.appendChild(li);
}


// If user updates, change
const setUpdatedTimers = () => {
    if (type === 'Study') {
        currentTimeLeftInSession = updatedWorkSessionDuration
            ? updatedWorkSessionDuration
            : workSessionDuration;
        workSessionDuration = currentTimeLeftInSession;
  } else {
        currentTimeLeftInSession = updatedBreakSessionDuration
            ? updatedBreakSessionDuration
            : breakSessionDuration;
        breakSessionDuration = currentTimeLeftInSession; 
    }
}


// Toggling button icons
const togglePlayPauseIcon = (reset) => {
    const playIcon = document.querySelector('#play-icon');
    const pauseIcon = document.querySelector('#pause-icon');
    if (reset) {
        if (playIcon.classList.contains('hidden')) {
            playIcon.classList.remove('hidden');
        }
        if (!pauseIcon.classList.contains('hidden')) {
            pauseIcon.classList.add('hidden');
        }
    } else {
        playIcon.classList.toggle('hidden');
        pauseIcon.classList.toggle('hidden');
    }
}


// Display stop icon
const  showStopIcon = () => {
    const stopButton = document.querySelector('#pomodoro-stop');
    stopButton.classList.remove('hidden');
}