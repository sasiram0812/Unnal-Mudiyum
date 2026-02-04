import React, { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import "./AISuggestions.css";

function AISuggestions() {
  // 🔹 TEMP DATA (later replace with Firebase)
  const studyHours = 2;
  const steps = 4500;
  const sleep = 5;
  const mood = "😐";
  const tasksPending = 5;
  const tasksCompleted = 2;

  const motivationalQuotes = [
    "Small progress is still progress.",
    "You are stronger than you think.",
    "Every day is a fresh start.",
    "Do one thing today that your future self will thank you for.",
    "Believe in yourself — you got this!",
    "Success is built daily.",
    "Discipline beats motivation every time.",
  ];

  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((k) => k + 1);

  // 🧠 AI LOGIC (memoized for performance)
  const suggestions = useMemo(() => {
    let list = [];

    // 📘 STUDY
    if (studyHours < 1)
      list.push("Study at least 25 minutes today.");
    else if (studyHours < 2)
      list.push("Good start! Aim for 2 hours.");
    else
      list.push("Great study consistency!");

    // 🏃 FITNESS
    if (steps < 3000)
      list.push("Take a short walk to refresh.");
    else if (steps < 7000)
      list.push("Try reaching 8,000 steps today.");
    else
      list.push("Excellent activity today!");

    // 😴 SLEEP
    if (sleep < 6)
      list.push("Low sleep detected — sleep earlier tonight.");
    else if (sleep < 8)
      list.push("Aim for a full 8-hour sleep.");
    else
      list.push("Great sleep routine!");

    // 📝 TASKS
    if (tasksPending > 5)
      list.push("Too many tasks — prioritize important ones.");
    else if (tasksPending > 2)
      list.push("Finish 1–2 tasks now.");
    else if (tasksPending === 0)
      list.push("Add small goals for tomorrow.");

    // 😊 MOOD
    if (mood === "😡")
      list.push("Try breathing exercise from Stress Relief.");
    else if (mood === "😢")
      list.push("Talk to a friend or take a walk.");
    else if (mood === "😊")
      list.push("Use this positive energy productively.");
    else
      list.push("Stretch for 5 minutes to reset your mood.");

    // 🧠 SMART COMBINATIONS
    if (tasksCompleted === 0 && studyHours === 0)
      list.push("Start small: one task or 15 minutes of study.");

    if (sleep < 5 && mood !== "😊")
      list.push("Low sleep affects mood — take a short nap.");

    if (studyHours > 2 && steps < 3000)
      list.push("Balance study with light movement.");

    // 🌱 HEALTH HABITS
    list.push("Drink 2 glasses of water now.");
    list.push("Avoid phone while studying.");
    list.push("Do a quick stretch every hour.");
    list.push("Plan tomorrow before sleeping.");

    // 💬 MOTIVATION
    list.push(
      motivationalQuotes[
        Math.floor(Math.random() * motivationalQuotes.length)
      ]
    );

    return list;
  }, [refreshKey]); // only changes on refresh

  return (
    <div className="ai-container">
      <Navbar />

      <div className="ai-wrapper fade-in">
        <h1 className="ai-title">🧠 AI Personal Suggestions</h1>
        <p className="ai-subtitle">
          Smart tips based on your daily activity & habits.
        </p>

        <button className="primary-btn refresh-btn" onClick={refresh}>
          🔄 Refresh Suggestions
        </button>

        <div className="suggestion-list slide-up">
          {suggestions.map((s, i) => (
            <div key={`${refreshKey}-${i}`} className="suggestion-card pop">
              {s}
            </div>
          ))}
        </div>
      </div>

      <footer className="ai-footer">
        © 2025 Onal Mudiyum — Smart Productivity Assistant
      </footer>
    </div>
  );
}

export default AISuggestions;
