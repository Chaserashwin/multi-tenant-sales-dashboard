import React, { useState, useMemo } from "react";
import { useTenant } from "../../hooks/useTenant";
import { getLeadsByTenant } from "../../utils/mockData";
import { PERMISSIONS } from "../../utils/permissions";
import LeadsTable from "./LeadsTable";
import StatusFilter from "./StatusFilter";
import LoadingState from "../Common/LoadingState";
import EmptyState from "../Common/EmptyState";
import PermissionGate from "../Common/PermissionGate";
import { Plus } from "lucide-react";

/**
 * Leads module component
 * Displays list of leads with filtering and admin-only edit capabilities
 */
const LeadsModule = ({ isLoading = false }) => {
  const { currentTenant, hasPermission } = useTenant();
  const [statusFilter, setStatusFilter] = useState("all");

  const leads = useMemo(() => getLeadsByTenant(currentTenant), [currentTenant]);

  /**
   * Filter leads by status using useMemo for optimization
   */
  const filteredLeads = useMemo(() => {
    return statusFilter === "all"
      ? leads
      : leads.filter((lead) => lead.status === statusFilter);
  }, [leads, statusFilter]);

  if (!hasPermission(PERMISSIONS.VIEW_LEADS)) {
    return (
      <PermissionGate
        permission={PERMISSIONS.VIEW_LEADS}
        fallback="❌ Access Denied: You don't have permission to view leads."
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📋 Leads</h2>
        <PermissionGate permission={PERMISSIONS.EDIT_LEADS}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition font-medium">
            <Plus size={18} /> Add Lead
          </button>
        </PermissionGate>
      </div>

      {/* Filter section */}
      <div className="mb-6">
        <StatusFilter value={statusFilter} onChange={setStatusFilter} />
        <p className="mt-2 text-sm text-gray-600">
          Showing {filteredLeads.length} of {leads.length} leads
        </p>
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingState message="Loading leads..." />
      ) : filteredLeads.length === 0 ? (
        <EmptyState
          message="No leads found for the selected filter."
          icon="📭"
        />
      ) : (
        <LeadsTable leads={filteredLeads} />
      )}
    </div>
  );
};

export default LeadsModule;
