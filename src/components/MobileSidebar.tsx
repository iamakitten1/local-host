import { NavLink } from "react-router-dom";

type MobileSidebarProps = {
  onClose: () => void;
};

const MobileSidebar = ({ onClose }: MobileSidebarProps) => {
  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Rooms", path: "/rooms" },
    { label: "Bookings", path: "/bookings" },
    { label: "Cleaning", path: "/cleaning" },
    { label: "Staff", path: "/staff" },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-black/40"
      />

      <aside className="relative z-10 min-h-screen w-72 bg-white p-4 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">LocalHost</h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default MobileSidebar;