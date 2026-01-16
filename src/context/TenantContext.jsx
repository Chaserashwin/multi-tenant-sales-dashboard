import React, { useState, useCallback } from "react";
import { rolePermissions } from "../utils/permissions";

export const TenantContext = React.createContext();

export const TenantProvider = ({ children }) => {
  const [currentTenant, setCurrentTenant] = useState("org-a");
  const [currentRole, setCurrentRole] = useState("admin");
  const [currentUser] = useState("John Doe");

  /**
   * Check if current user has a specific permission
   * @param {string} permission - Permission to check (e.g., 'view_leads', 'edit_leads')
   * @returns {boolean} True if user has permission
   */
  const hasPermission = useCallback(
    (permission) => {
      return rolePermissions[currentRole]?.includes(permission) || false;
    },
    [currentRole]
  );

  const value = {
    currentTenant,
    setCurrentTenant,
    currentRole,
    setCurrentRole,
    currentUser,
    hasPermission,
  };

  return (
    <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
  );
};
