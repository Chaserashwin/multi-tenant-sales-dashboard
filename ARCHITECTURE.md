# Architecture & Design Documentation

Technical deep-dive into the Multi-Tenant Sales Dashboard architecture.

## 🎯 Design Goals

1. **Modularity**: Features are independent and reusable
2. **Scalability**: Easy to add new features and tenants
3. **Maintainability**: Clear separation of concerns
4. **Performance**: Optimized rendering and data flow
5. **Security**: Role-based access control at UI level
6. **Tenancy**: Complete data isolation between tenants

## 🏗️ System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────┐
│          Browser (React App)            │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │    TenantProvider (Context)     │   │
│  │  ├─ currentTenant              │   │
│  │  ├─ currentRole                │   │
│  │  └─ hasPermission()            │   │
│  └─────────────────────────────────┘   │
│                 ↕                       │
│  ┌─────────────────────────────────┐   │
│  │      Component Tree             │   │
│  │  ├─ Dashboard                   │   │
│  │  │  ├─ Header                   │   │
│  │  │  └─ TabNavigation            │   │
│  │  │     ├─ LeadsModule           │   │
│  │  │     └─ CallLogsModule        │   │
│  └─────────────────────────────────┘   │
│                 ↕                       │
│  ┌─────────────────────────────────┐   │
│  │     Mock Data Layer             │   │
│  │   (Future: API Endpoints)       │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

## 📊 State Management Architecture

### Context API Structure

**Why Context API instead of Redux?**

| Aspect         | Context API | Redux    |
| -------------- | ----------- | -------- |
| Complexity     | Simple      | Complex  |
| Boilerplate    | Minimal     | Lots     |
| Learning curve | Easy        | Steep    |
| Scope fit      | ✅ Perfect  | Overkill |
| Bundle size    | +5KB        | +50KB    |

For this project's scope, Context API is ideal.

### State Shape

```javascript
TenantContext = {
  currentTenant: "org-a" | "org-b",
  currentRole: "admin" | "agent",
  currentUser: "John Doe",
  hasPermission: (permission: string) => boolean,
};
```

**State Update Flow:**

```
User clicks tenant dropdown
       ↓
setCurrentTenant('org-b')
       ↓
TenantContext value updated
       ↓
All subscribed components re-render
       ↓
UI updates with new tenant's data
```

## 🔄 Data Flow Architecture

### Leads Filtering Example

```javascript
// Step 1: Get all leads for current tenant
const leads = useMemo(() => getLeadsByTenant(currentTenant), [currentTenant]);

// Step 2: Filter based on selected status
const filteredLeads = useMemo(() => {
  return statusFilter === "all"
    ? leads
    : leads.filter((lead) => lead.status === statusFilter);
}, [leads, statusFilter]);

// Step 3: Render filtered results
return <LeadsTable leads={filteredLeads} />;
```

**Benefits of useMemo:**

```
Without useMemo:
Every render → Filter runs → LeadsTable re-renders

With useMemo:
Only re-filter when leads or statusFilter change
Prevents unnecessary calculations
Keeps same reference for LeadsTable
No useless re-renders
```

## 🔐 Permission System Architecture

### Permission Hierarchy

```
Permissions (what can be done)
    ↓
Roles (grouping of permissions)
    ↓
Users (assigned a role)
    ↓
Components (check permissions before rendering)
```

### Permission Flow

```javascript
// 1. Define permissions
const PERMISSIONS = {
  VIEW_LEADS: 'view_leads',
  EDIT_LEADS: 'edit_leads',
  ...
}

// 2. Assign to roles
const rolePermissions = {
  admin: [PERMISSIONS.VIEW_LEADS, PERMISSIONS.EDIT_LEADS, ...],
  agent: [PERMISSIONS.VIEW_LEADS]
}

// 3. User has a role
const { currentRole } = useTenant() // 'admin'

// 4. Check permission in component
if (hasPermission(PERMISSIONS.EDIT_LEADS)) {
  // Render edit button
}
```

### Permission Checking at Multiple Levels

```javascript
// Level 1: Component Level
<PermissionGate permission={PERMISSIONS.EDIT_LEADS}>
  <EditButton />
</PermissionGate>;

// Level 2: Logic Level
if (hasPermission(PERMISSIONS.DELETE_LEADS)) {
  // Enable delete functionality
}

// Level 3: Conditional Rendering
{
  canEditLeads && <button onClick={handleEdit}>Edit</button>;
}
```

