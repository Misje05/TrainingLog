import { useEffect, useState } from 'react';
import './App.css';

import WorkoutList from "./components/WorkoutList";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutEdit from "./components/WorkoutEdit";
import type { Workout } from "./types/types";

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    fetch("http://localhost:5093/api/workoutsessions")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWorkouts(data);
      })
      .catch(console.error);
  }, []);

  /*
    Dette er funksjonen som brukes av WorkoutForm for å legge til en workout ved
    bruk av POST, API fetching, stringify og innsetting av workout sist til slutt.
  */
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

  /*
    Denne fungerer ganske likt som den over men for PUT i stedet. Prev er navnet 
    på listen med gamle workouts. Den siste then() går gjennom alle elementer
    i prev og bytter ut den gamle workouten med riktig id med updatedWorkout.
    Vi er også nødt å bruke async siden hentingen i databasen og endringen tar 
    lengre tid enn hva React componentene tillater.
  */
  const changeWorkout = (workout: Workout) => {
    fetch(`http://localhost:5093/api/workoutsessions/${workout.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workout),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to update workout: ${res.status}`);
        }

        const responseText = await res.text();
        return responseText ? (JSON.parse(responseText) as Workout) : workout;
      })
      .then((updatedWorkout) => {
        setWorkouts((prev) => 
          prev.map((w) => (w.id === updatedWorkout.id ? updatedWorkout : w))
        );
        setSelectedWorkout(updatedWorkout);
      })
      .catch(console.error);
  };

  return (
    <div className="container">

      <div className="left">
        <h1>TrainingLog</h1>
        
        <WorkoutList workouts={workouts} onEdit={setSelectedWorkout} />
      </div>

      <div className="right">
        <WorkoutForm onAdd={addWorkout} />

        <WorkoutEdit
          key={selectedWorkout?.id ?? "none"}
          workout={selectedWorkout}
          onChange={changeWorkout}
          />
        </div>
    </div>
  );
}

export default App
