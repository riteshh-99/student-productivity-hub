import { useState, useEffect } from "react";

function CGPATracker() {
    const [sgpa, setSgpa] = useState("");

    const [semesters, setSemesters] =
        useState(() => {
            const saved =
                localStorage.getItem("semesters");


            return saved
                ? JSON.parse(saved)
                : [];
        });


    useEffect(() => {
        localStorage.setItem(
            "semesters",
            JSON.stringify(semesters)
        );


        const cgpa =
            semesters.length > 0
                ? (
                    semesters.reduce(
                        (sum, sem) =>
                            sum + Number(sem.sgpa),
                        0
                    ) / semesters.length
                ).toFixed(2)
                : 0;

        localStorage.setItem(
            "cgpa",
            cgpa
        );

        window.dispatchEvent(
            new Event("statsUpdated")
        );


    }, [semesters]);

    function addSemester() {
        if (!sgpa) return;


        const newSemester = {
            id: Date.now(),
            sgpa,
        };

        setSemesters([
            ...semesters,
            newSemester,
        ]);

        setSgpa("");


    }

    function deleteSemester(id) {
        setSemesters(
            semesters.filter(
                (sem) => sem.id !== id
            )
        );
    }

    const cgpa =
        semesters.length > 0
            ? (
                semesters.reduce(
                    (sum, sem) =>
                        sum + Number(sem.sgpa),
                    0
                ) / semesters.length
            ).toFixed(2)
            : 0;

    return (<div className="card"> <h2>CGPA Tracker</h2>


        <input
            type="number"
            step="0.01"
            placeholder="Enter SGPA"
            value={sgpa}
            onChange={(e) =>
                setSgpa(e.target.value)
            }
        />

        <button
            onClick={addSemester}
        >
            Add Semester
        </button>

        <p
            style={{
                marginTop: "15px",
                fontWeight: "600",
            }}
        >
            Total Semesters:
            {" "}
            {semesters.length}
        </p>

        <h3
            style={{
                marginTop: "15px",
                color: "#10b981",
            }}
        >
            🎓 Current CGPA:
            {" "}
            {cgpa}
        </h3>

        <ul>
            {semesters.map(
                (sem, index) => (
                    <li key={sem.id}>
                        Semester
                        {" "}
                        {index + 1}
                        {" "}
                        :
                        {" "}
                        {sem.sgpa}

                        <button
                            onClick={() =>
                                deleteSemester(
                                    sem.id
                                )
                            }
                        >
                            Delete
                        </button>
                    </li>
                )
            )}
        </ul>
    </div>


    );
}

export default CGPATracker;
