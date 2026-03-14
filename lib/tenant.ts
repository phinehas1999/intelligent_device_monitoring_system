import { NextRequest } from "next/server";

/**
 * Helper to extract tenant id from an incoming request.
 * Looks in header `x-tenant-id` or cookie `tenant_id`.
 * Adapt to your auth/session strategy as needed.
 */
export function getTenantIdFromRequest(
  req: NextRequest | { headers?: any; cookies?: any },
) {
  const headers = (req as any).headers;
  if (headers && typeof headers.get === "function") {
    const h = headers.get("x-tenant-id");
    if (h) return h;
  } else if (req.headers && req.headers["x-tenant-id"]) {
    return req.headers["x-tenant-id"];
  }

  // cookies fallback
  if ((req as any).cookies && typeof (req as any).cookies.get === "function") {
    const c = (req as any).cookies.get("tenant_id");
    if (c) return c.value || c;
  }

  if (req && (req as any).cookies && (req as any).cookies["tenant_id"]) {
    return (req as any).cookies["tenant_id"];
  }

  return null;
}

export function requireTenant(tenantId: string | null) {
  if (!tenantId) throw new Error("Tenant ID required");
}

export function assertSameTenant(resourceTenantId: string, tenantId: string) {
  if (resourceTenantId !== tenantId) {
    throw new Error("Tenant mismatch");
  }
}
