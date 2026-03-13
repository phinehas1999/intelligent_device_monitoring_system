import { Search, Plus } from "lucide-react";

export default function TenantsPage() {
  const tenants = [
    {
      id: "TNT-001",
      name: "Acme Corp",
      plan: "Enterprise",
      status: "Active",
      devices: 4050,
    },
    {
      id: "TNT-002",
      name: "Globex Inc",
      plan: "Professional",
      status: "Active",
      devices: 1200,
    },
    {
      id: "TNT-003",
      name: "Stark Industries",
      plan: "Enterprise",
      status: "Active",
      devices: 8400,
    },
    {
      id: "TNT-004",
      name: "Initech",
      plan: "Standard",
      status: "Suspended",
      devices: 350,
    },
    {
      id: "TNT-005",
      name: "Umbrella Corp",
      plan: "Professional",
      status: "Active",
      devices: 890,
    },
  ];

  return (
    <div className="w-full max-w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Tenants Management</h1>
        <button className="flex items-center gap-2 bg-primary text-accent px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
          <Plus size={18} />
          <span>Add Tenant</span>
        </button>
      </div>

      <div className="mb-4 flex items-center bg-white p-2 rounded-full shadow-sm max-w-md w-full border border-gray-100">
        <Search size={18} className="text-gray-400 ml-2" />
        <input
          placeholder="Search tenants by name or ID..."
          className="flex-1 bg-transparent border-none outline-none px-3 text-sm"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm w-full overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-accent text-primary">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Tenant ID</th>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Subscription Plan
                </th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Registered Devices
                </th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tenants.map((t, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-gray-500 font-mono text-xs">
                    {t.id}
                  </td>
                  <td className="px-4 py-4 font-medium text-primary">
                    {t.name}
                  </td>
                  <td className="px-4 py-4">{t.plan}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${t.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-600">
                    {t.devices.toLocaleString()}
                  </td>
                  <td className="px-4 py-4">
                    <button className="text-blue-600 hover:underline mr-4 text-xs font-medium">
                      Edit
                    </button>
                    <button className="text-gray-500 hover:text-red-500 text-xs font-medium">
                      Suspend
                    </button>
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
