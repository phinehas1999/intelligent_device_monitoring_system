import StatCard from "@/components/admin/StatCard";
import ChartBox from "@/components/admin/ChartBox";
import { Users, ServerCrash, CreditCard, Activity } from "lucide-react";

export default function PlatformDashboardPage() {
  return (
    <div className="w-full max-w-full">
      <h1 className="text-2xl font-bold mb-4">Platform Overview</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Users size={20} className="text-blue-600" />}
          title="Total Tenants"
          value={42}
        />
        <StatCard
          icon={<Activity size={20} className="text-green-600" />}
          title="Active Devices"
          value={"12.4k"}
        />
        <StatCard
          icon={<CreditCard size={20} className="text-purple-600" />}
          title="Monthly Revenue"
          value="$45,200"
        />
        <StatCard
          icon={<ServerCrash size={20} className="text-red-600" />}
          title="Critical Alerts"
          value={14}
        />
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <div className="mb-2 text-sm text-primary font-medium">
            Tenant Growth (Last 12 Months)
          </div>
          <ChartBox>
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              [Tenant Growth Chart Placeholder]
            </div>
          </ChartBox>
        </div>
        <div>
          <div className="mb-2 text-sm text-primary font-medium">
            System Load Status
          </div>
          <ChartBox>
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              [System Load Chart Placeholder]
            </div>
          </ChartBox>
        </div>
      </div>

      {/* Recent Platform Activity */}
      <div className="bg-white rounded-lg shadow-sm p-4 w-full overflow-hidden">
        <div className="font-semibold mb-4 text-primary">
          Recent Platform Activity
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-accent text-primary">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Time</th>
                <th className="px-4 py-3 text-left font-medium">Tenant</th>
                <th className="px-4 py-3 text-left font-medium">Event Type</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  time: "10 mins ago",
                  tenant: "Acme Corp",
                  event: "Subscription",
                  desc: "Upgraded to Enterprise Plan",
                },
                {
                  time: "45 mins ago",
                  tenant: "Globex Inc",
                  event: "Alert",
                  desc: "Generated 50+ Critical Alerts in 1h",
                },
                {
                  time: "2 hours ago",
                  tenant: "Stark Industries",
                  event: "New Tenant",
                  desc: "Account registered and onboarded",
                },
                {
                  time: "5 hours ago",
                  tenant: "Initech",
                  event: "Billing",
                  desc: "Payment failed for standard plan",
                },
              ].map((row, idx) => (
                <tr
                  key={idx}
                  className="border-t last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {row.time}
                  </td>
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    {row.tenant}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 bg-accent rounded text-xs text-primary">
                      {row.event}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
