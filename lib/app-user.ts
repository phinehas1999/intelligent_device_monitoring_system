import { pool } from "@/lib/db";

export type AppUserRow = {
  id: string;
  tenant_id: string;
  auth_user_id: string;
  email: string;
  role: "SUPERADMIN" | "ADMIN";
};

export async function findAppUserByAuthId(authUserId: string) {
  const result = await pool.query<AppUserRow>(
    `SELECT id, tenant_id, auth_user_id, email, role
     FROM users
     WHERE auth_user_id = $1
     LIMIT 1`,
    [authUserId],
  );
  return result.rows[0] ?? null;
}

export async function createTenantAndLinkedUser(input: {
  authUserId: string;
  email: string;
  tenantName: string;
  role?: "SUPERADMIN" | "ADMIN";
}) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const existingByAuth = await client.query<AppUserRow>(
      `SELECT id, tenant_id, auth_user_id, email, role
       FROM users
       WHERE auth_user_id = $1
       LIMIT 1`,
      [input.authUserId],
    );
    if (existingByAuth.rowCount) {
      await client.query("COMMIT");
      return existingByAuth.rows[0];
    }

    const existingByEmail = await client.query<AppUserRow>(
      `SELECT id, tenant_id, auth_user_id, email, role
       FROM users
       WHERE lower(email) = lower($1)
       LIMIT 1`,
      [input.email],
    );

    if (existingByEmail.rowCount) {
      await client.query("ROLLBACK");
      const row = existingByEmail.rows[0];
      const err = new Error(
        row.auth_user_id ? "AUTH_USER_LINK_MISMATCH" : "DUPLICATE_EMAIL",
      );
      throw err;
    }

    const tenantInsert = await client.query<{ id: string }>(
      `INSERT INTO tenants (name, subscription_plan, status)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [input.tenantName, "starter", "active"],
    );

    const tenantId = tenantInsert.rows[0]?.id;
    if (!tenantId) {
      await client.query("ROLLBACK");
      throw new Error("TENANT_CREATE_FAILED");
    }

    const userInsert = await client.query<AppUserRow>(
      `INSERT INTO users (tenant_id, auth_user_id, email, password, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, tenant_id, auth_user_id, email, role`,
      [
        tenantId,
        input.authUserId,
        input.email,
        "better-auth-managed",
        input.role ?? "ADMIN",
      ],
    );

    await client.query("COMMIT");
    return userInsert.rows[0];
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch {
      // no-op
    }
    throw error;
  } finally {
    client.release();
  }
}
