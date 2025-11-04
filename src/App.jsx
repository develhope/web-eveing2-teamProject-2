import React, { useEffect, useState } from "react";
import "./index.css";
import useWeather from "./hooks/useWeather";

import Header from "./components/Header";
import HourlyStrip from "./components/HourlyStrip";
import DailyStrip from "./components/DailyStrip";
import WeatherChart from "./components/WeatherChart";
import RadarMap from "./components/RadarMap";

export default function App() {
  const [theme] = useState("day"); // per ora solo giorno stile screenshot

  const { coords, meteo, loading, error, fetchByCity, fetchByCoords } =
    useWeather();

  useEffect(() => {
    document.documentElement.classList.remove("day", "night");
    document.documentElement.classList.add("day");
  }, []);

  const hourly = meteo?.hourly;
  const daily = meteo?.daily;

  const handleGeo = () => {
    if (!navigator.geolocation) {
      alert("Geolocalizzazione non supportata dal browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchByCoords(
          pos.coords.latitude,
          pos.coords.longitude,
          "La tua posizione"
        );
      },
      () => {
        alert("Permesso posizione negato");
      }
    );
  };

const handleMapClick = async (lat, lon) => {
  try {
    console.log("Click sulla mappa:", lat, lon);

    const res = await fetch(
      `/api/reverse?latitude=${lat}&longitude=${lon}&language=it&count=1`
    );

    if (!res.ok) throw new Error("Errore nella richiesta al proxy");
    const data = await res.json();
    console.log("Risposta reverse:", data);

    let label = "Località sconosciuta";

    if (data && data.results && data.results.length > 0) {
      const place = data.results[0];
      const city = place.name || place.admin1 || "Sconosciuta";
      const country = place.country_code || "";
      label = `${city}${country ? ", " + country : ""}`;
    }

    console.log("Città trovata:", label);

    await fetchByCoords(lat, lon, label);
  } catch (err) {
    console.error("Errore nel reverse geocoding:", err);
    await fetchByCoords(lat, lon, "Posizione sconosciuta");
  }
};



  return (
    <div className="min-h-screen bg-day text-slate-900 pb-16">
      <Header coords={coords} onSearchCity={fetchByCity} onGeo={handleGeo} />

      <main className="max-w-7xl mx-auto px-6 flex flex-col gap-6">
        {loading && (
          <div className="text-center text-white/90 py-10">
            Caricamento dati meteo…
          </div>
        )}

        {error && (
          <div className="text-center text-red-200 bg-red-900/60 rounded-xl p-4">
            Errore: {error}
          </div>
        )}

        {!loading && !error && hourly && daily && (
          <>
            {/* pannello centrale: fasce + grafico */}
            <section className="rounded-3xl border border-white/30 bg-[rgba(255,255,255,0.18)] backdrop-blur-md shadow-[0_40px_100px_rgba(0,0,0,0.5)]
                                p-6 flex flex-col gap-6">
              <HourlyStrip hourly={hourly} />
              <DailyStrip daily={daily} />
              <WeatherChart hourly={hourly} />
            </section>

            {/* radar + info attuali */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RadarMap coords={coords} onMapClick={handleMapClick} />

              <div className="rounded-3xl border border-white/30 bg-[rgba(255,255,255,0.18)] backdrop-blur-md shadow-[0_30px_80px_rgba(0,0,0,0.4)]
                              p-4 text-slate-900 flex flex-col gap-2">
                <div className="text-[16px] font-semibold mb-1">Adesso</div>
                <div className="text-[32px] font-bold leading-none">
                  {Math.round(meteo?.current_weather?.temperature ?? 0)}°C
                </div>
                <div className="text-[13px] opacity-80 leading-tight">
                  Vento {meteo?.current_weather?.windspeed ?? "-"} km/h
                </div>
                <div className="text-[13px] opacity-80 leading-tight">
                  Direzione {meteo?.current_weather?.winddirection ?? "-"}°
                </div>
                <div className="text-[13px] opacity-80 leading-tight">
                  Ultimo aggiornamento:{" "}
                  {meteo?.current_weather?.time
                    ? new Date(meteo.current_weather.time).toLocaleString()
                    : "-"}
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
