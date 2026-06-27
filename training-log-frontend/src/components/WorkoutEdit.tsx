import { useState } from "react";
import type { Workout } from "../types/types";

type Props = {
    workout: Workout | null;
    onChange: (workout: Workout) => void;
};

export default function WorkoutEdit({ workout, onChange }: Props) {
    const [type, setType] = useState(workout?.type ?? "");
    const [duration, setDuration] = useState(workout?.durationMinutes.toString() ?? "");
    const [notes, setNotes] = useState(workout?.notes ?? "");

    const isInvalid = type.trim() === "" || duration.trim() === "" || notes.trim() === "";

    if (!workout) {
        return (
            <div className="card">
                <h2>Edit workout</h2>
                <p className="idle-hint">Click a row in the list to select a workout.</p>
            </div>
        );
    }

    return (
        <div className="card">
            <h2>Edit workout</h2>

            <div className="field">
                <label htmlFor="edit-type">Type</label>
                <input
                    id="edit-type"
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
            </div>

            <div className="field">
                <label htmlFor="edit-duration">Duration (minutes)</label>
                <input
                    id="edit-duration"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
            </div>

            <div className="field">
                <label htmlFor="edit-notes">Notes</label>
                <input
                    id="edit-notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>

            <button
                className="btn btn-save"
                disabled={isInvalid}
                onClick={() =>
                    onChange({
                        ...workout,
                        type,
                        durationMinutes: Number(duration),
                        notes,
                    })
                }
            >
                Save changes
            </button>
        </div>
    );
}
