const Navbar = ({
  collapsed,
  toggleCollapsed,
}: {
  collapsed: boolean;
  toggleCollapsed: () => void;
}) => {
  return (
    <header
      className="h-16 bg-secondary text-accent shadow-sm w-full fixed top-0 left-0 z-10"
      style={{ minWidth: "100vw" }}
    >
      <div
        className="flex items-center h-full px-8"
        style={{
          marginLeft: collapsed ? "4rem" : "16rem",
          transition: "margin-left 0.3s",
        }}
      >
        <span className="text-lg font-semibold tracking-wide">
          Intelligent Device Monitoring System
        </span>
      </div>
    </header>
  );
};

export default Navbar;
