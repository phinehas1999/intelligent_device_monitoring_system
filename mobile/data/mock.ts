export type DeviceStatus = "online" | "warning" | "offline";

export type Device = {
  id: string;
  name: string;
  type: string;
  status: DeviceStatus;
  health: number;
  location: string;
  lat: number;
  lng: number;
  lastSeen: string;
  firmware: string;
  ipAddress: string;
  temperature: number;
  vibration: number;
  voltage: number;
};

export type AlertItem = {
  id: string;
  deviceId: string;
  deviceName: string;
  message: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "acknowledged" | "resolved";
  time: string;
};

export const devices: Device[] = [
  {
    id: "motor-01",
    name: "Motor-01",
    type: "Electric Motor",
    status: "warning",
    health: 72,
    location: "Factory A",
    lat: 9.033,
    lng: 38.749,
    lastSeen: "2m ago",
    firmware: "v2.4.1",
    ipAddress: "10.0.2.15",
    temperature: 74,
    vibration: 0.43,
    voltage: 221,
  },
  {
    id: "pump-02",
    name: "Pump-02",
    type: "Water Pump",
    status: "offline",
    health: 61,
    location: "Pump Station C",
    lat: 9.041,
    lng: 38.721,
    lastSeen: "14m ago",
    firmware: "v1.9.7",
    ipAddress: "10.0.2.32",
    temperature: 88,
    vibration: 0.57,
    voltage: 216,
  },
  {
    id: "gen-01",
    name: "Generator-01",
    type: "Generator",
    status: "online",
    health: 91,
    location: "Solar Farm B",
    lat: 9.028,
    lng: 38.73,
    lastSeen: "now",
    firmware: "v3.1.0",
    ipAddress: "10.0.2.48",
    temperature: 65,
    vibration: 0.29,
    voltage: 229,
  },
  {
    id: "compressor-04",
    name: "Compressor-04",
    type: "Air Compressor",
    status: "online",
    health: 94,
    location: "Factory A",
    lat: 9.038,
    lng: 38.741,
    lastSeen: "now",
    firmware: "v2.8.3",
    ipAddress: "10.0.2.54",
    temperature: 62,
    vibration: 0.24,
    voltage: 223,
  },
];

export const alerts: AlertItem[] = [
  {
    id: "a-001",
    deviceId: "pump-02",
    deviceName: "Pump-02",
    message: "Temperature spike detected",
    severity: "critical",
    status: "open",
    time: "10:21",
  },
  {
    id: "a-002",
    deviceId: "motor-01",
    deviceName: "Motor-01",
    message: "Abnormal vibration trend",
    severity: "high",
    status: "open",
    time: "10:11",
  },
  {
    id: "a-003",
    deviceId: "gen-01",
    deviceName: "Generator-01",
    message: "Voltage instability warning",
    severity: "medium",
    status: "acknowledged",
    time: "09:43",
  },
  {
    id: "a-004",
    deviceId: "compressor-04",
    deviceName: "Compressor-04",
    message: "Telemetry timeout recovered",
    severity: "low",
    status: "resolved",
    time: "09:15",
  },
];

export const dashboardStats = [
  { id: "s1", label: "Devices Online", value: "124", trend: "+6.2%" },
  { id: "s2", label: "Devices Offline", value: "3", trend: "-0.8%" },
  { id: "s3", label: "Active Alerts", value: "14", trend: "+2" },
  { id: "s4", label: "Avg Health", value: "84%", trend: "+1.7%" },
];
