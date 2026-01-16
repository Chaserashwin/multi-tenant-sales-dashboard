import React, { useState } from "react";
import { useTenant } from "../../hooks/useTenant";
import TenantSwitcher from "./TenantSwitcher";
import RoleSwitcher from "./RoleSwitcher";
import { Settings, LogOut } from "lucide-react";
import { APP_CONFIG } from "../../utils/constants";

/**
 * Main application header component
 * Displays app title, tenant switcher, role switcher, and user info
 */
const Header = () => {
  const { currentUser } = useTenant();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left side - Logo and app name */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold">{APP_CONFIG.name}</div>
            <span className="text-xs bg-blue-700 px-2 py-1 rounded-full">
              v{APP_CONFIG.version}
            </span>
          </div>

          {/* Switchers */}
          <div className="flex gap-4">
            <TenantSwitcher />
            <RoleSwitcher />
          </div>
        </div>

        {/* Right side - User info and actions */}
        <div className="flex items-center gap-4">
          <span className="text-sm">👤 {currentUser}</span>
          <button
            className="hover:bg-blue-700 p-2 rounded transition"
            title="Settings"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
          <button
            className="hover:bg-blue-700 p-2 rounded transition"
            title="Logout"
            aria-label="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
