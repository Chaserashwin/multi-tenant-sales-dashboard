import React from "react";
import { useTenant } from "../../hooks/useTenant";

/**
 * Component wrapper that checks permissions before rendering children
 * @param {string} permission - Permission required to render children
 * @param {ReactNode} children - Content to render if permitted
 * @param {ReactNode} fallback - Content to render if not permitted
 */
export const PermissionGate = ({ permission, children, fallback = null }) => {
  const { hasPermission } = useTenant();

  if (!hasPermission(permission)) {
    return fallback ? (
      <div className="p-6 text-red-600 bg-red-50 rounded-lg border border-red-200">
        {fallback}
      </div>
    ) : null;
  }

  return <>{children}</>;
};

export default PermissionGate;
