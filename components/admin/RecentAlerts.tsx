export default function RecentAlerts() {
  const items = [
    "12:03 AM: Temperature spike detected",
    "10:21 AM: Vibration anomaly detected",
    "3:00 AM: Temperature spike detected",
    "8:21 AM: Vibration anomaly detected",
  ];

  return (
    <div className="bg-accent rounded-lg shadow-md p-4">
      <div className="font-semibold mb-3">Recent Alerts</div>
      <div className="bg-white rounded-md p-2 overflow-hidden">
        <ul className="text-sm">
          {items.map((it, idx) => (
            <li key={idx} className="border-b last:border-b-0 px-3 py-2">
              {it}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
