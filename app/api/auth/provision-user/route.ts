import { auth } from "@/lib/auth";
import { createTenantAndLinkedUser } from "@/lib/app-user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  let body: { tenantName?: string; email?: string; authUserId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  const authUserId = body.authUserId ?? session.user.id;
  const email = (body.email ?? session.user.email ?? "").trim();
  const tenantName = (body.tenantName ?? "").trim();

  if (!authUserId || !email || !tenantName) {
    return NextResponse.json(
      { error: "tenantName, email, and authUserId are required" },
      { status: 400 },
    );
  }

  if (authUserId !== session.user.id) {
    return NextResponse.json({ error: "AUTH_USER_MISMATCH" }, { status: 403 });
  }

  try {
    const appUser = await createTenantAndLinkedUser({
      authUserId,
      email,
      tenantName,
      role: "ADMIN",
    });

    const res = NextResponse.json({ appUser }, { status: 200 });
    res.cookies.set("tenant_id", appUser.tenant_id, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";

    if (message === "DUPLICATE_EMAIL") {
      return NextResponse.json(
        { error: "DUPLICATE_EMAIL", message: "Email already exists" },
        { status: 409 },
      );
    }

    if (message === "AUTH_USER_LINK_MISMATCH") {
      return NextResponse.json(
        {
          error: "AUTH_USER_LINK_MISMATCH",
          message: "Email exists but is linked to a different auth identity",
        },
        { status: 409 },
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
