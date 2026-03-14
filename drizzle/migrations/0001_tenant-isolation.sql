DO $$
BEGIN
	IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role_enum') THEN
		CREATE TYPE "public"."role_enum" AS ENUM ('SUPERADMIN', 'ADMIN');
	END IF;
END$$;--> statement-breakpoint
DO $$
BEGIN
	IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'device_status_enum') THEN
		CREATE TYPE "public"."device_status_enum" AS ENUM ('online', 'offline', 'maintenance');
	END IF;
END$$;--> statement-breakpoint
DO $$
BEGIN
	IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'alert_severity_enum') THEN
		CREATE TYPE "public"."alert_severity_enum" AS ENUM ('INFO', 'WARNING', 'CRITICAL');
	END IF;
END$$;--> statement-breakpoint
ALTER TABLE "alerts" ALTER COLUMN "severity" SET DATA TYPE "public"."alert_severity_enum" USING "severity"::"public"."alert_severity_enum";--> statement-breakpoint
ALTER TABLE "alerts" ALTER COLUMN "severity" SET DEFAULT 'WARNING';--> statement-breakpoint
ALTER TABLE "alerts" ALTER COLUMN "severity" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "alerts" ALTER COLUMN "status" SET DEFAULT 'open';--> statement-breakpoint
ALTER TABLE "alerts" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "devices" ALTER COLUMN "device_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "devices" ALTER COLUMN "status" SET DATA TYPE "public"."device_status_enum" USING "status"::"public"."device_status_enum";--> statement-breakpoint
ALTER TABLE "devices" ALTER COLUMN "status" SET DEFAULT 'online';--> statement-breakpoint
ALTER TABLE "devices" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "devices" ALTER COLUMN "health_score" SET DEFAULT 100;--> statement-breakpoint
ALTER TABLE "tenants" ALTER COLUMN "subscription_plan" SET DEFAULT 'standard';--> statement-breakpoint
ALTER TABLE "tenants" ALTER COLUMN "subscription_plan" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "public"."role_enum" USING "role"::"public"."role_enum";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'ADMIN';--> statement-breakpoint
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."devices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "devices" ADD CONSTRAINT "devices_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "devices" ADD CONSTRAINT "devices_asset_id_assets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."assets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "devices" ADD CONSTRAINT "devices_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "telemetry" ADD CONSTRAINT "telemetry_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "telemetry" ADD CONSTRAINT "telemetry_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."devices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;