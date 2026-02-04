import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StudyChart({ weeklyData }) {
  const data = {
    labels: weeklyData?.labels ?? ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [
      {
        label: "Study Hours",
        data: weeklyData?.studyHours ?? [0,0,0,0,0,0,0],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        tension: 0.4,
      },
      {
        label: "Goal (hrs)",
        data: weeklyData?.goals ?? [2,2,2,2,2,2,2],
        borderColor: "#10b981",
        borderDash: [5,5],
        tension: 0.4,
      },
    ],
  };

  return <Line data={data} />;
}
