import React from "react";

/**
 * Reusable empty state component
 * @param {string} message - Empty state message
 * @param {ReactNode} icon - Icon to display
 */
export const EmptyState = ({ message = "No data available", icon = "📭" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <div className="text-4xl mb-3">{icon}</div>
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
};

export default EmptyState;
