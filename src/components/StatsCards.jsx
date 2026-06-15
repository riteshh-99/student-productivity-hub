import { useState, useEffect } from "react";

function StatsCards() {
    const [stats, setStats] = useState({
        goals: 0,
        cgpa: 0,
        attendance: 0,
        sessions: 0,
    });

    useEffect(() => {
        const updateStats = () => {
            const goals =
                JSON.parse(
                    localStorage.getItem("goals")
                ) || [];


            const cgpa =
                localStorage.getItem("cgpa") || 0;

            const sessions =
                Number(
                    localStorage.getItem(
                        "sessions"
                    )
                ) || 0;

            const attended =
                Number(
                    localStorage.getItem(
                        "attended"
                    )
                ) || 0;

            const total =
                Number(
                    localStorage.getItem(
                        "total"
                    )
                ) || 0;

            const attendance =
                total > 0
                    ? (
                        (attended / total) *
                        100
                    ).toFixed(1)
                    : 0;

            setStats({
                goals: goals.length,
                cgpa,
                attendance,
                sessions,
            });
        };

        updateStats();

        window.addEventListener(
            "statsUpdated",
            updateStats
        );

        return () => {
            window.removeEventListener(
                "statsUpdated",
                updateStats
            );
        };


    }, []);

    return (<div className="stats-container"> <div className="stat-card"> <h3>🎯 Goals</h3> <h2>{stats.goals}</h2> </div>


        <div className="stat-card">
            <h3>🎓 CGPA</h3>
            <h2>{stats.cgpa}</h2>
        </div>

        <div className="stat-card">
            <h3>📚 Attendance</h3>
            <h2>{stats.attendance}%</h2>
        </div>

        <div className="stat-card">
            <h3>🍅 Sessions</h3>
            <h2>{stats.sessions}</h2>
        </div>
    </div>


    );
}

export default StatsCards;
