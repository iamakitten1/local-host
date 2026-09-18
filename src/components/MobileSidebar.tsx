import { NavLink } from "react-router-dom";
import {
  Building2,
  X,
} from "lucide-react";

import { navItems } from "../config/navigation";

type MobileSidebarProps = {
  onClose: () => void;
};

const MobileSidebar = ({
  onClose,
}: MobileSidebarProps) => {
  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-black/30 backdrop-blur-[1px]"
      />

      <aside className="relative z-10 flex h-dvh w-[min(18rem,88vw)] flex-col border-r border-[#e7e5df] bg-[#fbfaf7] shadow-xl">
        <div className="flex items-center justify-between border-b border-[#e7e5df] px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#3f6f60] text-white shadow-sm">
              <Building2
                size={20}
                strokeWidth={2}
                aria-hidden="true"
              />
            </div>

            <div>
              <h2 className="text-base font-semibold tracking-tight text-gray-900">
                LocalHost
              </h2>

              <p className="text-xs text-gray-500">
                Property operations
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="flex size-10 cursor-pointer items-center justify-center rounded-xl text-gray-500 transition hover:bg-[#f1f0eb] hover:text-gray-900"
          >
            <X
              size={20}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
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
                    onClick={onClose}
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
    </div>
  );
};

export default MobileSidebar;