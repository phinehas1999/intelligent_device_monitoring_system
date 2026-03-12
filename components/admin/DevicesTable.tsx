export default function DevicesTable() {
  const columns = ["Asset Name", "Type", "Status", "Location", "Health Score"];
  const rows = Array.from({ length: 8 }).map((_, i) => ({
    name: `Device-${i + 1}`,
    type: "Electric Motor",
    status: i % 3 === 0 ? "Healthy" : i % 3 === 1 ? "Warning" : "Critical",
    location: `Factory ${String.fromCharCode(65 + (i % 3))}`,
    health: `${70 + (i % 30)}%`,
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-accent text-primary">
              <tr>
                {columns.map((c) => (
                  <th key={c} className="py-3 px-4 text-left font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx} className="border-t last:border-b-0">
                  <td className="py-4 px-4">{r.name}</td>
                  <td className="py-4 px-4">{r.type}</td>
                  <td className="py-4 px-4">{r.status}</td>
                  <td className="py-4 px-4">{r.location}</td>
                  <td className="py-4 px-4">{r.health}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
