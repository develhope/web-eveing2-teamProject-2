export const fmt = {
  temp: (v) => `${Math.round(v)}°C`,
  perc: (v) => `${Math.round(v)}%`,
  wind: (v) => `${Math.round(v)} km/h`,
  press: (v) => `${Math.round(v)} hPa`,
  mm: (v) => `${(v ?? 0).toFixed(1)} mm`,
  uv: (v) => (v != null ? v.toFixed(1) : '-'),
  time: (iso) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  hour: (iso) => new Date(iso).toLocaleTimeString([], { hour: '2-digit' }),
  dayTime: (iso) => new Date(iso).toLocaleString([], { weekday: 'short', hour: '2-digit' }),
}
