import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Dashboard.css";
import StudyChart from "../components/StudyChart";

import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, loading } = useAuth();

  // ---------------- STATE ----------------
  const [username, setUsername] = useState("User");
  const [studyHours, setStudyHours] = useState(0);
  const [tasksDone, setTasksDone] = useState(0);
  const [tasksTotal, setTasksTotal] = useState(0);
  const [stepsToday, setStepsToday] = useState(0);
  const [moodToday, setMoodToday] = useState("😊");
  const [upcoming, setUpcoming] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const [weeklyData, setWeeklyData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    studyHours: [0, 0, 0, 0, 0, 0, 0],
    goals: [2, 2, 2, 2, 2, 2, 2],
  });

  // ---------------- LOAD FUNCTIONS (keep as is) ----------------
  const loadProfile = async () => {
    const ref = collection(db, "users");
    const snap = await getDocs(query(ref, where("email", "==", user.email)));
    snap.forEach((doc) => {
      const d = doc.data();
      setUsername(d.name || "User");
    });
  };

  const loadTasks = async () => {
    const ref = collection(db, "tasks");
    const snap = await getDocs(query(ref, where("userId", "==", user.uid)));
    let done = 0;
    let total = 0;
    const upcomingList = [];
    snap.forEach((doc) => {
      const t = doc.data();
      total++;
      if (t.completed) done++;
      if (!t.completed) {
        upcomingList.push({
          id: doc.id,
          title: t.text,
          when: t.date || "Soon",
        });
      }
    });
    setTasksDone(done);
    setTasksTotal(total);
    setUpcoming(upcomingList.slice(0, 4));
  };

  const loadStudy = async () => {
    const ref = collection(db, "studySessions");
    const snap = await getDocs(query(ref, where("userId", "==", user.uid)));
    let totalSecondsToday = 0;
    const mapDaily = {
      Mon: 0, Tue: 0, Wed: 0, Thu: 0,
      Fri: 0, Sat: 0, Sun: 0,
    };
    snap.forEach((doc) => {
      const s = doc.data();
      if (s.date === new Date().toDateString()) {
        totalSecondsToday += s.rawSeconds;
      }
      const day = new Date(s.date).toString().slice(0, 3);
      if (mapDaily[day] !== undefined) {
        mapDaily[day] += s.rawSeconds / 3600;
      }
    });
    setStudyHours((totalSecondsToday / 3600).toFixed(1));
    setWeeklyData({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      studyHours: [
        mapDaily.Mon, mapDaily.Tue, mapDaily.Wed,
        mapDaily.Thu, mapDaily.Fri, mapDaily.Sat, mapDaily.Sun,
      ],
      goals: [2, 2, 2, 2, 2, 2, 2],
    });
  };

  const loadFitness = async () => {
    const today = new Date().toDateString();
    const ref = collection(db, "fitnessDaily");
    const snap = await getDocs(
      query(ref, where("userId", "==", user.uid), where("date", "==", today))
    );
    snap.forEach((doc) => {
      const f = doc.data();
      setStepsToday(f.steps || 0);
      setMoodToday(f.mood || "😊");
    });
  };

  // ---------------- SINGLE useEffect ----------------
  useEffect(() => {
    if (!user) return;
    
    const fetchAll = async () => {
      setPageLoading(true);
      await loadProfile();
      await loadTasks();
      await loadStudy();
      await loadFitness();
      setPageLoading(false);
    };
    
    fetchAll();
  }, [user]);

  // ---------------- LOADING CHECK ----------------
if (loading || pageLoading) {
  return (
    <div className="loader-container">
      <div className="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>Loading Dashboard...</p>
    </div>
  );
}



  // ---------------- UI (keep everything below exactly as is) ----------------
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-wrapper fade-in">
        {/* WELCOME SECTION */}
        <div className="welcome-section slide-up">
          <h1>Hello, {username} 👋</h1>
          <p className="subtext">Here's your personalized daily report.</p>
        </div>

        {/* TOP CARDS */}
        <div className="overview-grid">
          <div className="overview-card pop">
            <h4>📘 Study Hours</h4>
            <h2>{studyHours} hrs</h2>
            <p className="sub">Today</p>
          </div>
          <div className="overview-card pop">
            <h4>📝 Tasks Completed</h4>
            <h2>{tasksDone}/{tasksTotal}</h2>
            <p className="sub">This week</p>
          </div>
          <div className="overview-card pop">
            <h4>🏃 Steps</h4>
            <h2>{stepsToday}</h2>
            <p className="sub">Today</p>
          </div>
          <div className="overview-card pop">
            <h4>😊 Mood</h4>
            <h2>{moodToday}</h2>
            <p className="sub">Right now</p>
          </div>
        </div>

        {/* CHART + UPCOMING */}
        <div className="chart-grid">
          <div className="chart-card fade-in">
            <h3>Weekly Study Progress</h3>
            <StudyChart weeklyData={weeklyData} />
          </div>
          <div className="upcoming-card slide-left">
            <h3>Upcoming Tasks</h3>
            {upcoming.length === 0 && (
              <p className="sub">No upcoming tasks 🎉</p>
            )}
            {upcoming.map((item) => (
              <div key={item.id} className="upcoming-item">
                <div>
                  <h4>{item.title}</h4>
                  <p className="sub">{item.when}</p>
                </div>
                <button className="done-btn">✔</button>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="quick-actions fade-in">
          <a href="/todo" className="quick-btn">➕ Add Task</a>
          <a href="/study" className="quick-btn">⏱ Start Study</a>
          <a href="/fitness" className="quick-btn">🏋 Log Workout</a>
          <a href="/stress" className="quick-btn">💆 Stress Relief</a>
          <a href="/profile" className="quick-btn">👤 Profile</a>
        </div>

        {/* TODAY SCHEDULE */}
        <div className="schedule-card pop">
          <h3>Today's Schedule</h3>
          <h1>...</h1>
        </div>

        <footer className="footer">
          © 2025 Unnal Mudiyum — Dashboard
          <h1></h1>
          Created by <strong>SASIRAM V💙</strong>
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;