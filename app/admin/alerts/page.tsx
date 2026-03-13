import StatCard from "@/components/admin/StatCard";
import DevicesActions from "@/components/admin/DevicesActions";
import { GlobeOff, BellElectric } from "lucide-react";

// Mock alert data
const alerts = [
  {
    time: "10:21",
    device: "Pump-02",
    alert: "Temperature Spike",
    severity: "High",
    status: "Open",
  },
  {
    time: "09:10",
    device: "Motor-01",
    alert: "Vibration Anomaly",
    severity: "Medium",
    status: "Open",
  },
  {
    time: "08:45",
    device: "Fan-03",
    alert: "Power Loss",
    severity: "Critical",
    status: "Closed",
  },
  {
    time: "07:30",
    device: "Pump-01",
    alert: "Temperature Spike",
    severity: "Low",
    status: "Open",
  },
];

function getSeverityColor(severity: string) {
  switch (severity) {
    case "Low":
      return "text-green-600";
    case "Medium":
      return "text-yellow-600";
    case "High":
      return "text-orange-500";
    case "Critical":
      return "text-red-600";
    default:
      return "text-gray-700";
  }
}

export default function AlertsPage() {
  return (
    <div className="w-full max-w-full">
      <h1 className="text-2xl font-bold mb-4">Alerts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <StatCard
          icon={<BellElectric size={20} className="text-yellow-600" />}
          title="Alerts"
          value={124}
        />
        <StatCard
          icon={<GlobeOff size={20} className="text-red-600" />}
          title="Devices Offline"
          value={3}
        />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-4">
        <input
          placeholder="Search Alerts..."
          className="flex-1 min-w-50 max-w-full md:max-w-lg p-2 rounded-full bg-accent border-none shadow-inner"
        />

        <div className="ml-auto">
          <DevicesActions />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-accent text-primary">
              <th className="px-4 py-3 text-left font-semibold">Time</th>
              <th className="px-4 py-3 text-left font-semibold">Device</th>
              <th className="px-4 py-3 text-left font-semibold">Alert</th>
              <th className="px-4 py-3 text-left font-semibold">Severity</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a, idx) => (
              <tr key={idx} className="border-t last:border-b-0">
                <td className="px-4 py-3 whitespace-nowrap">{a.time}</td>
                <td className="px-4 py-3 whitespace-nowrap">{a.device}</td>
                <td className="px-4 py-3 whitespace-nowrap">{a.alert}</td>
                <td
                  className={`px-4 py-3 font-semibold whitespace-nowrap ${getSeverityColor(a.severity)}`}
                >
                  {a.severity}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
