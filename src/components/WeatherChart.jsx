import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// stima fittizia dei consumi HVAC basata su temperatura e umidità
function estimateConsumption(tempC, umidità) {
  const comfort = 21;
  const delta = Math.abs(tempC - comfort);
  const humFactor = Math.max(0, umidità - 60) / 10;
  const base = 0.3;
  return Number(base + delta * 0.15 + humFactor * 0.2);
}

export default function WeatherChart({ hourly }) {
  const [mode, setMode] = useState("overview"); // overview | temperatura | umidità | wind | consumi

  const data = useMemo(() => {
    if (!hourly || !hourly.time) return [];
    return hourly.time.slice(0, 24).map((iso, i) => {
      const d = new Date(iso);
      const timeLabel = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

      const temp = hourly.temperature_2m[i];
      const hum = hourly.relative_humidity_2m[i];
      const wind = hourly.wind_speed_10m[i];
      const precip = hourly.precipitation[i];
      const kwh = estimateConsumption(temp, hum);

      return {
        time: timeLabel,
        temp,
        hum,
        wind,
        precip,
        kwh,
      };
    });
  }, [hourly]);

  const lineKey =
    mode === "overview" || mode === "temperature"
      ? "temp"
      : mode === "humidity"
      ? "hum"
      : mode === "wind"
      ? "wind"
      : "kwh";

  const barKey = mode === "overview" ? "precip" : null;

  const lineColor = "#38bdf8";
  const barColor = "rgba(15,23,42,0.6)";

  return (
    <div className="flex flex-col gap-4">
      {/* titolo + tab metriche */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[16px] font-semibold leading-tight">
            {mode === "overview"
              ? "Temperatura & pioggia (prossime ore)"
              : mode === "temperature"
              ? "Andamento temperatura (°C)"
              : mode === "humidity"
              ? "Umidità relativa (%)"
              : mode === "wind"
              ? "Vento (m/s)"
              : "Consumi stimati HVAC (kWh)"}
          </div>
          <div className="text-[12px] opacity-70 leading-tight">
            Scorri per vedere le prossime ore
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-[12px]">
          {[
         { key: "overview", label: "Panoramica" },
         { key: "temperature", label: "Temperatura" },
         { key: "humidity", label: "Umidità" },
         { key: "wind", label: "Vento" },
         { key: "consumption", label: "Consumi" },
         ].map((btn) => (
  <button
    key={btn.key}
    onClick={() => setMode(btn.key)}
    className={`px-3 py-1 rounded-lg border ${
      mode === btn.key
        ? "bg-[rgba(0,0,0,0.7)] text-white border-black/60"
        : "bg-white/30 text-slate-800 border-white/60"
    }`}
  >
    {btn.label.toUpperCase()}
  </button>
))}
        </div>
      </div>

      {/* box grafico */}
      <div className="h-[260px] w-full rounded-2xl border border-white/40 bg-[rgba(255,255,255,0.3)] shadow-inner overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid stroke="rgba(0,0,0,0.1)" strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="rgba(0,0,0,0.6)" />
            <YAxis
              yAxisId="left"
              stroke="rgba(0,0,0,0.6)"
            />
            {barKey && (
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="rgba(0,0,0,0.6)"
              />
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15,23,42,0.9)",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                fontSize: 12,
              }}
            />
            {barKey && (
              <Bar
                yAxisId="right"
                dataKey={barKey}
                fill={barColor}
                radius={[4, 4, 0, 0]}
              />
            )}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey={lineKey}
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
