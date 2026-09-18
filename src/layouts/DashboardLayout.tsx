import { useState } from "react";
import {
  Outlet,
  useLocation,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";
import MobileHeader from "../components/MobileHeader";
import MobileSidebar from "../components/MobileSidebar";

import { navItems } from "../config/navigation";

const DashboardLayout = () => {
  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  ] = useState(false);

  const location = useLocation();

  const currentPage =
    navItems.find(
      (item) =>
        location.pathname === item.path,
    )?.label ?? "LocalHost";

  return (
    <div className="flex min-h-dvh flex-col bg-[#f5f4ef]">
      <MobileHeader
        onMenuOpen={() =>
          setIsMobileMenuOpen(true)
        }
      />

      {isMobileMenuOpen && (
        <MobileSidebar
          onClose={() =>
            setIsMobileMenuOpen(false)
          }
        />
      )}

      <div className="flex min-h-0 flex-1">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 hidden border-b border-[#e7e5df] bg-[#f5f4ef]/95 px-8 py-4 backdrop-blur xl:flex xl:items-center xl:justify-between">
            <div>
              <p className="text-xs font-medium text-[#5b7e72]">
                LocalHost workspace
              </p>

              <h2 className="mt-0.5 text-xl font-semibold tracking-tight text-gray-900">
                {currentPage}
              </h2>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-black/5">
              <span className="size-2 rounded-full bg-[#5f8b7a]" />

              <span className="text-xs font-medium text-gray-600">
                Property operations
              </span>
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