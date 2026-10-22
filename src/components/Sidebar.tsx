import { NavLink } from "react-router-dom";
import { Building2 } from "lucide-react";

import { navItems } from "../config/navigation";

const Sidebar = () => {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r border-(--color-border) bg-(--color-surface-soft) xl:flex xl:flex-col">
      <div className="border-b border-(--color-border) px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--color-primary) text-white shadow-sm">
            <Building2 size={20} strokeWidth={2} />
          </div>

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-(--color-text)">
              LocalHost
            </h1>

            <p className="text-xs text-(--color-text-muted)">
              Property operations
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-5">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
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
                        ? "bg-(--color-primary-soft) text-(--color-primary)"
                        : "text-(--color-text-muted) hover:bg-(--color-background) hover:text-(--color-text)"
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

      <div className="border-t border-(--color-border) p-4">
        <div className="rounded-xl bg-(--color-surface) px-4 py-3 shadow-sm ring-1 ring-(--color-border)">
          <p className="text-xs font-medium text-(--color-text)">
            LocalHost
          </p>

          <p className="mt-0.5 text-xs text-(--color-text-muted)">
            B&B operations workspace
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;