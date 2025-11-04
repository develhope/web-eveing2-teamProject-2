import React, { useState } from "react";
import logo from "../assets/Nuvolino.png";
import { Search, Crosshair } from "lucide-react";

export default function Header({ coords, onSearchCity, onGeo }) {
  const [query, setQuery] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearchCity(query.trim());
  };

  return (
    <header className="rounded-3xl px-6 py-4 mb-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-white/30 bg-[rgba(255,255,255,0.18)] backdrop-blur-md
                      max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4
                      text-slate-900">
      {/* logo + titolo */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Nuvolino logo"
          className="w-[100px] h-[100px] object-contain"
        />
        <div className="text-2xl font-semibold text-slate-900 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">
          nuvolino
        </div>
      </div>

      {/* barra ricerca + città + °C */}
      <form
        onSubmit={submit}
        className="flex items-center gap-3 flex-wrap text-[14px]"
      >
        <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.3)] text-slate-800
                        rounded-2xl px-3 py-2 border border-white/50 shadow-inner">
          <Search className="w-4 h-4 opacity-70" />
          <input
            className="bg-transparent outline-none placeholder-slate-700/60 w-[160px]"
            placeholder={coords?.label || "Cerca città..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-[rgba(255,255,255,0.3)] rounded-2xl px-3 py-2 border border-white/50 text-slate-900 font-medium hover:bg-white/40 transition"
        >
          Cerca
        </button>

        <button
          type="button"
          onClick={onGeo}
          className="flex items-center gap-2 bg-[rgba(255,255,255,0.3)] rounded-2xl px-3 py-2 border border-white/50 text-slate-900 font-medium hover:bg-white/40 transition"
          title="Usa la tua posizione"
        >
          <Crosshair className="w-4 h-4" />
          <span>GPS</span>
        </button>

        <div className="bg-[rgba(255,255,255,0.3)] rounded-2xl px-3 py-2 border border-white/50 text-slate-900 font-medium">
          °C
        </div>
      </form>
      {coords?.label && (
  <div className="w-full text-center text-[14px] mt-2 text-slate-800/80">
    Visualizzando dati per <span className="font-semibold">{coords.label}</span>
  </div>
)}

    </header>
  );
}
