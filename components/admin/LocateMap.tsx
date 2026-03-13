"use client";

import { useState } from "react";

type Device = {
  id: number;
  name: string;
  left: string; // percent
  top: string; // percent
  status: string;
};

export default function LocateMap({ devices }: { devices: Device[] }) {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="relative w-full h-115 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-[#fffaf6] to-background" />

      <div className="absolute inset-4 rounded-lg overflow-hidden border border-transparent">
        {/* stylized map area */}
        <div className="relative w-full h-full bg-[linear-gradient(180deg,#f6f4ef, #eef2f1)]">
          {devices.map((d) => (
            <button
              key={d.id}
              onMouseEnter={() => setHover(d.id)}
              onMouseLeave={() => setHover(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: d.left, top: d.top }}
              aria-label={d.name}
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md ring-2 ring-white">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C8 2 5 5 5 9c0 6 7 13 7 13s7-7 7-13c0-4-3-7-7-7z"
                    fill="#e11d48"
                  />
                  <circle cx="12" cy="9" r="2.5" fill="#fff" />
                </svg>
              </div>

              {hover === d.id && (
                <div className="absolute left-10 top-0 transform -translate-y-1/2 bg-white p-2 rounded-md text-sm shadow-md">
                  <div className="font-semibold">{d.name}</div>
                  <div className="text-xs text-gray-500">{d.status}</div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
