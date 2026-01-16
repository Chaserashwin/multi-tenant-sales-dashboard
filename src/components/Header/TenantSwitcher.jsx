import React, { useState } from "react";
import { useTenant } from "../../hooks/useTenant";
import { getTenants, getTenantById } from "../../utils/mockData";
import { ChevronDown } from "lucide-react";

/**
 * Tenant switcher dropdown component
 * Allows users to switch between different organizations/tenants
 */
const TenantSwitcher = () => {
  const { currentTenant, setCurrentTenant } = useTenant();
  const [showDropdown, setShowDropdown] = useState(false);
  const tenants = getTenants();
  const currentTenantInfo = getTenantById(currentTenant);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-blue-700 hover:bg-blue-900 px-4 py-2 rounded-lg flex items-center gap-2 transition text-sm font-medium"
        aria-label="Switch tenant"
      >
        🏢 {currentTenantInfo?.name}
        <ChevronDown size={16} />
      </button>

      {showDropdown && (
        <div className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-xl z-10 min-w-max">
          {tenants.map((tenant) => (
            <button
              key={tenant.id}
              onClick={() => {
                setCurrentTenant(tenant.id);
                setShowDropdown(false);
              }}
              className={`block w-full text-left px-4 py-2 hover:bg-blue-100 transition ${
                currentTenant === tenant.id ? "bg-blue-200 font-bold" : ""
              }`}
            >
              {tenant.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TenantSwitcher;
