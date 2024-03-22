export interface DisplayState {
    time: number; // represents the time in seconds for the timer
    timeType: "Session" | "Break"; // Represents the type of the time
    timerRunning: boolean; // Represents whether the timer is currently running "true" or paused/stopped "false"
}

export const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60); // Calculating the number of minutes from a given time in secs
    const seconds = time % 60; // calculating the remaining seconds after extractng the minutes from the total
    // Adding leading zeros if necessary to ensure two digits for minutes and seconds
    return `${minutes < 10 ? "0" + minutes.toString() : minutes}:${
        seconds < 10 ? "0" + seconds.toString() : seconds
    }`;
};