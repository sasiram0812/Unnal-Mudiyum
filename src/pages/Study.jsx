import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Study.css";
import StudyChart from "../components/StudyChart";

import Loader from "../components/Loader";


import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  where,
  setDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";

function Study() {
  // ---------------------- STATES ----------------------
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [sessions, setSessions] = useState([]);
  const [notes, setNotes] = useState("");

  const [studyHours, setStudyHours] = useState(0);
  

  const dailyGoal = 7200;
  const user = auth.currentUser;

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    // if you have any function like loadStudyData() use it
      await new Promise(r => setTimeout(r, 300));
    setLoading(false);  
  };

  fetchData();
}, []);


  // ---------------------- TIMER LOGIC ----------------------
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // ---------------------- LOAD SUBJECTS ----------------------
  useEffect(() => {
     if (!user) return;

    const q = query(
      collection(db, "subjects"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setSubjects(list);

      if (list.length > 0 && !selectedSubject) {
        setSelectedSubject(list[0].name);
      }
    });

    return () => unsubscribe();
  }, [user]);

  // ---------------------- LOAD SESSIONS ----------------------
  useEffect(() => {
     if (!user) return;

    const q = query(
      collection(db, "studySessions"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setSessions(list.reverse());
    });

    return () => unsubscribe();
  }, [user]);

  // ---------------------- LOAD NOTES ----------------------
  useEffect(() => {
     if (!user) return;

    const ref = doc(db, "studyNotes", user.uid);

    getDoc(ref).then((snap) => {
      if (snap.exists()) setNotes(snap.data().text);
    });
  }, [user]);

  // ---------------------- ADD SUBJECT ----------------------
  const addSubject = async () => {
    if (!newSubject.trim()) return alert("Subject name cannot be empty");

    await addDoc(collection(db, "subjects"), {
      userId: user.uid,
      name: newSubject,
    });

    setNewSubject("");
  };

  // ---------------------- DELETE SUBJECT ----------------------
  const deleteSubject = async (name) => {
    const subjectToDelete = subjects.find((s) => s.name === name);
    if (!subjectToDelete) return;

    await deleteDoc(doc(db, "subjects", subjectToDelete.id));

    if (selectedSubject === name && subjects.length > 1) {
      setSelectedSubject(subjects[0].name);
    }
  };

  // ---------------------- SAVE STUDY SESSION ----------------------
  const saveSession = async () => {
    if (timer === 0) return;

    await addDoc(collection(db, "studySessions"), {
      userId: user.uid,
      subject: selectedSubject,
      rawSeconds: timer,
      duration: formatTime(timer),
      date: new Date().toDateString(),
    });

    setTimer(0);
    setIsRunning(false);
  };

  // ---------------------- SAVE NOTES ----------------------
  const saveNotes = async () => {
    await setDoc(doc(db, "studyNotes", user.uid), {
      text: notes,
    });

    alert("Notes saved!");
  };

  // ---------------------- CALCULATE DAILY SUMMARY ----------------------
  const today = new Date().toDateString();
  const todaySecs = sessions
    .filter((s) => s.date === today)
    .reduce((a, b) => a + b.rawSeconds, 0);

  const todayFormatted = formatTime(todaySecs);
  const goalProgress = Math.min((todaySecs / dailyGoal) * 100, 100);

  const [weeklyData, setWeeklyData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    studyHours: [0, 0, 0, 0, 0, 0, 0],
    goals: [2, 2, 2, 2, 2, 2, 2], // 2 hrs every day
  });

  // ---------------- LOAD STUDY SESSIONS ----------------
    const loadStudy = async () => {
      const ref = collection(db, "studySessions");
      const snap = await getDocs(query(ref, where("userId", "==", user.uid)));
  
      let totalSecondsToday = 0;
  
      // weekly array
      const mapDaily = {
        Mon: 0, Tue: 0, Wed: 0, Thu: 0,
        Fri: 0, Sat: 0, Sun: 0,
      };
  
      snap.forEach((doc) => {
        const s = doc.data();
  
        // today
        if (s.date === new Date().toDateString()) {
          totalSecondsToday += s.rawSeconds;
        }
  
        // weekly
        const day = new Date(s.date).toString().slice(0, 3);
        if (mapDaily[day] !== undefined) {
          mapDaily[day] += s.rawSeconds / 3600; // convert to hours
        }
      });
  
      setStudyHours((totalSecondsToday / 3600).toFixed(1));
  
      setWeeklyData({
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        studyHours: [
          mapDaily.Mon,
          mapDaily.Tue,
          mapDaily.Wed,
          mapDaily.Thu,
          mapDaily.Fri,
          mapDaily.Sat,
          mapDaily.Sun,
        ],
        goals: [2, 2, 2, 2, 2, 2, 2],
      });
    };

  
    if (!user || loading) {
  return <Loader />;
}


