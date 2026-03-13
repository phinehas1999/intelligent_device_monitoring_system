"use client";
import StatCard from "@/components/admin/StatCard";
import ChartBox from "@/components/admin/ChartBox";
import RecentAlerts from "@/components/admin/RecentAlerts";
import { Power, Cpu, Wifi, Thermometer, Activity, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock device data (replace with real data fetching as needed)
const device = {
  id: "000001",
  name: "Motor-1",
  health: 89,
  status: "Healthy",
  firmware: "1.0",
  lastSeen: "3s ago",
  ip: "192.125.3.1",
  type: "ESP32",
  alerts: [
    "12:03 AM: Temperature spike detected",
    "10:21 AM: Vibration anomaly detected",
    "3:00 AM: Temperature spike detected",
    "8:21 AM: Vibration anomaly detected",
  ],
};

export default function DeviceDetailPage() {
  const router = useRouter();
  return (
    <div className="w-full max-w-full">
      <div className="flex items-center gap-2 mb-4">
        <button
          className="text-lg text-primary cursor-pointer"
          onClick={() => router.push("/admin/devices")}
        >
          &larr;
        </button>
        <h1 className="text-2xl font-bold">{device.name} Info</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Device Info */}
        <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5 flex-1 min-w-55">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold flex items-center gap-2 text-lg text-gray-900">
              <Power size={20} className="text-green-600" /> Device Info
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
              {device.status}
            </span>
          </div>
          <div className="bg-gray-50 rounded-lg overflow-hidden text-sm border border-gray-100">
            <div className="px-4 py-3 border-b border-gray-100 text-gray-700">
              Name:{" "}
              <span className="font-medium text-gray-900">{device.name}</span>
            </div>
            <div className="px-4 py-3 border-b border-gray-100 text-gray-700">
              ID: <span className="font-medium text-gray-900">{device.id}</span>
            </div>
            <div className="px-4 py-3 border-b border-gray-100">
              <a
                href="/admin/locate_device"
                className="text-blue-600 hover:text-blue-700 hover:underline font-medium text-xs flex items-center gap-1"
              >
                Locate Device &rarr;
              </a>
            </div>
            <div className="px-4 py-3 text-gray-700">
              Health Score:{" "}
              <span className="font-medium text-gray-900">
                {device.health}%
              </span>
            </div>
          </div>
        </div>
        {/* System/Connectivity Info */}
        <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5 flex-1 min-w-55">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold flex items-center gap-2 text-lg text-gray-900">
              <Cpu size={20} className="text-blue-600" /> System / Connectivity
            </span>
          </div>
          <div className="bg-gray-50 rounded-lg overflow-hidden text-sm border border-gray-100">
            <div className="px-4 py-3 border-b border-gray-100 text-gray-700">
              Firmware Version:{" "}
              <span className="font-medium text-gray-900">
                {device.firmware}
              </span>
            </div>
            <div className="px-4 py-3 border-b border-gray-100 text-gray-700">
              Last Seen:{" "}
              <span className="font-medium text-gray-900">
                {device.lastSeen}
              </span>
            </div>
            <div className="px-4 py-3 border-b border-gray-100 text-gray-700">
              IP Address:{" "}
              <span className="font-medium text-gray-900">{device.ip}</span>
            </div>
            <div className="px-4 py-3 text-gray-700">
              Device Type:{" "}
              <span className="font-medium text-gray-900">{device.type}</span>
            </div>
          </div>
        </div>
        {/* Alert History */}
        <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-5 flex-1 min-w-55">
          <div className="font-semibold flex items-center gap-2 text-lg mb-4 text-gray-900">
            <Wifi size={20} className="text-yellow-600" /> Alert History
          </div>
          <div className="bg-gray-50 rounded-lg overflow-y-auto text-sm border border-gray-100 max-h-48">
            <ul className="divide-y divide-gray-100">
              {device.alerts.map((alert, idx) => (
                <li
                  key={idx}
                  className="px-4 py-3 text-xs text-gray-700 hover:bg-white transition-colors"
                >
                  {alert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <div className="mb-2 font-semibold">Device Temperature</div>
          <ChartBox>
            {/* Replace with chart */}
            <div className="flex items-center justify-center h-full text-gray-400">
              --
            </div>
          </ChartBox>
        </div>
        <div>
          <div className="mb-2 font-semibold">Vibration</div>
          <ChartBox>
            <div className="flex items-center justify-center h-full text-gray-400">
              --
            </div>
          </ChartBox>
        </div>
        <div>
          <div className="mb-2 font-semibold">Power usage</div>
          <ChartBox>
            <div className="flex items-center justify-center h-full text-gray-400">
              --
            </div>
          </ChartBox>
        </div>
      </div>
    </div>
  );
}
