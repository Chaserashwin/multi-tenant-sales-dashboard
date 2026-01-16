import { useContext } from "react";
import { TenantContext } from "../context/TenantContext";

/**
 * Custom hook to access tenant context
 * @throws {Error} If used outside TenantProvider
 * @returns {Object} Tenant context value
 */
export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within TenantProvider");
  }
  return context;
};
