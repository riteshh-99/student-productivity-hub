import { useState, useEffect } from "react";

function PomodoroTimer() {
    const [mode, setMode] = useState(
        localStorage.getItem(
            "pomodoroMode"
        ) || "focus"
    );

    const [time, setTime] = useState(
        Number(
            localStorage.getItem(
                "pomodoroTime"
            )
        ) || 1500
    );

    const [running, setRunning] =
        useState(false);

    const [sessions, setSessions] =
        useState(() => {
            return (
                Number(
                    localStorage.getItem(
                        "sessions"
                    )
                ) || 0
            );
        });

    const [studyMinutes, setStudyMinutes] =
        useState(() => {
            return (
                Number(
                    localStorage.getItem(
                        "studyMinutes"
                    )
                ) || 0
            );
        });

    useEffect(() => {
        localStorage.setItem(
            "sessions",
            sessions
        );


        localStorage.setItem(
            "studyMinutes",
            studyMinutes
        );

        localStorage.setItem(
            "pomodoroTime",
            time
        );

        localStorage.setItem(
            "pomodoroMode",
            mode
        );

        window.dispatchEvent(
            new Event("statsUpdated")
        );


    }, [
        sessions,
        studyMinutes,
        time,
        mode,
    ]);

    useEffect(() => {
        let interval;


        if (running && time > 0) {
            interval = setInterval(() => {
                setTime(
                    (prev) => prev - 1
                );
            }, 1000);
        }

        if (time === 0) {
            setRunning(false);

            if (mode === "focus") {
                setSessions(
                    (prev) => prev + 1
                );

                setStudyMinutes(
                    (prev) => prev + 25
                );

                alert(
                    "🎉 Focus Session Complete!"
                );
            } else {
                alert(
                    "☕ Break Complete!"
                );
            }
        }

        return () =>
            clearInterval(interval);


    }, [running, time, mode]);

    const minutes =
        Math.floor(time / 60);

    const seconds =
        time % 60;

    function switchToFocus() {
        setMode("focus");
        setTime(1500);
        setRunning(false);
    }

    function switchToBreak() {
        setMode("break");
        setTime(300);
        setRunning(false);
    }

    function resetTimer() {
        setRunning(false);


        const defaultTime =
            mode === "focus"
                ? 1500
                : 300;

        setTime(defaultTime);

        localStorage.setItem(
            "pomodoroTime",
            defaultTime
        );


    }

    return (<div className="card"> <h2>Pomodoro Timer</h2>


        <div>
            <button
                onClick={
                    switchToFocus
                }
            >
                📚 Focus
            </button>

            <button
                onClick={
                    switchToBreak
                }
            >
                ☕ Break
            </button>
        </div>

        <h3
            style={{
                marginTop: "15px",
            }}
        >
            {mode === "focus"
                ? "Focus Session"
                : "Break Session"}
        </h3>

        <h1
            style={{
                fontSize: "4rem",
                margin: "20px 0",
            }}
        >
            {minutes}:
            {seconds < 10
                ? `0${seconds}`
                : seconds}
        </h1>

        <button
            onClick={() =>
                setRunning(
                    !running
                )
            }
        >
            {running
                ? "Pause"
                : "Start"}
        </button>

        <button
            onClick={
                resetTimer
            }
        >
            Reset
        </button>

        <div
            style={{
                marginTop: "25px",
            }}
        >
            <h3>
                🍅 Sessions Today:
                {" "}
                {sessions}
            </h3>

            <h3>
                📈 Study Time:
                {" "}
                {studyMinutes}
                {" "}
                mins
            </h3>
        </div>
    </div>


    );
}

export default PomodoroTimer;
