export default function TopRiskTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 bg-accent/30 flex justify-between items-center">
        <h2 className="font-semibold text-primary">Top Risk Devices</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-accent text-primary border-b border-gray-100">
              <th className="px-5 py-3 text-left font-semibold">Device</th>
              <th className="px-5 py-3 text-left font-semibold">Health</th>
              <th className="px-5 py-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {Array.from({ length: 4 }).map((_, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 font-medium">Device-{i + 1}</td>
                <td className="px-5 py-4 text-red-600 font-semibold">
                  {60 - i * 5}%
                </td>
                <td className="px-5 py-4">
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold text-red-700 bg-red-50">
                    Critical
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
