// This page is now wrapped in a main with responsive margin in the layout, so no need for extra margin here.
import StatCard from "@/components/admin/StatCard";
import ChartBox from "@/components/admin/ChartBox";
import TopRiskTable from "@/components/admin/TopRiskTable";
import RecentAlerts from "@/components/admin/RecentAlerts";
import { Power, GlobeOff, BellElectric, ScanHeart } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="w-full max-w-full">
      <h1 className="text-2xl font-bold mb-4">Welcome, Phinehas Abdu</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
        <StatCard
          icon={<BellElectric size={20} className="text-primary" />}
          title="Active Alerts"
          value={7}
        />
        <StatCard
          icon={<ScanHeart size={20} className="text-primary" />}
          title="Avg Health Score"
          value={`92%`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <div className="mb-2 text-sm text-primary opacity-90">
            Device status distribution
          </div>
          <ChartBox />
        </div>
        <div>
          <div className="mb-2 text-sm text-primary opacity-90">
            Alerts over time
          </div>
          <ChartBox />
        </div>
        <div>
          <div className="mb-2 text-sm text-primary opacity-90">
            Average telemetry trends
          </div>
          <ChartBox />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <TopRiskTable />
        </div>
        <div className="lg:col-span-1">
          <RecentAlerts />
        </div>
      </div>
    </div>
  );
}
