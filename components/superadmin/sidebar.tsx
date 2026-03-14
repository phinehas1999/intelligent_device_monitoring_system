"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  AlertTriangle,
  FileText,
  Receipt,
  LogOut,
  EllipsisVertical,
} from "lucide-react";

const navItems = [
  { label: "Platform Dashboard", icon: LayoutDashboard, href: "/platform" },
  { label: "Tenants", icon: Users, href: "/platform/tenants" },
  { label: "Subscriptions", icon: CreditCard, href: "/platform/subscriptions" },
  {
    label: "Global Alerts",
    icon: AlertTriangle,
    href: "/platform/global-alerts",
  },
  { label: "System Logs", icon: FileText, href: "/platform/system-logs" },
  { label: "Billing", icon: Receipt, href: "/platform/billing" },
];

const ProfileMenu = ({
  userName,
  userRole,
  onLogout,
}: {
  userName?: string | null;
  userRole?: string | null;
  onLogout: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-1 rounded hover:bg-white/10 transition-colors"
        aria-label="Open profile menu"
      >
        <EllipsisVertical size={18} />
      </button>
      {open && (
        <div className="absolute right-0 bottom-full mb-2 w-56 bg-primary border border-white/10 rounded-md shadow-lg z-40">
          <div className="px-3 py-2 border-b border-white/5">
            <div className="text-sm font-semibold truncate">{userName ?? "System Admin"}</div>
            <div className="text-xs text-accent/60 truncate">{userRole ?? "SUPERADMIN"}</div>
          </div>
          <button
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="w-full text-left flex items-center gap-2 px-3 py-2 hover:bg-white/5"
          >
            <LogOut size={16} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};


const Sidebar = ({
  collapsed,
  toggleCollapsed,
}: {
  collapsed: boolean;
  toggleCollapsed: () => void;
}) => {
  const sidebarWidth = collapsed ? "w-16" : "w-64";
  const pathname = usePathname() || "";
  const [user, setUser] = useState<null | { name?: string; role?: string; email?: string }>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/auth/app-user", { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) throw new Error("not-auth");
        const data = await res.json();
        return data;
      })
      .then((data) => {
        if (!mounted) return;
        setUser(data.appUser ?? null);
      })
      .catch(() => {
        if (!mounted) return;
        setUser(null);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      const parts = name.trim().split(/\s+/);
      if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    if (email) return email.split("@")[0].slice(0, 2).toUpperCase();
    return "SA";
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST", credentials: "include" });
    } catch (e) {
      // ignore
    }
    window.location.href = "/auth/login";
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen ${sidebarWidth} bg-primary text-accent flex flex-col justify-between py-6 px-2 z-30 transition-all duration-300 shadow-lg rounded-r-2xl`}
      style={{ boxShadow: "2px 0 8px rgba(0,0,0,0.04)" }}
    >
      <div>
        <div className="flex items-center gap-3 mb-8 px-2">
          <button
            onClick={toggleCollapsed}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Menu size={24} />
          </button>
          {!collapsed && (
            <span className="font-bold text-xl tracking-tight">IDMS OS</span>
          )}
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (pathname.startsWith(item.href) && item.href !== "/platform");
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-accent text-primary shadow-sm"
                    : "hover:bg-white/10 text-accent/80 hover:text-accent"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div
                  className={`${isActive ? "text-primary" : "text-accent/80 group-hover:text-accent"}`}
                >
                  <item.icon size={22} />
                </div>
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-2">
        <div
          className={`flex items-center gap-3 p-3 rounded-xl border border-white/10 ${collapsed ? "justify-center" : ""}`}
        >
          <div className="w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center font-bold">
            {getInitials(user?.name ?? null, user?.email ?? null)}
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-semibold truncate">{user?.name ?? "System Admin"}</div>
              <div className="text-xs text-accent/60 truncate">{user?.role ?? "SUPERADMIN"}</div>
            </div>
          )}
          {!collapsed && <ProfileMenu userName={user?.name ?? null} userRole={user?.role ?? null} onLogout={handleLogout} />}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
