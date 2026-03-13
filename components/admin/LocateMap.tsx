"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Device = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: "online" | "offline";
};

const devices: Device[] = [
  { id: 1, name: "Device A", lat: 9.033, lng: 38.749, status: "online" },
  { id: 2, name: "Device B", lat: 9.041, lng: 38.721, status: "offline" },
  { id: 3, name: "Device C", lat: 9.028, lng: 38.73, status: "online" },
];

export default function LocateMap() {
  return (
    <div className="w-full">
      <MapContainer
        center={[9.033, 38.74]}
        zoom={13}
        scrollWheelZoom={true}
        dragging={true}
        doubleClickZoom={true}
        style={{ height: "420px", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {devices.map((d) => (
          <CircleMarker
            key={d.id}
            center={[d.lat, d.lng]}
            radius={16}
            weight={4}
            pathOptions={{
              color: d.status === "online" ? "#16a34a" : "#dc2626",
              fillColor: d.status === "online" ? "#16a34a" : "#dc2626",
              fillOpacity: 0.85,
            }}
          >
            <Popup>
              <div className="text-base font-semibold">
                {d.name}
                <div className="text-xs text-gray-600 font-normal">
                  {d.status}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
