import React, { useState } from "react";
import Sidebar from "./Sidebar";
import WeatherChart from "./WeatherChart";
import useWeather from "../hooks/useWeather";

export default function Dashboard({ theme }) {
  const [selected, setSelected] = useState("overview");
  const { data, loading, error, coords } = useWeather();

  if (loading) return <p className="text-center mt-10">Caricamento dati meteo...</p>;
  if (error) return <p className="text-center text-red-400">{error}</p>;
 <RadarMap
  coords={coords}
  onMapClick={(lat, lon) => {
    setCoords({ lat, lon });
    fetchWeatherForCoords(lat, lon);
  }}
/>
  return (
    <div className="flex gap-6">
      <Sidebar selected={selected} onSelect={setSelected} theme={theme} />
      <div className="flex-1">
        <WeatherChart data={data} mode={selected} theme={theme} />
      </div>
    </div>
  );
}