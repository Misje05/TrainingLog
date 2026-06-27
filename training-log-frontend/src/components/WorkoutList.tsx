import type { Workout } from "../types/types";

type Props = {
    workouts: Workout[];
    onEdit: (workout: Workout | null) => void;
    selectedId?: number | null;
};

function formatDuration(minutes: number): string {
    if (minutes < 60) return `${minutes} min`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

export default function WorkoutList({ workouts, onEdit, selectedId }: Props) {
    if (workouts.length === 0) {
        return (
            <div className="empty-state">
                No workouts yet — add one to get started.
            </div>
        );
    }

    return (
        <table className="workout-table">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Duration</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                {workouts.map((workout) => (
                    <tr
                        key={workout.id}
                        className={selectedId === workout.id ? "selected" : ""}
                        onClick={() => onEdit(selectedId === workout.id ? null : workout)}
                    >
                        <td className="td-type">{workout.type}</td>
                        <td className="td-duration">{formatDuration(workout.durationMinutes)}</td>
                        <td className="td-notes">{workout.notes}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
