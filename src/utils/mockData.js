/**
 * Mock data for multi-tenant application
 * Each tenant has isolated leads and calls data
 */
export const mockData = {
  "org-a": {
    id: "org-a",
    name: "Organization A",
    leads: [
      {
        id: 1,
        name: "John Smith",
        phone: "+1-234-567-8900",
        status: "contacted",
        created: "2025-01-15",
        email: "john.smith@example.com",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        phone: "+1-234-567-8901",
        status: "qualified",
        created: "2025-01-14",
        email: "sarah.johnson@example.com",
      },
      {
        id: 3,
        name: "Mike Wilson",
        phone: "+1-234-567-8902",
        status: "new",
        created: "2025-01-10",
        email: "mike.wilson@example.com",
      },
      {
        id: 4,
        name: "Emily Brown",
        phone: "+1-234-567-8903",
        status: "contacted",
        created: "2025-01-12",
        email: "emily.brown@example.com",
      },
      {
        id: 5,
        name: "David Lee",
        phone: "+1-234-567-8904",
        status: "qualified",
        created: "2025-01-09",
        email: "david.lee@example.com",
      },
    ],
    calls: [
      {
        id: 1,
        leadId: 1,
        leadName: "John Smith",
        dateTime: "2025-01-15 10:30",
        duration: "15 mins",
        outcome: "interested",
        notes: "Client expressed interest in demo",
      },
      {
        id: 2,
        leadId: 2,
        leadName: "Sarah Johnson",
        dateTime: "2025-01-14 14:45",
        duration: "8 mins",
        outcome: "not-interested",
        notes: "Not interested at this time",
      },
      {
        id: 3,
        leadId: 3,
        leadName: "Mike Wilson",
        dateTime: "2025-01-10 09:15",
        duration: "12 mins",
        outcome: "callback",
        notes: "Will call back next week",
      },
      {
        id: 4,
        leadId: 4,
        leadName: "Emily Brown",
        dateTime: "2025-01-13 11:45",
        duration: "20 mins",
        outcome: "interested",
        notes: "Ready for next steps",
      },
    ],
  },
  "org-b": {
    id: "org-b",
    name: "Organization B",
    leads: [
      {
        id: 6,
        name: "Alex Kumar",
        phone: "+91-9876-543-210",
        status: "new",
        created: "2025-01-16",
        email: "alex.kumar@example.com",
      },
      {
        id: 7,
        name: "Priya Sharma",
        phone: "+91-9876-543-211",
        status: "qualified",
        created: "2025-01-13",
        email: "priya.sharma@example.com",
      },
      {
        id: 8,
        name: "Rajesh Patel",
        phone: "+91-9876-543-212",
        status: "contacted",
        created: "2025-01-11",
        email: "rajesh.patel@example.com",
      },
      {
        id: 9,
        name: "Anita Desai",
        phone: "+91-9876-543-213",
        status: "new",
        created: "2025-01-08",
        email: "anita.desai@example.com",
      },
    ],
    calls: [
      {
        id: 5,
        leadId: 6,
        leadName: "Alex Kumar",
        dateTime: "2025-01-16 11:00",
        duration: "20 mins",
        outcome: "interested",
        notes: "Very interested in enterprise plan",
      },
      {
        id: 6,
        leadId: 7,
        leadName: "Priya Sharma",
        dateTime: "2025-01-13 15:30",
        duration: "10 mins",
        outcome: "interested",
        notes: "Asked for pricing details",
      },
      {
        id: 7,
        leadId: 8,
        leadName: "Rajesh Patel",
        dateTime: "2025-01-12 10:00",
        duration: "18 mins",
        outcome: "callback",
        notes: "Schedule follow-up call",
      },
    ],
  },
};

/**
 * Get all tenants
 */
export const getTenants = () => [
  { id: "org-a", name: "Organization A" },
  { id: "org-b", name: "Organization B" },
];

/**
 * Get leads for a specific tenant
 */
export const getLeadsByTenant = (tenantId) => {
  return mockData[tenantId]?.leads || [];
};

/**
 * Get calls for a specific tenant
 */
export const getCallsByTenant = (tenantId) => {
  return mockData[tenantId]?.calls || [];
};

/**
 * Get tenant info by ID
 */
export const getTenantById = (tenantId) => {
  const tenant = mockData[tenantId];
  return tenant ? { id: tenant.id, name: tenant.name } : null;
};
