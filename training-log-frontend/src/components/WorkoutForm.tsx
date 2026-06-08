import { useState } from "react";

type Props = {
    onAdd: (workout: {
        type: string;
        durationMinutes: number;
        notes: string;
    }) => void;
};

export default function WorkoutList({ onAdd }: Props) {
    const [type, setType] = useState("");
    const [duration, setDuration] = useState("");
    const [notes, setNotes]= useState(""); 
    
    return (
        <div>
            <input
                type="text"
                placeholder="Workout Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
            />

            <br/>

            <input
                type="number"
                placeholder="Duration (minutes)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
            />

            <br/> 

            <input
                type="text"
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            
            <br/> 

            <button 
                onClick={() => { 
                    onAdd({
                        type,
                        durationMinutes: Number(duration),
                        notes,
                    });

                    setType("");
                    setDuration("");
                    setNotes("");
                }}>
                Add Workout
            </button>
        </div>
    )
}


