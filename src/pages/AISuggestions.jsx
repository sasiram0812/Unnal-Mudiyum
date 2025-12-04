import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./AISuggestions.css";

function AISuggestions() {
  // Fake data — later connect to MongoDB or Firebase
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
    "Success is a set of small efforts repeated daily.",
    "Discipline beats motivation every time.",
  ];

  const [refreshKey, setRefreshKey] = useState(0);
  const refresh = () => setRefreshKey(refreshKey + 1);

  // ------------------ AI SUGGESTIONS ENGINE ------------------
  const generateSuggestions = () => {
    let list = [];

    // STUDY SUGGESTIONS ---------------------
    if (studyHours < 1) {
      list.push("Try studying for at least 1 hour today — start with 25 minutes.");
    } else if (studyHours < 2) {
      list.push("Good start! Try reaching 2 hours today for strong progress.");
    } else {
      list.push("Great consistency! Maintain your study rhythm.");
    }

    // FITNESS SUGGESTIONS -------------------
    if (steps < 3000) {
      list.push("Take a 10-minute walk to refresh your mind.");
    } else if (steps < 7000) {
      list.push("You’re doing well! Try reaching 8,000 steps today.");
    } else {
      list.push("Amazing! You reached your step goal today.");
    }

    // SLEEP SUGGESTIONS ---------------------
    if (sleep < 6) {
      list.push("You slept less than 6 hours — try sleeping early today.");
    } else if (sleep < 8) {
      list.push("Good! Aim for a full 8-hour sleep tonight.");
    } else {
      list.push("Great sleep! Keep a consistent sleep schedule.");
    }

    // TASK SUGGESTIONS ----------------------
    if (tasksPending > 5) {
      list.push("Too many pending tasks — sort them by priority.");
    } else if (tasksPending > 2) {
      list.push("Finish 1–2 tasks right now to reduce stress.");
    } else if (tasksPending === 0) {
      list.push("Great! Add at least 3 small goals for today.");
    }

    // MOOD BASED ----------------------------
    if (mood === "😡") {
      list.push("You seem stressed — try the Breathing Exercise in Stress Relief Page.");
    } else if (mood === "😢") {
      list.push("Take a short walk or talk to a friend — it might help.");
    } else if (mood === "😊") {
      list.push("Great energy! Use this mood to finish important tasks.");
    } else {
      list.push("You're neutral — take 5 minutes to stretch your body.");
    }

    // ADVANCED ANALYSIS ---------------------
    if (tasksCompleted === 0 && studyHours === 0) {
      list.push("Start small: one task or 15 minutes of study.");
    }

    if (sleep < 5 && mood !== "😊") {
      list.push("Low sleep affects mood — schedule a power nap today.");
    }

    if (studyHours > 2 && steps < 3000) {
      list.push("You studied well — now move your body a bit.");
    }

    if (steps > 7000 && studyHours === 0) {
      list.push("Good activity! Balance your day with some study time.");
    }

    if (sleep > 8 && studyHours < 1) {
      list.push("Well rested! Try focusing on studies next.");
    }

    if (tasksPending > 5 && mood === "😡") {
      list.push("High tasks & low mood — break tasks into small chunks.");
    }

    // Extra Realistic AI Checks --------------------
    list.push("Drink 2–3 glasses of water now.");
    list.push("Avoid mobile phone while studying.");
    list.push("Do a 2-minute stretch every hour.");
    list.push("Review your tasks at night and plan ahead.");
    list.push("Focus on ONE important task instead of many.");
    list.push("Avoid studying late night after 12AM.");
    list.push("Track your progress daily to stay motivated.");

    // Random quote
    list.push(
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
    );

    return list;
  };

  const suggestions = generateSuggestions();

  return (
    <div className="ai-container">
      <Navbar />

      <div className="ai-wrapper fade-in">
        <h1 className="ai-title">🧠 AI Personal Suggestions</h1>
        <p className="ai-subtitle">
          Personalized tips generated based on your study, tasks, sleep, fitness & mood.
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
        © 2025 Onal Mudiyum — Your Smart AI Helper
      </footer>
    </div>
  );
}

export default AISuggestions;
