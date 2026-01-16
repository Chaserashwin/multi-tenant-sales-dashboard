import React from "react";
import { useTenant } from "../../hooks/useTenant";
import { TABS } from "../../utils/constants";
import { PERMISSIONS } from "../../utils/permissions";

/**
 * Tab navigation component
 * Only shows tabs for features user has permission to access
 */
const TabNavigation = ({ activeTab, setActiveTab }) => {
  const { hasPermission } = useTenant();

  const tabs = [
    {
      id: TABS.LEADS,
      label: "Leads",
      icon: "📋",
      permission: PERMISSIONS.VIEW_LEADS,
    },
    {
      id: TABS.CALLS,
      label: "Call Logs",
      icon: "☎️",
      permission: PERMISSIONS.VIEW_CALLS,
    },
  ];

  return (
    <div className="flex gap-4 border-b border-gray-200 mb-6">
      {tabs.map(
        (tab) =>
          hasPermission(tab.permission) && (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              {tab.icon} {tab.label}
            </button>
          )
      )}
    </div>
  );
};

export default TabNavigation;
