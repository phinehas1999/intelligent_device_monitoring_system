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
        <div className="rounded-xl bg-[#f3ebdb] shadow-md p-4 flex-1 min-w-55">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold flex items-center gap-2 text-lg">
              <Power size={20} className="text-green-600" /> Device Info
            </span>
            <span className="text-xs text-green-700 font-semibold">
              {device.status}
            </span>
          </div>
          <div className="bg-white rounded-md overflow-hidden text-sm border mt-2">
            <div className="px-4 py-2 border-b">Name: {device.name}</div>
            <div className="px-4 py-2 border-b">id: {device.id}</div>
            <div className="px-4 py-2 border-b">
              <a
                href="/admin/locate_device"
                className="text-blue-600 hover:underline text-xs"
              >
                Locate Device &rarr;
              </a>
            </div>
            <div className="px-4 py-2">Health Score: {device.health}%</div>
          </div>
        </div>
        {/* System/Connectivity Info */}
        <div className="rounded-xl bg-[#f3ebdb] shadow-md p-4 flex-1 min-w-55">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold flex items-center gap-2 text-lg">
              <Cpu size={20} className="text-blue-600" /> System / Connectivity
              Info
            </span>
          </div>
          <div className="bg-white rounded-md overflow-hidden text-sm border mt-2">
            <div className="px-4 py-2 border-b">
              Firmware Version: {device.firmware}
            </div>
            <div className="px-4 py-2 border-b">
              Last Seen: {device.lastSeen}
            </div>
            <div className="px-4 py-2 border-b">IP Address: {device.ip}</div>
            <div className="px-4 py-2">Device Type: {device.type}</div>
          </div>
        </div>
        {/* Alert History */}
        <div className="rounded-xl bg-[#f3ebdb] shadow-md p-4 flex-1 min-w-55">
          <div className="font-semibold flex items-center gap-2 text-lg mb-2">
            <Wifi size={20} className="text-yellow-600" /> Alert History
          </div>
          <div className="bg-white rounded-md overflow-hidden text-sm border mt-2 max-h-40">
            <ul>
              {device.alerts.map((alert, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 border-b last:border-b-0 text-xs"
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
