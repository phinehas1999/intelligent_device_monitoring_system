-- Initial migration: create core multi-tenant tables
-- (Copied from db/schema.sql)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subscription_plan text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  password text NOT NULL,
  role text NOT NULL CHECK (role IN ('SUPERADMIN','ADMIN','USER')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS users_tenant_idx ON users(tenant_id);

CREATE TABLE IF NOT EXISTS assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name text NOT NULL,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS assets_tenant_idx ON assets(tenant_id);

CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name text,
  latitude double precision,
  longitude double precision,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS locations_tenant_idx ON locations(tenant_id);

CREATE TABLE IF NOT EXISTS devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  asset_id uuid REFERENCES assets(id) ON DELETE SET NULL,
  location_id uuid REFERENCES locations(id) ON DELETE SET NULL,
  device_name text,
  device_type text,
  status text,
  health_score integer,
  last_seen timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS devices_tenant_idx ON devices(tenant_id);
CREATE INDEX IF NOT EXISTS devices_asset_idx ON devices(asset_id);

CREATE TABLE IF NOT EXISTS telemetry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  device_id uuid NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  temperature double precision,
  vibration double precision,
  voltage double precision,
  timestamp timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS telemetry_device_idx ON telemetry(device_id);
CREATE INDEX IF NOT EXISTS telemetry_tenant_idx ON telemetry(tenant_id);

CREATE TABLE IF NOT EXISTS alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  device_id uuid REFERENCES devices(id) ON DELETE SET NULL,
  alert_type text,
  severity text,
  status text,
  timestamp timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS alerts_tenant_idx ON alerts(tenant_id);
CREATE INDEX IF NOT EXISTS alerts_device_idx ON alerts(device_id);
