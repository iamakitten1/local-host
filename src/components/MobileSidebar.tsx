import { NavLink } from "react-router-dom";
import { Building2, X } from "lucide-react";

import { navItems } from "../config/navigation";

type MobileSidebarProps = {
  onClose: () => void;
};

const MobileSidebar = ({ onClose }: MobileSidebarProps) => {
  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-black/30 backdrop-blur-[1px]"
      />

      <aside className="relative z-10 flex h-dvh w-[min(18rem,88vw)] flex-col border-r border-(--color-border) bg-(--color-surface-soft) shadow-xl">
        <div className="flex items-center justify-between border-b border-(--color-border) px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-(--color-primary) text-white shadow-sm">
              <Building2
                size={20}
                strokeWidth={2}
                aria-hidden="true"
              />
            </div>

            <div>
              <h2 className="text-base font-semibold tracking-tight text-(--color-text)">
                LocalHost
              </h2>

              <p className="text-xs text-(--color-text-muted)">
                Property operations
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="flex size-10 cursor-pointer items-center justify-center rounded-xl text-(--color-text-muted) transition hover:bg-(--color-background) hover:text-(--color-text)"
          >
            <X
              size={20}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
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
                    onClick={onClose}
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
    </div>
  );
};

export default MobileSidebar;