import React from "react";
import { CALL_OUTCOME_COLORS } from "../../utils/constants";

/**
 * Call logs table component
 * Displays calls in a responsive table format with outcomes
 */
const CallLogsTable = ({ calls }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100 border-b-2 border-gray-300">
          <tr>
            <th className="px-6 py-3 font-semibold text-gray-700">Lead Name</th>
            <th className="px-6 py-3 font-semibold text-gray-700">
              Date & Time
            </th>
            <th className="px-6 py-3 font-semibold text-gray-700">Duration</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Outcome</th>
            <th className="px-6 py-3 font-semibold text-gray-700">Notes</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((call) => {
            const outcomeColor = CALL_OUTCOME_COLORS[call.outcome];
            return (
              <tr
                key={call.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-3 font-medium text-gray-900">
                  {call.leadName}
                </td>
                <td className="px-6 py-3 text-gray-600">{call.dateTime}</td>
                <td className="px-6 py-3 text-gray-600">{call.duration}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${outcomeColor.bg} ${outcomeColor.text}`}
                  >
                    {outcomeColor.label}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-600 text-xs">
                  {call.notes || "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CallLogsTable;
