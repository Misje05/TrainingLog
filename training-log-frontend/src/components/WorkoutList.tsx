import type { Workout } from "../types/types";

type Props = {
    workouts: Workout[];
    onEdit: (workout: Workout) => void;
};

export default function WorkoutList({ workouts, onEdit }: Props) {
    return (
        <div id="center">
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Duration</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {workouts.map((workout) => (
                        <tr id="hover" key={workout.id} onClick={() => onEdit(workout)}>
                            <td>{workout.type}</td>

                            {/* Dette viser timer når minst 1 og skjuler minutter når 0 ekstra */}
                            <td>
                                {workout.durationMinutes >= 60
                                    ? `${Math.floor(workout.durationMinutes / 60)}h${
                                        workout.durationMinutes % 60 > 0
                                            ? ` og ${workout.durationMinutes % 60}min` 
                                            : ""
                                    }`
                                    : `${workout.durationMinutes % 60}min`}
                            </td>
                            <td>{workout.notes}</td>
                        </tr>    
                    ))}
                </tbody>
            </table>   
        </div>
    );
}


