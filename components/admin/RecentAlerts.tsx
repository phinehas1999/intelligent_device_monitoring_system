export default function RecentAlerts() {
  const items = [
    "12:03 AM: Temperature spike detected",
    "10:21 AM: Vibration anomaly detected",
    "3:00 AM: Temperature spike detected",
    "8:21 AM: Vibration anomaly detected",
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col h-full">
      <div className="font-semibold text-gray-900 mb-4 text-lg">
        Recent Alerts
      </div>
      <div className="rounded-lg overflow-hidden flex-1">
        <ul className="text-sm divide-y divide-gray-50 flex flex-col h-full">
          {items.map((it, idx) => (
            <li
              key={idx}
              className="py-3 hover:bg-gray-50 transition-colors text-gray-700"
            >
              {it}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