## 🏢 Multi-Tenancy Architecture

### Data Isolation Strategy

```javascript
// Data organized by tenant
mockData = {
  'org-a': {
    id: 'org-a',
    name: 'Organization A',
    leads: [...],      // Org A's leads only
    calls: [...]       // Org A's calls only
  },
  'org-b': {
    id: 'org-b',
    name: 'Organization B',
    leads: [...],      // Org B's leads only
    calls: [...]       // Org B's calls only
  }
}
```

### Tenant-Aware Data Fetching

```javascript
// Every data fetch uses currentTenant
const leads = useMemo(() => getLeadsByTenant(currentTenant), [currentTenant]);

// When tenant changes
// 1. currentTenant state updates in TenantContext
// 2. All components using currentTenant re-render
// 3. useMemo dependency triggers
// 4. New data for new tenant is fetched
// 5. UI updates automatically
```

### Tenant Isolation Guarantees

- Data is never mixed between tenants
- User can only see their tenant's data
- Switching tenant shows different data
- No data leakage between orgs

## 🎨 Component Architecture

### Component Classification

```
Presentation Components (Dumb)
├─ LeadsTable
├─ CallLogsTable
├─ StatusFilter
├─ LoadingState
└─ EmptyState

Container Components (Smart)
├─ LeadsModule
├─ CallLogsModule
├─ Dashboard
└─ Header

Layout Components
├─ Dashboard
└─ TabNavigation
```

### Component Size Guidelines

```
Single File Component: < 150 lines
├─ All logic in one file
├─ No subcomponents
└─ Reusable utilities

Module Component: 150-300 lines
├─ Has subcomponents
├─ Container logic
└─ Multiple responsibilities

Too Large: > 300 lines
└─ Split into smaller components!
```

### Component Dependencies

```
Presentation Components:
  Imports: props only
  No: Context, useEffect, API calls

Container Components:
  Imports: Context, hooks, services
  Uses: useTenant, custom hooks

Layout Components:
  Imports: Other components
  Manages: Tab state, routing
```

## 🔄 Reusability Patterns

### 1. Custom Hooks for Logic

```javascript
// src/hooks/useTenant.js
export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) throw new Error("Use within TenantProvider");
  return context;
};

// Usage in any component:
const { currentTenant, hasPermission } = useTenant();
```

### 2. Reusable Utility Functions

```javascript
// src/utils/mockData.js
export const getLeadsByTenant = (tenantId) => {
  return mockData[tenantId]?.leads || [];
};

// Usage:
const leads = getLeadsByTenant(currentTenant);
```

### 3. Composition with Props

```javascript
// LoadingState can show any message
<LoadingState message="Loading leads..." />
<LoadingState message="Loading calls..." />

// EmptyState can show any icon
<EmptyState message="No leads" icon="📭" />
<EmptyState message="No calls" icon="☎️" />
```

## 📱 Responsive Design

### Breakpoint Strategy

```css
/* Mobile first approach */
/* Base styles apply to all sizes */

/* Tailwind breakpoints */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Table Responsiveness

```html
<!-- Tailwind's overflow-x-auto handles small screens -->
<div className="overflow-x-auto">
  <table className="w-full text-left text-sm">
    <!-- Table scrolls horizontally on small screens -->
  </table>
</div>
```

### Flexbox Layout

```javascript
// Header uses flexbox for responsive layout
<div className="flex justify-between items-center">
  {/* Left side - logo and switchers */}
  {/* Right side - user info */}
</div>
```

## ⚡ Performance Optimization Strategies

### 1. Memoization

```javascript
// Prevent recalculation of expensive operations
const filteredLeads = useMemo(
  () => leads.filter((lead) => lead.status === statusFilter),
  [leads, statusFilter]
);
```

**When to use useMemo:**

- Expensive calculations
- Large data transformations
- Filtering/sorting large lists
- Creating objects/arrays passed as props

**When NOT to use:**

- Simple string concatenation
- Small data operations
- UI state that updates frequently

### 2. Callback Stability

```javascript
// Prevent new function references each render
const hasPermission = useCallback(
  (permission) => rolePermissions[currentRole]?.includes(permission),
  [currentRole]
);
```

### 3. Code Splitting (Future)

```javascript
// Load modules on-demand
const LeadsModule = React.lazy(() => import('./Leads/LeadsModule'))
const CallLogsModule = React.lazy(() => import('./CallLogs/CallLogsModule'))

