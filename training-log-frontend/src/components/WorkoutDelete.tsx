import type { Workout } from "../types/types";

type Props = {
    workout: Workout | null;
    onDelete: (workout: Workout) => void;
};

export default function WorkoutDelete({ workout, onDelete }: Props) {
    if (!workout) {
        return (
            <div className="card card-delete">
                <h2>Delete workout</h2>
                <p className="idle-hint">Select a workout to delete it.</p>
            </div>
        );
    }

    return (
        <div className="card card-delete">
            <h2>Delete workout</h2>
            <p className="delete-info">
                Delete <strong>{workout.type}</strong>? This cannot be undone.
            </p>
            <button className="btn btn-danger" onClick={() => onDelete(workout)}>
                Delete
            </button>
        </div>
    );
}
