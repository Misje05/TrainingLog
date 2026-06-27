import { useState } from "react";

type Props = {
    onAdd: (workout: {
        type: string;
        durationMinutes: number;
        notes: string;
    }) => void;
};

export default function WorkoutForm({ onAdd }: Props) {
    const [type, setType] = useState("");
    const [duration, setDuration] = useState("");
    const [notes, setNotes] = useState("");

    const isInvalid = type.trim() === "" || duration.trim() === "" || notes.trim() === "";

    return (
        <div className="card">
            <h2>Add workout</h2>

            <div className="field">
                <label htmlFor="add-type">Type</label>
                <input
                    id="add-type"
                    type="text"
                    placeholder="e.g. Running, Cycling..."
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
            </div>

            <div className="field">
                <label htmlFor="add-duration">Duration (minutes)</label>
                <input
                    id="add-duration"
                    type="number"
                    placeholder="e.g. 45"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
            </div>

            <div className="field">
                <label htmlFor="add-notes">Notes</label>
                <input
                    id="add-notes"
                    type="text"
                    placeholder="How did it go?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>

            <button
                className="btn btn-primary"
                disabled={isInvalid}
                onClick={() => {
                    onAdd({ type, durationMinutes: Number(duration), notes });
                    setType("");
                    setDuration("");
                    setNotes("");
                }}
            >
                Add Workout
            </button>
        </div>
    );
}
