import { FaArrowDown, FaArrowUp } from "react-icons/fa";

interface TimeSetterProps {
    time: number;
    setTime: (time: number) => void;
    min: number;
    max: number;
    interval: number;
    type: "break" | "session";
}

// declaring TimeSetter as a functional component that takes the props previously determined and renders the decrement and incremente buttons, along with the current value
const TimeSetter: React.FC<TimeSetterProps> = ({
    time,
    setTime,
    min,
    max,
    interval,
    type,
}) => {
    return (
        <div>
            <button 
                // decrementing the time by the interval (60 secs) only if the current time is greater than min
                onClick={() => (time > min ? setTime(time - interval) : null)}
                // Using template literal and the "type" prop for determining the id of the button 
                id={`${type}-decrement`}
                className="controls-button"
            >
                <FaArrowDown />
            </button>
            <span id={`${type}-length`}>{time / interval}</span>
            <button 
                // incrementing the time by the interval (60 secs) only if the current time is lower than max
                onClick={() => (time < max ? setTime(time + interval) : null)}
                // // Using template literal and the "type" prop for determining the id of the button
                id={`${type}-increment`}
                className="controls-button"
            >
                <FaArrowUp />
            </button>
        </div>
    )
};

export default TimeSetter;