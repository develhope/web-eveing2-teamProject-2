import React, { useRef } from "react";

export default function DailyStrip({ daily }) {
  if (!daily || !daily.time || !daily.time.length) return null;

  const containerRef = useRef(null);

  const items = daily.time.map((iso, i) => {
    const date = new Date(iso);
    const weekday = date.toLocaleDateString("it-IT", { weekday: "short" });
    const label = date.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
    });

    return {
      dateLabel: label,
      weekday,
      tMax: Math.round(daily.temperature_2m_max[i]),
      tMin: Math.round(daily.temperature_2m_min[i]),
      precip: daily.precipitation_sum?.[i] ?? 0,
      windMax: Math.round(daily.windspeed_10m_max?.[i] ?? 0),
    };
  });

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
          <div className="text-[16px] font-semibold leading-tight">
            Prossimi giorni
          </div>
          <div className="text-[12px] opacity-70 leading-tight">
            Max / Min • Pioggia • Vento
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
        {items.map((d, i) => (
          <div
            key={i}
            className="min-w-[110px] rounded-2xl bg-[rgba(255,255,255,0.4)] border border-white/50 shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                       px-3 py-3 text-[13px] text-slate-800 flex flex-col items-center"
          >
            <div className="uppercase text-[11px] opacity-70">{d.weekday}</div>
            <div className="text-[12px]">{d.dateLabel}</div>
            <div className="mt-1 text-[18px] font-semibold">
              {d.tMax}° / {d.tMin}°
            </div>
            <div className="mt-1 text-[12px]">
              🌧 {d.precip.toFixed(1)} mm
            </div>
            <div className="text-[12px]">
              💨 {d.windMax} km/h
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}