import {
  pgTable,
  pgEnum,
  uuid,
  text,
  integer,
  timestamp,
  jsonb,
  doublePrecision,
} from "drizzle-orm/pg-core";

const userRole = pgEnum("role_enum", ["SUPERADMIN", "ADMIN"]);
const deviceStatus = pgEnum("device_status_enum", [
  "online",
  "offline",
  "maintenance",
]);
const alertSeverity = pgEnum("alert_severity_enum", [
  "INFO",
  "WARNING",
  "CRITICAL",
]);

export const tenants = pgTable("tenants", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  subscription_plan: text("subscription_plan").notNull().default("standard"),
  status: text("status").notNull().default("active"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenant_id: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: userRole("role").notNull().default("ADMIN"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const assets = pgTable("assets", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenant_id: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id),
  name: text("name").notNull(),
  metadata: jsonb("metadata"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const locations = pgTable("locations", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenant_id: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id),
  name: text("name"),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const devices = pgTable("devices", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenant_id: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id),
  asset_id: uuid("asset_id").references(() => assets.id),
  location_id: uuid("location_id").references(() => locations.id),
  device_name: text("device_name").notNull(),
  device_type: text("device_type"),
  status: deviceStatus("status").notNull().default("online"),
  health_score: integer("health_score").default(100),
  last_seen: timestamp("last_seen"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const telemetry = pgTable("telemetry", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenant_id: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id),
  device_id: uuid("device_id")
    .notNull()
    .references(() => devices.id),
  temperature: doublePrecision("temperature"),
  vibration: doublePrecision("vibration"),
  voltage: doublePrecision("voltage"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const alerts = pgTable("alerts", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenant_id: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id),
  device_id: uuid("device_id").references(() => devices.id),
  alert_type: text("alert_type"),
  severity: alertSeverity("severity").notNull().default("WARNING"),
  status: text("status").notNull().default("open"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// NOTE: All tenant-facing data references `tenant_id` for isolation.
