"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/superadmin/navbar";
import Sidebar from "@/components/superadmin/sidebar";

export default function PlatformShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCollapsed(true);
      else setCollapsed(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = collapsed ? 64 : 256;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed((c) => !c)}
      />
      <div
        className="transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <Navbar
          collapsed={collapsed}
          toggleCollapsed={() => setCollapsed((c) => !c)}
        />
        <main className="mt-16 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
