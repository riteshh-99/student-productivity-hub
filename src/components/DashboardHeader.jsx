import { useState, useEffect } from "react";

function DashboardHeader() {
    const [name, setName] = useState("");
    const [savedName, setSavedName] = useState("");

    useEffect(() => {
        const storedName = localStorage.getItem("studentName");

        if (storedName) {
            setSavedName(storedName);
        }
    }, []);

    const saveName = () => {
        if (!name.trim()) return;

        localStorage.setItem("studentName", name);
        setSavedName(name);
        etName("");
    };

    const editName = () => {
        localStorage.removeItem("studentName");
        setSavedName("");
    };

    const today = new Date().toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    );

    return (
        <div className="card">
            {!savedName ? (
                <>
                    <h2>Welcome 👋</h2>

                    <p>Please enter your name to continue</p>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                saveName();
                            }
                        }}
                    />

                    <button onClick={saveName}>
                        Save
                    </button>
                </>
            ) : (
                <>
                    <h2>
                        👋 Welcome Back, {savedName}
                    </h2>

                    <p>
                        Stay focused and achieve your goals today.
                    </p>

                    <h3>📅 {today}</h3>

                    <p
                        style={{
                            cursor: "pointer",
                            color: "#10b981",
                            marginTop: "15px",
                            fontWeight: "600",
                        }}
                        onClick={editName}
                    >
                        ✏️ Edit Name
                    </p>
                </>
            )}
        </div>
    );
}

export default DashboardHeader;