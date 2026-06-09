import { useState } from "react";
import type { Workout } from "../types/types";

type Props = {
    workout: Workout | null;
    onChange: (workout: Workout) => void;
};

/*
    Brukes useState og masse ? for å sjekke om elementene faktisk eksisterer. Workout vil 
    inneholde treningen som skal endres hvis en workout er valgt eller null for motsatt. 
    onChange er funksjonen som kalles når bruker trykker "Save" og sender den oppdaterte
    workouten tilbake til App-komponenten.
*/
export default function WorkoutEdit({ workout, onChange }: Props) {
    const [type, setType] = useState(workout?.type ?? "");
    const [duration, setDuration] = useState(
        workout?.durationMinutes.toString() ?? ""
    );
    const [notes, setNotes] = useState(workout?.notes ?? "");
    
    const isInvalid = type.trim() === "" || duration.trim() === "" || notes.trim() === "";

    if (!workout) {
        return <p>Select a workout to edit</p>;
    }

    return (
        <div>
            <h2>Edit workout</h2>

            <input 
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
            />

            <br />

            <input 
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
            />

            <br />

            <input 
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />

            <br />

            <button
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
                Save
            </button>
        </div>
    );
}