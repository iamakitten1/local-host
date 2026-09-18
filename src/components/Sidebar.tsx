import { NavLink } from "react-router-dom";
import { Building2 } from "lucide-react";

import { navItems } from "../config/navigation";

const Sidebar = () => {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r border-[#e7e5df] bg-[#fbfaf7] xl:flex xl:flex-col">
      <div className="border-b border-[#e7e5df] px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#3f6f60] text-white shadow-sm">
            <Building2 size={20} strokeWidth={2} />
          </div>

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-gray-900">
              LocalHost
            </h1>

            <p className="text-xs text-gray-500">
              Property operations
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-5">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
          Workspace
        </p>

        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-[#e4ece7] text-[#315f51]"
                        : "text-gray-600 hover:bg-[#f1f0eb] hover:text-gray-900"
                    }`
                  }
                >
                  <Icon
                    size={18}
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />

                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-[#e7e5df] p-4">
        <div className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
          <p className="text-xs font-medium text-gray-800">
            LocalHost
          </p>

          <p className="mt-0.5 text-xs text-gray-500">
            B&B operations workspace
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;