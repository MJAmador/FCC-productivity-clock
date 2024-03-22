import { useCallback, useEffect, useState } from 'react';
import AlarmSound from "./assets/AlarmSound.mp3";
import './App.css';
import TimeSetter from './TimeSetter';
import Display from './Display';
import { DisplayState } from './helpers';

const defaultBreakTime = 5 * 60; // default break time duration in seconds, 5 minutes and 60 seconds per minute
const defaultSessionTime = 25 * 60; // default break time duration in seconds, 25 minutes and 60 seconds per minute
const min = 60; // minimum time interval in seconds (1 minute)
const max = 60 * 60; // maximum time duration allowed (1 hour)
const interval = 60; // time interval in seconds used for incrementing or decremening time values

function App() {
  const [breakTime, setBreakTime] = useState(defaultBreakTime); // Initial state setted to "defaultBreakTime" (5 mins)
  const [sessionTime, setSessionTime] = useState(defaultSessionTime); // Initial state setted to "defaultSessionTime" (25 mins)
  const [displayState, setDisplayState] = useState<DisplayState>({ 
    time: sessionTime, // default session time in seconds
    timeType: "Session", // Initial string setted to "Session"
    timerRunning: false, // Timer initially not running 
  });

  // Managing the timer if some dependencies change
  useEffect(() => {
    let timerID: number;
    if(displayState.timerRunning) {
      // If timer is running, setting up a timer that calls the "decrementTimer" function every 1000 milliseconds (1 sec)
      timerID = window.setInterval(decrementTimer, 1000); // window. object provides methods to execute code at specified time intervals
    }

    // Clearing the interval timer when the effect is cleaned up
    return () => {
      window.clearInterval(timerID);
    };
  }, [displayState.timerRunning]); // Dependencies that the effect depends on, the effect function will be re-executed when dependencies change

  // Managing the timer's decrement
  const decrementTimer = useCallback(() => {
    setDisplayState((prevState) => {
      if (prevState.time === 0) {
        // If timer gets to 0, play de alarmSound
        const audio = document.getElementById("beep") as HTMLAudioElement;
        audio.currentTime = 2; // starting the sound audio from 2, omiting first 2 secs
        audio.play().catch((err) => console.log(err)); // loging "err" to the console in case of mal-functioning
        
        // Changing time duration (breakTime or sessionTime) and name (str = "Break" or str = "Session") when timer gets to 0
        const nextTime = prevState.timeType === "Session" ? breakTime : sessionTime;
        const nextTimeType = prevState.timeType === "Session" ? "Break" : "Session";
        return { ...prevState, time: nextTime, timeType: nextTimeType};
      } else {
        return { ... prevState, time: prevState.time - 1}; // Decrementing the timer on intervals of 1 sec 
      }
    });
  }, [breakTime, sessionTime]); // It tells React when to re-initialize the "decrementTimer" callback function if the dependencies change

  // Resetting the timer-related states to their default values
  const reset = () => {
    setBreakTime(defaultBreakTime); // 5 mins 
    setSessionTime(defaultSessionTime); // 25 mins
    setDisplayState({ // Updating the displayState object 
      time: defaultSessionTime,
      timeType: "Session",
      timerRunning: false,
    });
    // Pausing the alarmSound if its sounding and setting the current playback time to 0
    const audio = document.getElementById("beep") as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
  };


  const startStop = () => {
    setDisplayState((prev) => ({ // "prev" represents the previous state of "displayState"
      // Creating a new state spreading the properties of the previous state (if "timmerRunning was 'true', it becomes 'false' and vice versa)
      ...prev,
      timerRunning: !prev.timerRunning,
    }));
  };

  // Allowing the user to change the breakTime value only if the timer isn't currently running
  const changeBreakTime = (time: number) => {
    // If the timer is running, the function returns early without executing the subsequent code, and therefore not updating the break time
    if(displayState.timerRunning) return;
    // Otherwise, allow the user to change the break time value
    setBreakTime(time);
  };

  // Allowing the user to change the sessionTime value only if the timer isn't currently running
  const changeSessionTime = (time: number) => {
    // If the timer is running, the function returns early without executing the subsequent code, and therefore not updating the session time
    if(displayState.timerRunning) return;
    // Otherwise, allow the user to change the session time value
    setSessionTime(time);
    setDisplayState({
      time: time,
      timeType: "Session",
      timerRunning: false,
    });
  };

  return (
    <>
      <div className="container">
        <div className="clock">
          <h1>25 + 5 Clock</h1>
          <div className="setters">
            <div className="break">
              <h4 id="break-label">Break Length</h4>
              <TimeSetter 
                time={breakTime}
                setTime={changeBreakTime}
                min={min}
                max={max}
                interval={interval}
                type="break"
              />
            </div>
            <div className="session">
              <h4 id="session-label">Session Length</h4>
              <TimeSetter
                time={sessionTime}
                setTime={changeSessionTime}
                min={min}
                max={max}
                interval={interval}
                type="session"
              />
            </div>
          </div>
          <Display
            displayState={displayState}
            reset={reset}
            startStop={startStop}
          />
          <audio id="beep" src={AlarmSound} />
          <footer>
          <code>Designed and Coded by <span style={{ color: "white"}}>Marcio Amador</span></code>
        </footer>
        </div>
      </div>
    </>
  )
}

export default App;
