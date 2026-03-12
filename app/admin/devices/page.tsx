import StatCard from "@/components/admin/StatCard";
import DevicesTable from "@/components/admin/DevicesTable";
import DevicesActions from "@/components/admin/DevicesActions";
import { Power, GlobeOff } from "lucide-react";

export default function DevicesPage() {
  return (
    <div className="w-full max-w-full">
      <h1 className="text-2xl font-bold mb-4">Devices</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <StatCard
          icon={<Power size={20} className="text-primary" />}
          title="Devices Online"
          value={124}
        />
        <StatCard
          icon={<GlobeOff size={20} className="text-primary" />}
          title="Devices Offline"
          value={3}
        />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-4">
        <input
          placeholder="Search Devices..."
          className="flex-1 min-w-50 max-w-full md:max-w-lg p-2 rounded-full bg-accent border-none shadow-inner"
        />

        <div className="ml-auto">
          <DevicesActions />
        </div>
      </div>

      <div>
        <DevicesTable />
      </div>
    </div>
  );
}
