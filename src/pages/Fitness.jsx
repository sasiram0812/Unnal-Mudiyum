import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Fitness.css";
import StudyChart from "../components/StudyChart";
import Loader from "../components/Loader";

import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  setDoc,
  onSnapshot,
  doc,
  query,
  where,
} from "firebase/firestore";

function Fitness() {
  const user = auth.currentUser;

  const todayDate = new Date().toDateString();

  const [steps, setSteps] = useState("");
  const [sleep, setSleep] = useState("");
  const [mood, setMood] = useState("😊");
  const [water, setWater] = useState(0);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [workoutInput, setWorkoutInput] = useState("");
  const [workoutTime, setWorkoutTime] = useState("");
  const [workouts, setWorkouts] = useState([]);

  const stepGoal = 8000;

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    // TODO page does not load DB now, so just wait 300ms
    await new Promise(r => setTimeout(r, 300));
    setLoading(false);
  };

  fetchData();
}, []);

  

  // -------------------------------------------------------------
  // LOAD DAILY FITNESS DATA
  // -------------------------------------------------------------
  useEffect(() => {
    if (!user) return;

    const ref = doc(db, "fitnessDaily", `${user.uid}_${todayDate}`);

    onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const d = snap.data();
        setSteps(d.steps || "");
        setSleep(d.sleep || "");
        setMood(d.mood || "😊");
        setWater(d.water || 0);
        setHeight(d.height || "");
        setWeight(d.weight || "");
      }
    });
  }, [user]);

  // -------------------------------------------------------------
  // LOAD WORKOUT LOGS
  // -------------------------------------------------------------
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "workouts"),
      where("userId", "==", user.uid)
    );

    onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setWorkouts(list.reverse());
    });
  }, [user]);

  // -------------------------------------------------------------
  // SAVE DAILY FITNESS DATA
  // -------------------------------------------------------------
  const saveDailyFitness = async (field, value) => {
    await setDoc(
      doc(db, "fitnessDaily", `${user.uid}_${todayDate}`),
      {
        userId: user.uid,
        date: todayDate,
        steps,
        sleep,
        mood,
        water,
        height,
        weight,
        [field]: value,
      },
      { merge: true }
    );
  };

  // -------------------------------------------------------------
  // ADD WORKOUT
  // -------------------------------------------------------------
  const addWorkout = async () => {
    if (!workoutInput.trim() || !workoutTime.trim()) return;

    const calories = Math.floor(workoutTime * 7);

    await addDoc(collection(db, "workouts"), {
      userId: user.uid,
      title: workoutInput,
      minutes: workoutTime,
      calories,
      date: todayDate,
    });

    setWorkoutInput("");
    setWorkoutTime("");
  };

  // BMI
  const bmi =
    height && weight ? (weight / (height / 100) ** 2).toFixed(1) : null;

  const bmiStatus = bmi
    ? bmi < 18.5
      ? "Underweight"
      : bmi < 24.9
      ? "Healthy"
      : bmi < 29.9
      ? "Overweight"
      : "Obese"
    : "—";

  const sleepQuality =
    sleep === ""
      ? "—"
      : sleep < 5
      ? "Poor"
      : sleep < 7
      ? "Good"
      : "Excellent";

  const stepsProgress = Math.min((steps / stepGoal) * 100, 100);

  const weeklyFitnessData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    studyHours: [7000, 8500, 9000, 7500, 10000, 6000, 4000],
    goals: [8000, 8000, 8000, 8000, 8000, 8000, 8000],
  };

   if (!user || loading) {
  return <Loader />;
}


<h1 style={{ color: "red" }}>Dashboard Loaded</h1>

  return (
    <div className="fitness-container">
      <Navbar />

      <div className="fitness-wrapper fade-in">

        <h1 className="fitness-title">💪 Fitness & Wellness</h1>
        <p className="fitness-subtitle">
          Track your steps, sleep, water, mood and workouts — stay healthy every day.
        </p>

        {/* STEPS */}
        <div className="card steps-card pop">
          <h2>Daily Steps</h2>

          <input
            type="number"
            placeholder="Enter steps..."
            className="steps-input"
            value={steps}
            onChange={(e) => {
              setSteps(e.target.value);
              saveDailyFitness("steps", e.target.value);
            }}
          />

          <h1 className="steps-count">{steps || 0}</h1>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${stepsProgress}%` }}
            ></div>
          </div>

          <p className="muted">{stepsProgress.toFixed(0)}% of 8000 steps</p>
        </div>

        {/* MOOD */}
        <div className="card mood-card slide-up">
          <h2>How Are You Feeling?</h2>

          <div className="mood-options">
            {["😊", "😐", "😢", "😡", "🤒"].map((m) => (
              <span
                key={m}
                className={`mood-emoji ${m === mood ? "mood-active" : ""}`}
                onClick={() => {
                  setMood(m);
                  saveDailyFitness("mood", m);
                }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* SLEEP */}
        <div className="card sleep-card slide-left">
          <h2>Sleep Tracker</h2>

          <input
            type="number"
            placeholder="Sleep hours (e.g. 7)"
            className="sleep-input"
            value={sleep}
            onChange={(e) => {
              setSleep(e.target.value);
              saveDailyFitness("sleep", e.target.value);
            }}
          />

          <p className="sleep-summary">
            Today: <strong>{sleep || 0}</strong> hrs —
            <span className="sleep-quality"> {sleepQuality}</span>
          </p>
        </div>

        {/* WATER */}
        <div className="card water-card pop">
          <h2>Water Tracker (8 cups)</h2>

          <div className="water-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`water-cup ${water > i ? "filled" : ""}`}
                onClick={() => {
                  setWater(i + 1);
                  saveDailyFitness("water", i + 1);
                }}
              >
                🥤
              </div>
            ))}
          </div>

          <p className="muted">{water}/8 cups today</p>
        </div>

        {/* BMI */}
        <div className="card bmi-card slide-up">
          <h2>BMI Calculator</h2>

          <div className="bmi-inputs">
            <input
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
                saveDailyFitness("height", e.target.value);
              }}
            />

            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                saveDailyFitness("weight", e.target.value);
              }}
            />
          </div>

          <h3 className="bmi-value">BMI: {bmi || "--"}</h3>
          <p className="bmi-status">Status: {bmiStatus}</p>
        </div>

        {/* WEEKLY CHART */}
        <div className="card chart-card pop">
          <h2>Weekly Steps Chart</h2>
          <StudyChart weeklyData={weeklyFitnessData} />
        </div>

        {/* WORKOUT LOG */}
        <div className="card workout-card slide-up">
          <h2>Workout Log</h2>

          <div className="workout-input-box">
            <input
              type="text"
              placeholder="Workout name..."
              value={workoutInput}
              onChange={(e) => setWorkoutInput(e.target.value)}
            />
            <input
              type="number"
              placeholder="Minutes"
              value={workoutTime}
              onChange={(e) => setWorkoutTime(e.target.value)}
            />
            <button className="primary-btn" onClick={addWorkout}>
              Add
            </button>
          </div>

          {workouts.length === 0 && (
            <p className="muted">No workouts added yet.</p>
          )}

          {workouts.map((w) => (
            <div key={w.id} className="workout-item">
              <span>
                {w.title} — {w.minutes} min
              </span>
              <span className="muted">
                {w.calories} cal | {w.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        © 2025 Unnal Mudiyum — Stay Healthy, Stay Sharp
                <h1></h1>
        Created by SASIRAM V
      </footer>
    </div>
  );
}

export default Fitness;
