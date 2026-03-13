import { Terminal, Calendar1, Search, Download } from "lucide-react";

export default function SystemLogsPage() {
  const logs = [
    {
      timestamp: "2026-03-13 14:02:11",
      level: "ERROR",
      source: "AuthService",
      message: "Failed login attempt from IP 192.168.1.45 (Tenant: TNT-002)",
    },
    {
      timestamp: "2026-03-13 13:45:00",
      level: "INFO",
      source: "BillingWorker",
      message:
        "Successfully executed monthly invoice generation for 42 tenants",
    },
    {
      timestamp: "2026-03-13 13:12:05",
      level: "WARN",
      source: "MQTTBroker",
      message: "High latency detected on node-east-1 connection",
    },
    {
      timestamp: "2026-03-13 11:30:22",
      level: "INFO",
      source: "DeviceRegistry",
      message: "New batch of 50 ESP32 devices registered under TNT-003",
    },
    {
      timestamp: "2026-03-13 10:00:01",
      level: "INFO",
      source: "PlatformConfig",
      message: "Superadmin updated global alert routing settings",
    },
    {
      timestamp: "2026-03-13 09:15:43",
      level: "ERROR",
      source: "DBCluster",
      message:
        "Deadlock detected in timeseries data ingestion (retried successfully)",
    },
    {
      timestamp: "2026-03-13 08:00:00",
      level: "INFO",
      source: "System",
      message: "Daily backup completed in 412s",
    },
  ];

  function getLevelColor(level: string) {
    if (level === "ERROR")
      return "text-red-600 bg-red-50 border border-red-100";
    if (level === "WARN")
      return "text-orange-600 bg-orange-50 border border-orange-100";
    return "text-blue-600 bg-blue-50 border border-blue-100";
  }

  return (
    <div className="w-full max-w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Terminal size={24} className="text-primary" />
          System Logs
        </h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            <Calendar1 size={16} /> Last 24 Hours
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="bg-[#1e1e1e] text-gray-300 rounded-xl shadow-md overflow-hidden border border-gray-800 font-mono text-sm leading-relaxed">
        <div className="bg-[#2d2d2d] px-4 py-2 border-b border-gray-700 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> Live
              Tail
            </span>
          </div>
          <div className="flex items-center gap-2 bg-[#1e1e1e] px-2 py-1 rounded">
            <Search size={14} className="text-gray-500" />
            <input
              type="text"
              placeholder="grep logs..."
              className="bg-transparent border-none outline-none text-gray-300 placeholder-gray-600 w-48"
            />
          </div>
        </div>
        <div className="p-4 overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full">
            <tbody className="divide-y divide-gray-800/50">
              {logs.map((log, i) => (
                <tr key={i} className="hover:bg-white/5 group">
                  <td className="py-2 pr-4 text-gray-500 whitespace-nowrap align-top">
                    {log.timestamp}
                  </td>
                  <td className="py-2 pr-4 align-top">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider ${getLevelColor(log.level)}`}
                    >
                      {log.level}
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-purple-400 whitespace-nowrap align-top">
                    [{log.source}]
                  </td>
                  <td className="py-2 text-gray-300 break-all">
                    {log.message}
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
