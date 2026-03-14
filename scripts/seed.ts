import { Client } from "pg";
import fs from "fs";
import path from "path";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }

  const client = new Client({ connectionString });
  await client.connect();

  // Run migrations SQL (if not run already) and then seed minimal data
  const migrationsSql = fs.readFileSync(
    path.join(process.cwd(), "migrations", "0001_init.sql"),
    "utf8",
  );
  await client.query(migrationsSql);

  // Insert a tenant and a user
  const tenantRes = await client.query(
    `INSERT INTO tenants (name, subscription_plan) VALUES ($1, $2) RETURNING id`,
    ["Acme Corp", "starter"],
  );
  const tenantId = tenantRes.rows[0].id;

  await client.query(
    `INSERT INTO users (tenant_id, email, password, role) VALUES ($1, $2, $3, $4)`,
    [tenantId, "admin@acme.test", "password_hash_here", "ADMIN"],
  );

  const assetRes = await client.query(
    `INSERT INTO assets (tenant_id, name) VALUES ($1, $2) RETURNING id`,
    [tenantId, "Factory Floor"],
  );
  const assetId = assetRes.rows[0].id;

  const locRes = await client.query(
    `INSERT INTO locations (tenant_id, name, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING id`,
    [tenantId, "Plant 1", 40.7128, -74.006],
  );
  const locationId = locRes.rows[0].id;

  const deviceRes = await client.query(
    `INSERT INTO devices (tenant_id, asset_id, location_id, device_name, device_type, status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
    [tenantId, assetId, locationId, "Pump-01", "pump", "online"],
  );
  const deviceId = deviceRes.rows[0].id;

  await client.query(
    `INSERT INTO telemetry (tenant_id, device_id, temperature, vibration, voltage) VALUES ($1,$2,$3,$4,$5)`,
    [tenantId, deviceId, 72.4, 0.02, 230],
  );

  await client.query(
    `INSERT INTO alerts (tenant_id, device_id, alert_type, severity, status) VALUES ($1,$2,$3,$4,$5)`,
    [tenantId, deviceId, "overheat", "high", "open"],
  );

  console.log("Seed complete. Tenant ID:", tenantId);
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
