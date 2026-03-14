ALTER TABLE "users" ADD COLUMN "auth_user_id" text;--> statement-breakpoint
INSERT INTO "user" ("id", "name", "email", "emailVerified", "image", "createdAt", "updatedAt")
SELECT
	gen_random_uuid()::text,
	split_part(u.email, '@', 1),
	u.email,
	false,
	NULL,
	now(),
	now()
FROM "users" u
LEFT JOIN "user" ba ON lower(ba.email) = lower(u.email)
WHERE ba.id IS NULL;--> statement-breakpoint
UPDATE "users" u
SET "auth_user_id" = ba.id
FROM "user" ba
WHERE lower(ba.email) = lower(u.email)
	AND u."auth_user_id" IS NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "auth_user_id" SET NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "users_tenant_auth_user_unique" ON "users" USING btree ("tenant_id","auth_user_id");
ALTER TABLE "users" ADD CONSTRAINT "users_auth_user_id_user_id_fk" FOREIGN KEY ("auth_user_id") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE cascade;