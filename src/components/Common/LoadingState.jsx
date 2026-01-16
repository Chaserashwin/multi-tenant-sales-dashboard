import React from "react";

/**
 * Reusable loading state component
 * @param {string} message - Loading message to display
 */
export const LoadingState = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="inline-block">
        <div className="animate-spin text-blue-600 text-4xl">⚙️</div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">{message}</p>
    </div>
  );
};

export default LoadingState;
