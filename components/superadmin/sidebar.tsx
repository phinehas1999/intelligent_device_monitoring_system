"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  AlertTriangle,
  FileText,
  Receipt,
  LogOut,
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

const Sidebar = ({
  collapsed,
  toggleCollapsed,
}: {
  collapsed: boolean;
  toggleCollapsed: () => void;
}) => {
  const sidebarWidth = collapsed ? "w-16" : "w-64";
  const pathname = usePathname() || "";

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
            SA
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-semibold truncate">System Admin</div>
              <div className="text-xs text-accent/60 truncate">
                admin@idms.com
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
