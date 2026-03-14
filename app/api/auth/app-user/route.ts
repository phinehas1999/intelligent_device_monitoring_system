import { auth } from "@/lib/auth";
import { findAppUserByAuthId } from "@/lib/app-user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const appUser = await findAppUserByAuthId(session.user.id);
  if (!appUser) {
    return NextResponse.json(
      {
        error: "APP_USER_NOT_FOUND",
        message: "No tenant user linked to this auth account",
      },
      { status: 404 },
    );
  }

  const tenantCookie = req.cookies.get("tenant_id")?.value;
  if (tenantCookie && tenantCookie !== appUser.tenant_id) {
    return NextResponse.json(
      {
        error: "TENANT_MISMATCH",
        message: "Authenticated user does not match active tenant",
      },
      { status: 409 },
    );
  }

  const enrichedAppUser = {
    ...appUser,
    name: session.user.name ?? null,
    email: session.user.email ?? appUser.email,
    image: session.user.image ?? null,
  };

  const res = NextResponse.json({ appUser: enrichedAppUser }, { status: 200 });
  res.cookies.set("tenant_id", appUser.tenant_id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return res;
}
