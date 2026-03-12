export default function TopRiskTable() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="mb-3 font-semibold">Top Risk Devices</div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-accent text-primary">
            <th className="px-3 py-2 text-left">Device</th>
            <th className="px-3 py-2 text-left">Health</th>
            <th className="px-3 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 4 }).map((_, i) => (
            <tr key={i} className="border-b last:border-b-0">
              <td className="px-3 py-3">--</td>
              <td className="px-3 py-3">--</td>
              <td className="px-3 py-3">--</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
