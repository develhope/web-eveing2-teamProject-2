const BASE = 'https://api.open-meteo.com/v1/forecast'
const GEO = 'https://geocoding-api.open-meteo.com/v1/search'

export async function geocodeCity(city) {
  const r = await fetch(`${GEO}?name=${encodeURIComponent(city)}&count=1&language=it&format=json`)
  const j = await r.json()
  if (!j.results || !j.results.length) throw new Error('Località non trovata')
  const { latitude, longitude, timezone, name, country } = j.results[0]
  return { lat: latitude, lon: longitude, timezone, label: `${name}, ${country}` }
}

export async function getWeather({ lat, lon, timezone }) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation',
      'cloud_cover',
      'pressure_msl',
      'wind_speed_10m',
      'wind_gusts_10m',
      'uv_index',
      'shortwave_radiation',
    ].join(','),
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'uv_index_max',
      'precipitation_sum',
    ].join(','),
    current: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'is_day',
      'precipitation',
      'cloud_cover',
      'pressure_msl',
      'wind_speed_10m',
      'wind_gusts_10m',
      'uv_index',
    ].join(','),
    timezone: timezone || 'auto',
  })
  const r = await fetch(`${BASE}?${params.toString()}`)
  if (!r.ok) throw new Error('Errore meteo')
  return r.json()
}
