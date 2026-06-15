import { useState, useEffect } from "react";

function GoalTracker() {
    const [goal, setGoal] = useState("");

    const [goals, setGoals] = useState(() => {
        const savedGoals = localStorage.getItem("goals");


        return savedGoals
            ? JSON.parse(savedGoals)
            : [];


    });

    useEffect(() => {
        localStorage.setItem(
            "goals",
            JSON.stringify(goals)
        );

        window.dispatchEvent(
            new Event("statsUpdated")
        );


    }, [goals]);

    function addGoal() {
        if (!goal.trim()) return;


        const updatedGoals = [
            ...goals,
            {
                id: Date.now(),
                text: goal,
                completed: false,
            },
        ];

        setGoals(updatedGoals);
        setGoal("");


    }

    function toggleGoal(id) {
        const updatedGoals = goals.map((g) =>
            g.id === id
                ? {
                    ...g,
                    completed: !g.completed,
                }
                : g
        );


        setGoals(updatedGoals);


    }

    function deleteGoal(id) {
        const updatedGoals = goals.filter(
            (g) => g.id !== id
        );


        setGoals(updatedGoals);


    }

    const completedGoals =
        goals.filter((g) => g.completed).length;

    return (<div className="card"> <h2>Daily Goals</h2>


        <input
            value={goal}
            placeholder="Enter goal"
            onChange={(e) =>
                setGoal(e.target.value)
            }
        />

        <button onClick={addGoal}>
            Add
        </button>

        <p
            style={{
                marginTop: "10px",
                fontWeight: "600",
                color: "#10b981",
            }}
        >
            ✅ Completed: {completedGoals} / {goals.length}
        </p>

        <ul>
            {goals.map((g) => (
                <li key={g.id}>
                    <span
                        className={
                            g.completed
                                ? "done"
                                : ""
                        }
                        onClick={() =>
                            toggleGoal(g.id)
                        }
                        style={{
                            cursor: "pointer",
                        }}
                    >
                        {g.text}
                    </span>

                    <button
                        onClick={() =>
                            deleteGoal(g.id)
                        }
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    </div>


    );
}

export default GoalTracker;
