"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/admin/navbar";
import Sidebar from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  // Responsive: collapse sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCollapsed(true);
      else setCollapsed(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = collapsed ? 64 : 256; // px (w-16 or w-64)

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
        <main className="mt-12 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
