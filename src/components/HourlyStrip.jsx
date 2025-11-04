import React, { useRef } from "react";

export default function HourlyStrip({ hourly }) {
  if (!hourly || !hourly.time || !hourly.time.length) return null;

  const containerRef = useRef(null);

  const items = hourly.time.map((iso, i) => {
    const date = new Date(iso);
    const label = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    return {
      time: label,
      temp: Math.round(hourly.temperature_2m[i]),
      precipProb: hourly.precipitation_probability?.[i] ?? 0,
      wind: Math.round(hourly.wind_speed_10m[i]),
    };
  });

  // prendiamo solo le prossime 24 ore
  const cards = items.slice(0, 24);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[16px] font-semibold leading-tight">Oggi — Orario</div>
          <div className="text-[12px] opacity-70 leading-tight">
            Previsioni per le prossime ore
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollLeft}
            className="w-8 h-8 rounded-full bg-white/40 border border-white/60 text-slate-800 text-sm hover:bg-white"
          >
            ◀
          </button>
          <button
            type="button"
            onClick={scrollRight}
            className="w-8 h-8 rounded-full bg-white/40 border border-white/60 text-slate-800 text-sm hover:bg-white"
          >
            ▶
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-1"
      >
        {cards.map((c, i) => (
          <div
            key={i}
            className="min-w-[90px] rounded-2xl bg-[rgba(255,255,255,0.4)] border border-white/50 shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                       px-3 py-3 text-[13px] text-slate-800 flex flex-col items-center"
          >
            <div className="opacity-70">{c.time}</div>
            <div className="text-[22px] font-semibold leading-tight">
              {c.temp}°C
            </div>
            <div className="mt-1 text-[12px]">
              🌧 {c.precipProb}%
            </div>
            <div className="text-[12px]">
              💨 {c.wind} m/s
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
