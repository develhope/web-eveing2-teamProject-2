import React from "react";
import { Thermometer, Wind, Droplets, ActivitySquare, Home } from "lucide-react";

export default function Sidebar({ selected, onSelect, theme }) {
  const buttons = [
    { key: "overview", label: "Panoramica", icon: <Home size={18} /> },
    { key: "temperature", label: "Temperatura", icon: <Thermometer size={18} /> },
    { key: "humidity", label: "Umidità", icon: <Droplets size={18} /> },
    { key: "wind", label: "Vento", icon: <Wind size={18} /> },
    { key: "consumption", label: "Consumi", icon: <ActivitySquare size={18} /> },
  ];

  return (
    <aside
      className={`flex flex-col gap-3 p-4 rounded-3xl backdrop-blur-md shadow-lg transition-all ${
        theme === "day" ? "bg-white/25" : "bg-slate-800/40"
      }`}
    >
      {buttons.map((b) => (
        <button
          key={b.key}
          onClick={() => onSelect(b.key)}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium transition-all ${
            selected === b.key
              ? theme === "day"
                ? "bg-sky-500/60 text-white"
                : "bg-sky-400/30 text-sky-200"
              : "hover:bg-white/20 text-sm"
          }`}
        >
          {b.icon} {b.label}
        </button>
      ))}
    </aside>
  );
}
