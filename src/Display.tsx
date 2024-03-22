import { FaPause, FaPlay, FaUndo } from "react-icons/fa";
import { DisplayState, formatTime } from "./helpers";

// defining the props the Display component expects to receive
interface DisplayProps {
    displayState: DisplayState;
    reset: () => void;
    startStop: () => void;
}

const Display: React.FC<DisplayProps> = ({ displayState, reset, startStop }) => {
    // the function calls the "startStop" function passed as prop when the start/stop button is clicked
    const handleStartStop = () => {
        startStop();
    };

    // Checking if timer is less than one minute (60 secs)
    const isRed = displayState.time < 60;

    return (
        <div className="display">
            <h4 id="timer-label">{displayState.timeType}</h4>
            <span 
                id="time-left" 
                style={{ color: isRed ? "firebrick" : "white" }}
            >
                {formatTime(displayState.time)}
            </span>
            <div className="controls">
                <button 
                    id="start_stop" 
                    onClick={handleStartStop}
                    className="controls-button"
                >
                    {displayState.timerRunning ? <FaPause /> : <FaPlay />}
                </button>
                <button 
                    id="reset" 
                    onClick={reset}
                    className="controls-button"
                >
                    <FaUndo /> 
                </button>
            </div>
        </div>
    )
}

export default Display;