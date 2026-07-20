import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Rooms", path: "/rooms" },
    { label: "Bookings", path: "/bookings" },
    { label: "Cleaning", path: "/cleaning" },
    { label: "Staff", path: "/staff" },
  ];

  return (
    <aside className="hidden min-h-screen w-64 border-r border-gray-200 bg-white lg:block">
      <div className="p-6">
        <h1 className="text-2xl font-bold">LocalHost</h1>
      </div>

      <nav className="px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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
  );
};

export default Sidebar;