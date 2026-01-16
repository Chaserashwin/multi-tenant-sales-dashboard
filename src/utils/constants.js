/**
 * Application-wide constants
 */

export const APP_CONFIG = {
  name: "SalesPyper",
  version: "1.0.0",
  description: "Multi-Tenant Sales Dashboard",
};

export const LEAD_STATUS = {
  NEW: "new",
  CONTACTED: "contacted",
  QUALIFIED: "qualified",
  CONVERTED: "converted",
  LOST: "lost",
};

export const LEAD_STATUS_COLORS = {
  new: { bg: "bg-yellow-100", text: "text-yellow-800", label: "New" },
  contacted: { bg: "bg-blue-100", text: "text-blue-800", label: "Contacted" },
  qualified: { bg: "bg-green-100", text: "text-green-800", label: "Qualified" },
  converted: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    label: "Converted",
  },
  lost: { bg: "bg-red-100", text: "text-red-800", label: "Lost" },
};

export const CALL_OUTCOME = {
  INTERESTED: "interested",
  NOT_INTERESTED: "not-interested",
  CALLBACK: "callback",
  NO_ANSWER: "no-answer",
};

export const CALL_OUTCOME_COLORS = {
  interested: {
    bg: "bg-green-100",
    text: "text-green-800",
    label: "Interested",
  },
  "not-interested": {
    bg: "bg-red-100",
    text: "text-red-800",
    label: "Not Interested",
  },
  callback: { bg: "bg-orange-100", text: "text-orange-800", label: "Callback" },
  "no-answer": { bg: "bg-gray-100", text: "text-gray-800", label: "No Answer" },
};

export const TABS = {
  LEADS: "leads",
  CALLS: "calls",
};
