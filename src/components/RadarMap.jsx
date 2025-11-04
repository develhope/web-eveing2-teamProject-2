import React from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onMapClick(lat, lng);
    },
  });
  return null;
}

export default function RadarMap({ coords, onMapClick }) {
  if (!coords?.lat || !coords?.lon) return null;

  return (
    <div className="rounded-3xl border border-white/30 bg-[rgba(255,255,255,0.18)] backdrop-blur-md shadow-[0_30px_80px_rgba(0,0,0,0.4)]
                    p-4 text-slate-900">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-[16px]">Radar precipitazioni</div>
        <div className="text-[11px] opacity-70">
          Clicca sulla mappa per cambiare zona
        </div>
      </div>
      <div className="h-[260px] overflow-hidden rounded-2xl border border-white/40 shadow-inner">
        <MapContainer
          center={[coords.lat, coords.lon]}
          zoom={7}
          style={{ width: "100%", height: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* layer radar pioggia (RainViewer) */}
          <TileLayer
            attribution="&copy; RainViewer"
            url="https://tilecache.rainviewer.com/v2/radar/{z}/{x}/{y}/1/1_1.png"
            opacity={0.5}
          />
          <MapClickHandler onMapClick={onMapClick} />
        </MapContainer>
      </div>
    </div>
  );
}
