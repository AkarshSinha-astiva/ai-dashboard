import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function VisibilityChart() {
  const data = {
    labels: ["9 Jul", "10 Jul", "11 Jul", "12 Jul", "13 Jul", "14 Jul", "15 Jul", "16 Jul"],
    datasets: [
      {
        label: "Honda",
        data: [72, 68, 70, 69, 71, 73, 72, 72],
        borderColor: "#1d4ed8",
        fill: false
      },
      {
        label: "Bajaj",
        data: [45, 46, 47, 46, 45, 47, 48, 47],
        borderColor: "#0f766e",
        fill: false
      },
      {
        label: "Classic 350",
        data: [43, 45, 44, 43, 44, 46, 47, 47],
        borderColor: "#f97316",
        fill: false
      }
    ]
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow border">
      <div className="text-xl font-semibold mb-4">Visibility</div>
      <Line data={data} />
    </div>
  );
}
