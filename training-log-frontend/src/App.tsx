import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

type Workout = {
  id: number;
  title: string;
  durationMinutes: number;
}

function App() {
  //const [count, setCount] = useState(0)
  const [workouts, setWorkouts] = useState<Workout[]>([]);

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
    </div>
  );
}

export default App
