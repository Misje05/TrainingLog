import { useEffect, useState } from 'react';
import './App.css';

import WorkoutList from "./components/WorkoutList";
import WorkoutForm from "./components/WorkoutForm";
import type { Workout } from "./types/types";

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    fetch("http://localhost:5093/api/workoutsessions")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWorkouts(data);
      })
      .catch(console.error);
  }, []);

  const addWorkout = (data: {
    type: string;
    durationMinutes: number;
    notes: string;
  }) => {
    fetch("http://localhost:5093/api/workoutsessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: new Date().toISOString(),
        ...data,
      }),
    })
      .then((res) => res.json())
      .then((newWorkout) => {
        setWorkouts((prev) => [...prev, newWorkout]);
      });
  }

  return (
    <div>
      <h1>TrainingLog</h1>

      <WorkoutList workouts={workouts} />

      <WorkoutForm onAdd={addWorkout} />
    </div>
  );
}

export default App
