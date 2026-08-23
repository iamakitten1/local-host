import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import MobileHeader from "../components/MobileHeader";
import MobileSidebar from "../components/MobileSidebar";

const DashboardLayout = () => {
  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  ] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col bg-gray-50">
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

        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-6 xl:px-8 xl:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;