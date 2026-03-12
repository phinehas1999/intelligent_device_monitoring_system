

const navItems = [
  { label: "Dashboard", icon: "D", active: true },
  { label: "Devices", icon: "S" },
  { label: "Alerts", icon: "B" },
  { label: "Locate Device", icon: "M" },
  { label: "Analytics", icon: "C" },
  { label: "Settings", icon: "G" },
];



const Sidebar = ({ collapsed, toggleCollapsed }: { collapsed: boolean; toggleCollapsed: () => void }) => {
  const sidebarWidth = collapsed ? "w-16" : "w-64";

  return (
    <aside
      className={`fixed top-0 left-0 h-screen ${sidebarWidth} bg-primary text-accent flex flex-col justify-between py-6 px-2 z-30 transition-all duration-300 shadow-lg rounded-r-2xl`}
      style={{ boxShadow: "2px 0 8px rgba(0,0,0,0.04)" }}
    >
      <div>
        <div className="flex items-center gap-3 mb-8 px-2">
          {!collapsed && <span className="font-bold text-lg whitespace-nowrap">Company Name</span>}
          <button
            className="ml-auto text-2xl focus:outline-none cursor-pointer"
            onClick={toggleCollapsed}
            aria-label="Toggle sidebar"
          >
            <svg width="24" height="24" fill="currentColor"><rect width="24" height="4" y="4" rx="2"/><rect width="24" height="4" y="10" rx="2"/><rect width="24" height="4" y="16" rx="2"/></svg>
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 px-2 py-2 rounded-full cursor-pointer transition-colors text-base font-medium ${item.active ? "bg-secondary text-background" : "hover:bg-secondary/30"}`}
            >
              <span className="text-lg font-mono w-8 text-center">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </div>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3 px-2 mt-8">
        <span className="text-2xl font-mono">U</span>
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
