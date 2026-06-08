import type { Workout } from "../types/types";

type Props = {
    workouts: Workout[];
};

export default function WorkoutList({ workouts }: Props) {
    return (
        <div>
            {workouts.map((workout) => (
                <div key={workout.id}>
                    <h3>{workout.type}</h3>
                    <p>{workout.durationMinutes} minutes</p>
                </div>
            ))}
        </div>
    );
}


