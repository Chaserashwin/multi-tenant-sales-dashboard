/**
 * Role-based permission mapping
 * Each role has an array of permissions it can perform
 */
export const rolePermissions = {
  admin: [
    "view_leads",
    "edit_leads",
    "create_leads",
    "delete_leads",
    "view_calls",
    "view_settings",
    "access_all_features",
  ],
  agent: ["view_leads", "view_calls"],
};

/**
 * Get all available roles
 */
export const ROLES = {
  ADMIN: "admin",
  AGENT: "agent",
};

/**
 * Get all available permissions
 */
export const PERMISSIONS = {
  VIEW_LEADS: "view_leads",
  EDIT_LEADS: "edit_leads",
  CREATE_LEADS: "create_leads",
  DELETE_LEADS: "delete_leads",
  VIEW_CALLS: "view_calls",
  VIEW_SETTINGS: "view_settings",
  ACCESS_ALL_FEATURES: "access_all_features",
};
