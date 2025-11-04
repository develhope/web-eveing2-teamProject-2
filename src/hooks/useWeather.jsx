import { useCallback, useEffect, useState } from "react";

// chiamata a Open-Meteo (hourly + daily)
async function fetchWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    timezone: "auto",
    current_weather: "true",
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "wind_speed_10m",
      "precipitation",
      "precipitation_probability",
    ].join(","),
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
      "windspeed_10m_max",
    ].join(","),
  });

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!res.ok) throw new Error("Errore nella richiesta meteo");
  return res.json();
}

export default function useWeather() {
  const [coords, setCoords] = useState({
    lat: 45.4642,
    lon: 9.19,
    label: "Milano (IT)",
  });
  const [meteo, setMeteo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWeather = useCallback(async (lat, lon, label) => {
    try {
      setLoading(true);
      setError(null);
      setCoords((prev) => ({
        lat,
        lon,
        label: label ?? prev.label,
      }));
      const json = await fetchWeather(lat, lon);
      setMeteo(json);
    } catch (e) {
      console.error(e);
      setError(e.message || "Errore caricamento meteo");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByCity = useCallback(
    async (cityName) => {
      try {
        setLoading(true);
        setError(null);

        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            cityName
          )}&count=1&language=it&format=json`
        );
        const geoJson = await geoRes.json();
        if (!geoJson.results || !geoJson.results.length) {
          throw new Error("Città non trovata");
        }

        const c = geoJson.results[0];
        const label = `${c.name}, ${c.country_code}`;
        await loadWeather(c.latitude, c.longitude, label);
      } catch (e) {
        console.error(e);
        setError(e.message || "Errore ricerca città");
      } finally {
        setLoading(false);
      }
    },
    [loadWeather]
  );

 const fetchByCoords = useCallback(
  async (lat, lon, label) => {
    try {
      let cityLabel = label;

      if (!label || label === "Posizione selezionata" || label === "Posizione da mappa") {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&language=it&count=1`
        );
        const geoJson = await geoRes.json();
        if (geoJson.results && geoJson.results.length > 0) {
          const place = geoJson.results[0];
          cityLabel = `${place.name}${place.country_code ? ", " + place.country_code : ""}`;
        } else {
          cityLabel = "Località sconosciuta";
        }
      }

      await loadWeather(lat, lon, cityLabel);
    } catch (e) {
      console.error("Errore nel reverse geocoding:", e);
      await loadWeather(lat, lon, label || "Posizione sconosciuta");
    }
  },
  [loadWeather]
);


  useEffect(() => {
    loadWeather(coords.lat, coords.lon, coords.label);
  }, []);

  return {
    coords,
    meteo,
    loading,
    error,
    fetchByCity,
    fetchByCoords,
  };
}
