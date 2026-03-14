const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  const env = fs.readFileSync(envPath, "utf8");
  env.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) return;
    const key = m[1];
    let val = m[2] || "";
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  });
}

async function run() {
  loadEnv();
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }
  const client = new Client({ connectionString });
  await client.connect();

  try {
    // Create a sample tenant
    const t = await client.query(
      "INSERT INTO tenants (name, subscription_plan) VALUES ($1, $2) RETURNING id",
      ["Acme Corp", "starter"],
    );
    const tenantId = t.rows[0].id;

    // Admin user
    await client.query(
      "INSERT INTO users (tenant_id, email, password, role) VALUES ($1, $2, $3, $4)",
      [tenantId, "admin@acme.test", "password_hash_here", "ADMIN"],
    );

    // Asset and location
    const a = await client.query(
      "INSERT INTO assets (tenant_id, name, metadata) VALUES ($1, $2, $3) RETURNING id",
      [tenantId, "Factory Floor", JSON.stringify({ zone: "A1" })],
    );
    const assetId = a.rows[0].id;

    const l = await client.query(
      "INSERT INTO locations (tenant_id, name, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING id",
      [tenantId, "Plant 1", 40.7128, -74.006],
    );
    const locationId = l.rows[0].id;

    // Device
    const d = await client.query(
      "INSERT INTO devices (tenant_id, asset_id, location_id, device_name, device_type, status, health_score) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id",
      [tenantId, assetId, locationId, "Pump-01", "pump", "online", 95],
    );
    const deviceId = d.rows[0].id;

    // Telemetry (multiple rows)
    await client.query(
      "INSERT INTO telemetry (tenant_id, device_id, temperature, vibration, voltage) VALUES ($1,$2,$3,$4,$5)",
      [tenantId, deviceId, 72.4, 0.02, 230],
    );
    await client.query(
      "INSERT INTO telemetry (tenant_id, device_id, temperature, vibration, voltage) VALUES ($1,$2,$3,$4,$5)",
      [tenantId, deviceId, 75.1, 0.05, 229],
    );

    // Alerts using valid enum severity
    await client.query(
      "INSERT INTO alerts (tenant_id, device_id, alert_type, severity, status) VALUES ($1,$2,$3,$4,$5)",
      [tenantId, deviceId, "overheat", "WARNING", "open"],
    );

    console.log("Seed complete. Tenant ID:", tenantId);
  } catch (err) {
    console.error("Seed error:", err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

run();
