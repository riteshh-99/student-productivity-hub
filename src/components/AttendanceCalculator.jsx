import { useState, useEffect } from "react";

function AttendanceCalculator() {
    const [attended, setAttended] = useState("");
    const [total, setTotal] = useState("");

    useEffect(() => {
        const savedAttended =
            localStorage.getItem("attended");


        const savedTotal =
            localStorage.getItem("total");

        if (savedAttended) {
            setAttended(savedAttended);
        }

        if (savedTotal) {
            setTotal(savedTotal);
        }


    }, []);

    useEffect(() => {
        localStorage.setItem(
            "attended",
            attended
        );

        localStorage.setItem(
            "total",
            total
        );

        window.dispatchEvent(
            new Event("statsUpdated")
        );


    }, [attended, total]);

    const percentage =
        total > 0
            ? (
                (Number(attended) /
                    Number(total)) *
                100
            ).toFixed(1)
            : 0;

    const classesNeeded =
        percentage < 75 && total > 0
            ? Math.ceil(
                (75 * Number(total) -
                    100 * Number(attended)) /
                25
            )
            : 0;

    return (<div className="card"> <h2>Attendance Calculator</h2>


        <input
            type="number"
            placeholder="Attended"
            value={attended}
            onChange={(e) =>
                setAttended(e.target.value)
            }
        />

        <input
            type="number"
            placeholder="Total"
            value={total}
            onChange={(e) =>
                setTotal(e.target.value)
            }
        />

        <div
            style={{
                marginTop: "20px",
                textAlign: "center",
            }}
        >
            <h3>
                Current Attendance:
                {" "}
                {percentage}%
            </h3>

            {percentage >= 75 ? (
                <p
                    style={{
                        color: "#10b981",
                        fontWeight: "600",
                        marginTop: "10px",
                    }}
                >
                    ✅ Safe Zone
                </p>
            ) : total > 0 ? (
                <>
                    <p
                        style={{
                            color: "#ef4444",
                            fontWeight: "600",
                            marginTop: "10px",
                        }}
                    >
                        ⚠️ Below 75%
                    </p>

                    <p
                        style={{
                            marginTop: "8px",
                            fontWeight: "500",
                        }}
                    >
                        Need {classesNeeded}
                        {" "}
                        more classes to
                        reach 75%
                    </p>
                </>
            ) : null}
        </div>
    </div>


    );
}

export default AttendanceCalculator;
