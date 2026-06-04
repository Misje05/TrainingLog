import { useEffect, useState } from 'react';
import './App.css';

type Workout = {
  id: number;
  title: string;
  durationMinutes: number;
}

function App() {
  //const [count, setCount] = useState(0)
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetch("http://localhost:5093/api/workoutsessions")
      .then((response) => response.json())
      .then((data) => setWorkouts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>TrainingLog</h1>

      {workouts.map((workout) => (
        <div key={workout.id}>
          <h3>{workout.title}</h3>
          <p>The duration of the workout is {workout.durationMinutes} minutes.</p>
        </div>
      ))}

      <br/> 

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
          fetch("http://localhost:5093/api/workoutsessions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              date: new Date().toISOString(),
              type: type,
              durationMinutes: Number(duration),
              notes: notes
            })
          })
          .then(res => res.json()
          .then(data => console.log(data)));
        }}>
        Add Workout
      </button>

    </div>
  );
}

export default App
