import React, { useState } from "react";
import { useTenant } from "../../hooks/useTenant";
import { ROLES } from "../../utils/permissions";
import { ChevronDown } from "lucide-react";

/**
 * Role switcher dropdown component
 * Allows testing different user roles (admin, agent)
 */
const RoleSwitcher = () => {
  const { currentRole, setCurrentRole } = useTenant();
  const [showDropdown, setShowDropdown] = useState(false);

  const roles = [
    { id: ROLES.ADMIN, label: "Admin", icon: "👨‍💼" },
    { id: ROLES.AGENT, label: "Agent", icon: "👤" },
  ];

  const currentRoleLabel =
    roles.find((r) => r.id === currentRole)?.label || "Unknown";

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-blue-700 hover:bg-blue-900 px-4 py-2 rounded-lg flex items-center gap-2 transition text-sm font-medium"
        aria-label="Switch role"
      >
        🔐 Role: {currentRoleLabel}
        <ChevronDown size={16} />
      </button>

      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-xl z-10 min-w-max">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => {
                setCurrentRole(role.id);
                setShowDropdown(false);
              }}
              className={`block w-full text-left px-4 py-2 hover:bg-blue-100 transition ${
                currentRole === role.id ? "bg-blue-200 font-bold" : ""
              }`}
            >
              {role.icon} {role.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoleSwitcher;
