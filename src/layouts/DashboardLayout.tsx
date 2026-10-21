import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import MobileHeader from "../components/MobileHeader";
import MobileSidebar from "../components/MobileSidebar";

const formatToday = () =>
  new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date());

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col bg-(--color-background)">
      <MobileHeader onMenuOpen={() => setIsMobileMenuOpen(true)} />

      {isMobileMenuOpen && (
        <MobileSidebar onClose={() => setIsMobileMenuOpen(false)} />
      )}

      <div className="flex min-h-0 flex-1">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 hidden border-b border-(--color-border)] bg-[var(--color-background)/95 px-8 py-4 backdrop-blur xl:block">
            <div className="mx-auto flex w-full max-w-[1600px] items-center justify-end">
              <div className="flex shrink-0 items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-(--color-text-muted)">
                  <CalendarDays
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <span>{formatToday()}</span>
                </div>

                <div className="h-7 w-px bg-(--color-border)" />

                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-(--color-primary-soft) text-sm font-semibold text-(--color-primary)">
                    LH
                  </div>

                  <div>
                    <p className="text-sm font-medium text-(--color-text)">
                      LocalHost
                    </p>

                    <p className="text-xs text-(--color-text-muted)">
                      Property workspace
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="min-w-0 px-4 py-5 sm:px-6 sm:py-6 xl:px-8 xl:py-7">
            <div className="mx-auto w-full max-w-[1600px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
