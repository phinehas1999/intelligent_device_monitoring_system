import { FileText, Download, CheckCircle, Clock } from "lucide-react";
import StatCard from "@/components/admin/StatCard";

export default function BillingPage() {
  const invoices = [
    {
      id: "INV-2026-003",
      tenant: "Stark Industries",
      amount: "$899.00",
      date: "Mar 01, 2026",
      status: "Paid",
    },
    {
      id: "INV-2026-004",
      tenant: "Acme Corp",
      amount: "Custom",
      date: "Mar 01, 2026",
      status: "Paid",
    },
    {
      id: "INV-2026-005",
      tenant: "Globex Inc",
      amount: "$899.00",
      date: "Mar 01, 2026",
      status: "Pending",
    },
    {
      id: "INV-2026-006",
      tenant: "Initech",
      amount: "$299.00",
      date: "Feb 01, 2026",
      status: "Overdue",
    },
    {
      id: "INV-2026-007",
      tenant: "Umbrella Corp",
      amount: "$899.00",
      date: "Feb 01, 2026",
      status: "Paid",
    },
  ];

  function getStatusBadge(status: string) {
    if (status === "Paid")
      return (
        <span className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs font-semibold">
          <CheckCircle size={12} /> Paid
        </span>
      );
    if (status === "Pending")
      return (
        <span className="flex items-center gap-1 text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full text-xs font-semibold">
          <Clock size={12} /> Pending
        </span>
      );
    return (
      <span className="flex items-center gap-1 text-red-700 bg-red-100 px-2 py-1 rounded-full text-xs font-semibold">
        <Clock size={12} /> Overdue
      </span>
    );
  }

  return (
    <div className="w-full max-w-full">
      <h1 className="text-2xl font-bold mb-6">Invoices & Billing</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={<FileText size={20} className="text-blue-600" />}
          title="Invoices Generated"
          value={42}
        />
        <StatCard
          icon={<CheckCircle size={20} className="text-green-600" />}
          title="Revenue Collected (MTD)"
          value="$38,100"
        />
        <StatCard
          icon={<Clock size={20} className="text-red-600" />}
          title="Outstanding Payments"
          value="$7,100"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full">
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-accent/30">
          <h2 className="font-semibold text-primary">Recent Invoices</h2>
          <button className="text-sm font-medium text-blue-600 hover:underline">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-accent text-primary">
                <th className="px-5 py-3 text-left font-medium">Invoice ID</th>
                <th className="px-5 py-3 text-left font-medium">Tenant</th>
                <th className="px-5 py-3 text-left font-medium">Amount</th>
                <th className="px-5 py-3 text-left font-medium">Issue Date</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
                <th className="px-5 py-3 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoices.map((inv, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 whitespace-nowrap font-mono text-xs text-gray-500">
                    {inv.id}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap font-medium text-primary">
                    {inv.tenant}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-gray-700 font-medium">
                    {inv.amount}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-gray-600">
                    {inv.date}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    {getStatusBadge(inv.status)}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <button
                      className="text-gray-500 hover:text-primary transition-colors hover:bg-gray-100 p-1.5 rounded-md"
                      aria-label="Download Invoice"
                    >
                      <Download size={16} />
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
