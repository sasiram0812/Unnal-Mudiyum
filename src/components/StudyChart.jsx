// src/components/StudyChart.jsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  TimeScale
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export default function StudyChart({ weeklyData }) {
  // weeklyData: { labels: [...], studyHours: [...], goals: [...] } — default fallback below
  const data = {
    labels: weeklyData?.labels ?? ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [
      {
        type: "bar",
        label: "Study Hours",
        data: weeklyData?.studyHours ?? [2, 3, 1.5, 4, 3.5, 2.5, 0],
        backgroundColor: "rgba(37,99,235,0.85)",
        borderRadius: 6,
      },
      {
        type: "line",
        label: "Goal (hrs)",
        data: weeklyData?.goals ?? [3,3,3,3,3,3,3],
        borderColor: "rgba(16,185,129,0.95)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 3,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Weekly Study Overview" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      }
    }
  };

  return <div style={{ width: "100%", minHeight: 280 }}><Bar data={data} options={options} /></div>;
}
