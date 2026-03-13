"use client";
import { useRouter } from "next/navigation";

export default function DevicesTable() {
  const router = useRouter();
  const columns = ["Asset Name", "Type", "Status", "Location", "Health Score"];
  const rows = Array.from({ length: 8 }).map((_, i) => ({
    id: `${(i + 1).toString().padStart(6, "0")}`,
    name: `Device-${i + 1}`,
    type: "Electric Motor",
    status: i % 3 === 0 ? "Healthy" : i % 3 === 1 ? "Warning" : "Critical",
    location: `Factory ${String.fromCharCode(65 + (i % 3))}`,
    health: `${70 + (i % 30)}%`,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full">
      <div className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700 border-b border-gray-100">
                {columns.map((c) => (
                  <th key={c} className="px-5 py-3 text-left font-semibold">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map((r, idx) => (
                <tr
                  key={idx}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => router.push(`/admin/devices/${r.id}`)}
                >
                  <td className="px-5 py-4 font-medium">{r.name}</td>
                  <td className="px-5 py-4 text-gray-600">{r.type}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                        r.status === "Healthy"
                          ? "text-green-700 bg-green-50"
                          : r.status === "Warning"
                            ? "text-yellow-700 bg-yellow-50"
                            : "text-red-700 bg-red-50"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{r.location}</td>
                  <td className="px-5 py-4 font-medium">{r.health}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
