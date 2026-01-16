import React from "react";
import { LEAD_STATUS, LEAD_STATUS_COLORS } from "../../utils/constants";
import { Filter } from "lucide-react";

/**
 * Status filter component for leads
 * @param {string} value - Currently selected filter value
 * @param {Function} onChange - Callback when filter changes
 */
const StatusFilter = ({ value, onChange }) => {
  const statuses = [
    { value: "all", label: "All Status" },
    { value: LEAD_STATUS.NEW, label: "New" },
    { value: LEAD_STATUS.CONTACTED, label: "Contacted" },
    { value: LEAD_STATUS.QUALIFIED, label: "Qualified" },
  ];

  return (
    <div className="flex items-center gap-4">
      <Filter size={20} className="text-gray-600" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        aria-label="Filter leads by status"
      >
        {statuses.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusFilter;
