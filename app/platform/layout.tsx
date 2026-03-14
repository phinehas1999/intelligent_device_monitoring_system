import PlatformShell from "@/components/superadmin/PlatformShell";
import { auth } from "@/lib/auth";
import { findAppUserByAuthId } from "@/lib/app-user";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const appUser = await findAppUserByAuthId(session.user.id);
  if (!appUser) {
    redirect("/auth/login?error=missing-app-user");
  }

  const tenantCookie = (await cookies()).get("tenant_id")?.value;
  if (tenantCookie && tenantCookie !== appUser.tenant_id) {
    redirect("/auth/login?error=tenant-mismatch");
  }

  if (appUser.role !== "SUPERADMIN") {
    redirect("/admin");
  }

  return <PlatformShell>{children}</PlatformShell>;
}