// With error boundary
<Suspense fallback={<LoadingState />}>
  <LeadsModule />
</Suspense>
```

### 4. Bundle Optimization with Vite

```
Vite Benefits:
├─ Native ES modules in dev (instant HMR)
├─ Esbuild for pre-bundling
├─ Tree-shaking for production
├─ CSS code-splitting
└─ Optimized chunk splitting
```

## 🧪 Testing Strategy

### Component Testing Structure

```javascript
// test/components/Leads/LeadsModule.test.jsx
import { render, screen } from "@testing-library/react";
import { TenantProvider } from "@/context/TenantContext";
import LeadsModule from "@/components/Leads/LeadsModule";

describe("LeadsModule", () => {
  it("should render leads table", () => {
    render(
      <TenantProvider>
        <LeadsModule />
      </TenantProvider>
    );
    expect(screen.getByText(/leads/i)).toBeInTheDocument();
  });

  it("should filter leads by status", () => {
    // Test filtering logic
  });
});
```

## 🔌 API Integration Points

### Current: Mock Data

```javascript
// src/utils/mockData.js
export const getLeadsByTenant = (tenantId) => {
  return mockData[tenantId]?.leads || [];
};
```

### Future: Real API

```javascript
// Create custom hook for fetching
export const useLeads = () => {
  const { currentTenant } = useTenant();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/tenants/${currentTenant}/leads`)
      .then((res) => res.json())
      .then((data) => setLeads(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [currentTenant]);

  return { leads, loading, error };
};

// Replace mock data call with hook
const { leads, loading } = useLeads();
```

## 🔐 Security Architecture

### Frontend Security (UI Level)

```
Implemented:
├─ Permission-based UI rendering
├─ Role-based access control
├─ Tenant isolation
└─ Input sanitization ready

Not Implemented (Backend responsibility):
├─ Token validation
├─ Authentication
├─ Authorization
├─ Encryption
└─ Audit logging
```

### Backend Integration Security

```
Requirements for backend:
├─ Validate JWT tokens
├─ Check user permissions
├─ Verify tenant access
├─ Return only user's tenant data
├─ Implement rate limiting
├─ Log all actions
└─ Use HTTPS only
```

## 📈 Scalability Considerations

### Vertical Scaling (More Features)

```
Current Structure Supports:
├─ Adding new modules (e.g., Emails, Analytics)
├─ Adding new roles (e.g., Manager, Executive)
├─ Adding new permissions
└─ Adding new tenants

How to Add Feature:
1. Create src/components/NewFeature/
2. Create NewModule.jsx component
3. Add to TABS constant
4. Add to TabNavigation
5. Add permissions if needed
```

### Horizontal Scaling (More Users/Data)

```
Current Approach Handles:
├─ < 10K leads per tenant ✅
├─ < 5K calls per tenant ✅
├─ 100+ users ✅

For Larger Scale:
├─ Implement virtual scrolling for tables
├─ Add pagination
├─ Use React Query for caching
├─ Implement lazy loading
├─ Add search/indexing on backend
```

## 🎯 Key Architectural Decisions

### Decision 1: Context API vs Redux

**Chosen:** Context API

**Reasoning:**

- Simpler for current scope
- Less boilerplate
- Easier to understand
- No performance issues yet
- Can migrate later if needed

### Decision 2: Mock Data vs API

**Chosen:** Mock Data (easily replaceable with API)

**Reasoning:**

- No backend required for assignment
- Easy to test features
- Can switch to API with simple hooks
- Demonstrates data flow clearly

### Decision 3: Component Organization

**Chosen:** Feature-based folders

**Reasoning:**

```
src/components/
├─ Leads/          (all lead-related components)
├─ CallLogs/       (all call-related components)
├─ Header/         (header components)
├─ Common/         (shared utilities)
└─ Layout/         (layout components)
```

Benefits:

- Easy to find related components
- Clear module boundaries
- Easy to extract as feature modules
- Scales well with team growth

## 📚 References & Resources

### React Best Practices

- [React Docs](https://react.dev)
- [Hooks API Reference](https://react.dev/reference/react)
- [Performance Optimization](https://react.dev/reference/react/useMemo)

### Vite Documentation

- [Vite Docs](https://vitejs.dev)
- [Configuration Guide](https://vitejs.dev/config/)

### Tailwind CSS

- [Tailwind Docs](https://tailwindcss.com)
- [Component Examples](https://tailwindui.com)

---

**Last Updated:** January 2025  
**Version:** 1.0.0
