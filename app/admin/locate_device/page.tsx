import ChartBox from "@/components/admin/ChartBox";
import LocateMapClient from "@/components/admin/LocateMapClient";

import StatCard from "@/components/admin/StatCard";
import { Power, GlobeOff } from "lucide-react";

// Placeholder icons for stat cards
const PlaceholderIcon = () => (
  <div className="w-7 h-7 bg-gray-300 rounded-full" />
);

export default function LocateDevicePage() {
  return (
    <div className="w-full max-w-full">
      <h1 className="text-2xl font-bold mb-4">Locate Devices</h1>

      {/* Stat cards row - responsive full width */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <StatCard
          icon={<Power size={20} className="text-green-600" />}
          title="Devices Online"
          value={124}
        />
        <StatCard
          icon={<GlobeOff size={20} className="text-red-600" />}
          title="Devices Offline"
          value={3}
        />
      </div>

      {/* Search bar */}
      <div className="mb-4">
        <input
          placeholder="Search Devices..."
          className="w-full max-w-xs p-2.5 rounded-xl bg-white border border-gray-200 shadow-sm placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Map area */}
      <div className="rounded-xl overflow-hidden shadow-sm bg-white border border-gray-100">
        <LocateMapClient />
      </div>
    </div>
  );
}
