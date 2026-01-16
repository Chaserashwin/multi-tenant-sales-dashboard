import React, { useMemo } from "react";
import { useTenant } from "../../hooks/useTenant";
import { getCallsByTenant } from "../../utils/mockData";
import { PERMISSIONS } from "../../utils/permissions";
import CallLogsTable from "./CallLogsTable";
import LoadingState from "../Common/LoadingState";
import EmptyState from "../Common/EmptyState";
import PermissionGate from "../Common/PermissionGate";
import { Phone } from "lucide-react";

/**
 * Call logs module component
 * Displays call history with outcomes and duration
 */
const CallLogsModule = ({ isLoading = false }) => {
  const { currentTenant, hasPermission } = useTenant();

  const calls = useMemo(() => getCallsByTenant(currentTenant), [currentTenant]);

  if (!hasPermission(PERMISSIONS.VIEW_CALLS)) {
    return (
      <PermissionGate
        permission={PERMISSIONS.VIEW_CALLS}
        fallback="❌ Access Denied: You don't have permission to view call logs."
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Phone size={28} className="text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Call Logs</h2>
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingState message="Loading call logs..." />
      ) : calls.length === 0 ? (
        <EmptyState message="No call logs available." icon="☎️" />
      ) : (
        <CallLogsTable calls={calls} />
      )}
    </div>
  );
};

export default CallLogsModule;
