import React from "react";
import { useTenant } from "../../hooks/useTenant";
import { LEAD_STATUS_COLORS } from "../../utils/constants";
import { PERMISSIONS } from "../../utils/permissions";

/**
 * Leads table component
 * Displays leads in a responsive table format
 */
const LeadsTable = ({ leads }) => {
  const { hasPermission } = useTenant();
  const canEditLeads = hasPermission(PERMISSIONS.EDIT_LEADS);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100 border-b-2 border-gray-300">
          <tr>
            <th className="px-6 py-3 font-semibold text-gray-700">Name</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Email</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Phone</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Status</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Created</th>
            {canEditLeads && (
              <th className="px-6 py-3 font-semibold text-gray-700">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const statusColor = LEAD_STATUS_COLORS[lead.status];
            return (
              <tr
                key={lead.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-3 font-medium text-gray-900">
                  {lead.name}
                </td>
                <td className="px-6 py-3 text-gray-600 text-xs">
                  {lead.email}
                </td>
                <td className="px-6 py-3 text-gray-600">{lead.phone}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor.bg} ${statusColor.text}`}
                  >
                    {statusColor.label}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-600">{lead.created}</td>
                {canEditLeads && (
                  <td className="px-6 py-3">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      Edit
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
