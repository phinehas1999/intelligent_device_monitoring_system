"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  LayoutDashboard,
  LayoutList,
  BellElectric,
  LocateFixed,
  ChartArea,
  Settings as SettingsIcon,
} from "lucide-react";
const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Devices", icon: LayoutList, href: "/admin/devices" },
  { label: "Alerts", icon: BellElectric, href: "/admin/alerts" },
  { label: "Locate Device", icon: LocateFixed, href: "/admin/locate" },
  { label: "Analytics", icon: ChartArea, href: "/admin/analytics" },
  { label: "Settings", icon: SettingsIcon, href: "/admin/settings" },
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
          {!collapsed && (
            <span className="font-bold text-lg whitespace-nowrap">
              Company Name
            </span>
          )}
          <button
            className="ml-auto text-2xl focus:outline-none cursor-pointer"
            onClick={toggleCollapsed}
            aria-label="Toggle sidebar"
          >
            <Menu size={24} className="text-accent" />
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            let isActive = false;
            if (item.href) {
              if (item.href === "/admin") {
                isActive = pathname === "/admin" || pathname === "/admin/";
              } else {
                isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              }
            }
            const ItemInner = (
              <div
                className={`flex items-center cursor-pointer transition-colors text-base font-medium
                  ${collapsed ? "justify-center" : "gap-3 px-2"}
                  ${isActive && !collapsed ? "bg-secondary text-background rounded-r-full py-2" : ""}
                  ${!isActive && !collapsed ? "hover:bg-secondary/30 rounded-r-full py-2" : ""}
                `}
                style={collapsed ? { width: "3rem", height: "3rem" } : {}}
              >
                <span
                  className={
                    isActive && collapsed
                      ? "bg-secondary text-background rounded-full flex items-center justify-center w-12 h-12"
                      : "w-8 flex justify-center"
                  }
                  style={
                    isActive && collapsed
                      ? { minWidth: "3rem", minHeight: "3rem" }
                      : {}
                  }
                >
                  {item.icon && <item.icon size={22} className="text-accent" />}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </div>
            );

            return (
              <div key={item.label}>
                {item.href ? (
                  <Link href={item.href} replace>
                    {ItemInner}
                  </Link>
                ) : (
                  ItemInner
                )}
              </div>
            );
          })}
        </nav>
      </div>
      <div
        className={`flex items-center px-2 mt-8 ${collapsed ? "justify-center" : "gap-3"}`}
      >
        <div className="h-10 w-10 min-w-10 min-h-10 bg-white rounded-full border-2 border-accent flex items-center justify-center font-bold text-primary text-lg select-none flex-shrink-0">
          P
        </div>
        {!collapsed && (
          <div>
            <div className="font-semibold leading-tight">Phinehas Abdu</div>
            <div className="text-xs opacity-70">Admin</div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