<h1 style={{ color: "red" }}>Dashboard Loaded</h1>

  return (
    <div className="study-container">
      <Navbar />

      <div className="study-layout fade-in">

        {/* SIDEBAR */}
        <aside className="study-sidebar slide-left">
          <h2 className="side-title">Subjects</h2>

          <div className="add-subject-box">
            <input
              type="text"
              placeholder="New subject..."
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
            />
            <button onClick={addSubject}>Add</button>
          </div>

          {subjects.map((s) => (
            <div className="subject-row" key={s.id}>
              <button
                className={`subject-btn ${
                  selectedSubject === s.name ? "active" : ""
                }`}
                onClick={() => setSelectedSubject(s.name)}
              >
                {s.name}
              </button>

              <button
                className="delete-subject"
                onClick={() => deleteSubject(s.name)}
              >
                ✖
              </button>
            </div>
          ))}

          {/* Daily Goal Bar */}
          <div className="goal-section">
            <h3>Daily Goal</h3>
            <p>2 hours</p>
            <div className="goal-bar">
              <div
                className="goal-progress"
                style={{ width: `${goalProgress}%` }}
              ></div>
            </div>
            <p className="progress-text">{goalProgress.toFixed(0)}%</p>
          </div>
        </aside>

        {/* MAIN AREA */}
        <main className="study-main">

          <div className="card timer-card pop">
            <h2>{selectedSubject} Timer</h2>

            <h1 className="timer-display">{formatTime(timer)}</h1>

            <div className="timer-buttons">
              {!isRunning ? (
                <button className="primary-btn" onClick={() => setIsRunning(true)}>
                  Start
                </button>
              ) : (
                <button className="secondary-btn" onClick={() => setIsRunning(false)}>
                  Pause
                </button>
              )}

              <button className="secondary-btn" onClick={() => setTimer(0)}>
                Reset
              </button>

              <button className="primary-btn" onClick={saveSession}>
                Save Session
              </button>
            </div>
          </div>

          <div className="card today-card slide-up">
            <h2>Today's Study</h2>
            <h1>{todayFormatted}</h1>
          </div>

          <div className="chart-card fade-in">
            <h3>Weekly Study Progress</h3>
            <StudyChart weeklyData={weeklyData} />
          </div>

          <div className="card notes-card pop">
            <h2>Study Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write notes here..."
            ></textarea>
            <button className="primary-btn save-notes" onClick={saveNotes}>
              Save Notes
            </button>
          </div>

          <div className="card session-card slide-up">
            <h2>Study Sessions</h2>

            {sessions.length === 0 ? (
              <p className="muted">No sessions saved.</p>
            ) : (
              sessions.map((s) => (
                <div key={s.id} className="session-item">
                  <span>{s.subject}</span>
                  <span>{s.duration}</span>
                  <span className="muted">{s.date}</span>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      <footer className="study-footer">
        © 2025 Unnal Mudiyum — Study Better Every Day
                <h1></h1>
        Created by SASIRAM V
      </footer>
    </div>
  );
}

export default Study;
