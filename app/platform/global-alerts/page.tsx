import { Search, Filter } from "lucide-react";
import StatCard from "@/components/admin/StatCard";

// Mock alert data across all tenants
const globalAlerts = [
  {
    time: "10:21",
    tenant: "Acme Corp",
    device: "Pump-02",
    alert: "Temperature Spike",
    severity: "High",
    status: "Open",
  },
  {
    time: "09:10",
    tenant: "Stark Industries",
    device: "Motor-01",
    alert: "Vibration Anomaly",
    severity: "Medium",
    status: "Open",
  },
  {
    time: "08:45",
    tenant: "Globex Inc",
    device: "Fan-03",
    alert: "Power Loss",
    severity: "Critical",
    status: "Closed",
  },
  {
    time: "07:30",
    tenant: "Initech",
    device: "Pump-01",
    alert: "Temperature Spike",
    severity: "Low",
    status: "Open",
  },
  {
    time: "06:15",
    tenant: "Stark Industries",
    device: "Generator-04",
    alert: "Connection Lost",
    severity: "Critical",
    status: "Investigating",
  },
];

function getSeverityColor(severity: string) {
  switch (severity) {
    case "Low":
      return "text-green-600 bg-green-50";
    case "Medium":
      return "text-yellow-600 bg-yellow-50";
    case "High":
      return "text-orange-500 bg-orange-50";
    case "Critical":
      return "text-red-600 bg-red-50";
    default:
      return "text-gray-700 bg-gray-50";
  }
}

export default function GlobalAlertsPage() {
  return (
    <div className="w-full max-w-full">
      <h1 className="text-2xl font-bold mb-4">Global Alerts Monitor</h1>
      <p className="text-gray-500 mb-6 text-sm">
        View and manage system-wide alerts across all tenant instances.
      </p>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px] flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by device, alert type or tenant..."
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
          <Filter size={16} /> Filter
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-accent text-primary border-b border-gray-100">
                <th className="px-5 py-3 text-left font-semibold">Time</th>
                <th className="px-5 py-3 text-left font-semibold">Tenant</th>
                <th className="px-5 py-3 text-left font-semibold">Device</th>
                <th className="px-5 py-3 text-left font-semibold">
                  Alert Type
                </th>
                <th className="px-5 py-3 text-left font-semibold">Severity</th>
                <th className="px-5 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {globalAlerts.map((a, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 whitespace-nowrap text-gray-500">
                    {a.time}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap font-medium">
                    {a.tenant}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">{a.device}</td>
                  <td className="px-5 py-4 whitespace-nowrap">{a.alert}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold ${getSeverityColor(a.severity)}`}
                    >
                      {a.severity}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span
                      className={`text-xs font-medium ${a.status === "Closed" ? "text-gray-500" : "text-primary"}`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
