# Quick Reference Guide

Fast lookup for common tasks and patterns.

## 🚀 Quick Start

```bash
# 1. Install
npm install

# 2. Start
npm run dev

# 3. Build
npm run build

# App opens at http://localhost:3000
```

## 📂 Find What You Need

### "I want to..."

#### ...view the app

→ `npm run dev`

#### ...modify lead data

→ `src/utils/mockData.js` - Edit `'org-a'` or `'org-b'` leads array

#### ...add new permission

→ `src/utils/permissions.js` - Add to `rolePermissions` or `PERMISSIONS`

#### ...change colors

→ `tailwind.config.js` - Modify theme colors

#### ...create new component

1. Create folder: `src/components/MyFeature/`
2. Create `src/components/MyFeature/MyComponent.jsx`
3. Import `useTenant` from `src/hooks/useTenant`
4. Use `hasPermission()` for access control

#### ...understand state management

→ `src/context/TenantContext.jsx` - See how state flows

#### ...add new role

→ `src/utils/permissions.js` - Add role to `rolePermissions` object

#### ...modify table layout

→ `src/components/Leads/LeadsTable.jsx` or `src/components/CallLogs/CallLogsTable.jsx`

#### ...check permissions

→ `src/components/Common/PermissionGate.jsx` - How permission checking works

#### ...see all mock data

→ `src/utils/mockData.js` - All tenant data defined here

#### ...customize styling

→ `src/styles/globals.css` - Global styles
→ Component files - Tailwind classes

## 🔍 Common Patterns

### Using Tenant Context

```javascript
import { useTenant } from "@/hooks/useTenant";

function MyComponent() {
  const { currentTenant, currentRole, hasPermission } = useTenant();

  if (!hasPermission("view_leads")) {
    return <div>Access Denied</div>;
  }

  return <div>Current tenant: {currentTenant}</div>;
}
```

### Permission Checking

```javascript
// Check permission
if (hasPermission("edit_leads")) {
  // Show edit button
}

// Conditional rendering
{
  canEditLeads && <EditButton />;
}

// Permission gate
<PermissionGate permission="edit_leads">
  <EditButton />
</PermissionGate>;
```

### Filtering Data

```javascript
const filteredLeads = useMemo(() => {
  return statusFilter === "all"
    ? leads
    : leads.filter((lead) => lead.status === statusFilter);
}, [leads, statusFilter]);
```

### Loading & Empty States

```javascript
// Loading
{
  isLoading && <LoadingState message="Loading..." />;
}

// Empty
{
  leads.length === 0 && <EmptyState message="No leads found" />;
}

// Data
{
  leads && <LeadsTable leads={leads} />;
}
```

## 📝 Code Templates

### New Component Template

```javascript
import React from "react";
import { useTenant } from "../../hooks/useTenant";

/**
 * Component description
 */
const MyComponent = () => {
  const { hasPermission } = useTenant();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Title</h2>
      {/* Content */}
    </div>
  );
};

export default MyComponent;
```

### New Utility Function Template

```javascript
/**
 * Function description
 * @param {type} param - Parameter description
 * @returns {type} Return description
 */
export const myFunction = (param) => {
  return result;
};
```

### New Context Hook Template

```javascript
import { useContext } from "react";
import { MyContext } from "../context/MyContext";

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within MyProvider");
  }
  return context;
};
```

## 🎨 Styling Cheatsheet

### Common Tailwind Classes

```html
<!-- Spacing -->
<div className="p-6">
  <!-- padding -->
  <div className="m-4">
    <!-- margin -->
    <div className="gap-4">
      <!-- gap in flex -->

      <!-- Colors -->
      <div className="bg-blue-600">
        <!-- background -->
        <div className="text-white">
          <!-- text color -->
          <div className="border-gray-300">
            <!-- border -->

            <!-- Layout -->
            <div className="flex">
              <!-- flexbox -->
              <div className="justify-between">
                <!-- space between -->
                <div className="items-center">
                  <!-- center vertically -->
                  <div className="w-full">
                    <!-- full width -->

                    <!-- Text -->
                    <div className="text-xl">
                      <!-- font size -->
                      <div className="font-bold">
                        <!-- font weight -->
                        <div className="text-center">
                          <!-- text alignment -->

                          <!-- Interactions -->
                          <button className="hover:bg-blue-700">
                            <!-- hover -->
                            <div className="transition">
                              <!-- smooth transition -->
                              <div className="cursor-pointer">
                                <!-- pointer cursor -->
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Status Colors

```javascript
// From LEAD_STATUS_COLORS constant
new: 'bg-yellow-100 text-yellow-800'
contacted: 'bg-blue-100 text-blue-800'
qualified: 'bg-green-100 text-green-800'

// From CALL_OUTCOME_COLORS constant
interested: 'bg-green-100 text-green-800'
'not-interested': 'bg-red-100 text-red-800'
callback: 'bg-orange-100 text-orange-800'
```

## 🧩 Component Import Patterns

```javascript
// Common imports
import React from "react";
import { useState, useMemo, useCallback } from "react";
import { ChevronDown, Filter, Plus } from "lucide-react";

// Custom imports
import { useTenant } from "../../hooks/useTenant";
import { getLeadsByTenant } from "../../utils/mockData";
import { PERMISSIONS } from "../../utils/permissions";
import { LEAD_STATUS_COLORS } from "../../utils/constants";

// Components
import LoadingState from "../Common/LoadingState";
import EmptyState from "../Common/EmptyState";
import PermissionGate from "../Common/PermissionGate";
```

## 🔑 Key Constant Values

### Tenants

```javascript
"org-a"; // Organization A
"org-b"; // Organization B
```

### Roles

```javascript
"admin"; // Full access
"agent"; // Limited access
```

### Permissions

```javascript
"view_leads";
"edit_leads";
"create_leads";
"view_calls";
"view_settings";
"access_all_features";
```

### Lead Status

```javascript
"new";
"contacted";
"qualified";
```

### Call Outcomes

```javascript
"interested";
"not-interested";
"callback";
"no-answer";
```

### Tabs

```javascript
"leads"; // Leads tab
"calls"; // Call logs tab
```

## 🧪 Testing Checklist

### Test Tenant Switching

- [ ] Click tenant dropdown
- [ ] Select different org
- [ ] Leads change
- [ ] Calls change
- [ ] Switch back

### Test Role Switching

- [ ] Admin role - see all buttons
- [ ] Agent role - see fewer buttons
- [ ] Leads table changes
- [ ] Switch between roles

### Test Filtering

- [ ] Click filter dropdown
- [ ] Select status
- [ ] Table updates
- [ ] Lead count updates
- [ ] Select "All" - shows all

### Test Permissions

- [ ] Admin sees "Add Lead"
- [ ] Agent doesn't see "Add Lead"
- [ ] Admin sees edit buttons
- [ ] Agent doesn't see edit buttons
- [ ] Access denied message appears

### Test Data Display

- [ ] Leads table shows data
- [ ] Calls table shows data
- [ ] Status badges show
- [ ] Icons display
- [ ] Empty states show when needed

## 🐛 Debug Tips

### Check Context

```javascript
// In browser console
localStorage.setItem("debug", "true");
// Add debug logs in components
console.log("currentTenant:", currentTenant);
console.log("hasPermission:", hasPermission("edit_leads"));
```

### Check Data

```javascript
// View mock data structure
import { mockData } from "@/utils/mockData";
console.log(mockData);
```

### Check Rendering

```javascript
// Enable React profiling
// DevTools → React tab → Settings → Highlight updates
```

### Check Network

```javascript
// DevTools → Network tab
// Check API calls (when integrated)
```

## 📊 File Locations Quick Map

```
Root config:
├─ package.json
├─ vite.config.js
├─ tailwind.config.js

Components:
├─ src/components/Header/
├─ src/components/Leads/
├─ src/components/CallLogs/
├─ src/components/Common/
└─ src/components/Layout/

Logic:
├─ src/context/
├─ src/hooks/
└─ src/utils/

Styling:
└─ src/styles/

Docs:
├─ README.md
├─ SETUP.md
├─ ARCHITECTURE.md
└─ QUICK_REFERENCE.md (this file)
```

## 🚨 Common Errors & Fixes

| Error                                          | Solution                                                                 |
| ---------------------------------------------- | ------------------------------------------------------------------------ |
| "useTenant must be used within TenantProvider" | Wrap component with `<TenantProvider>`                                   |
| Port 3000 already in use                       | Kill process: `lsof -i :3000 \| awk 'NR!=1 {print $2}' \| xargs kill -9` |
| Styles not working                             | Restart dev server, clear cache                                          |
| Component not showing                          | Check permission, check import path                                      |
| Data not updating                              | Check useMemo dependencies                                               |
| Blank page                                     | Check console for errors                                                 |

## 🔗 Quick Links

### Documentation

- [Full README](./README.md)
- [Setup Guide](./SETUP.md)
- [Architecture Docs](./ARCHITECTURE.md)

### External Resources

- [React Docs](https://react.dev)
- [Tailwind Docs](https://tailwindcss.com)
- [Vite Docs](https://vitejs.dev)
- [Lucide Icons](https://lucide.dev)

## 💡 Pro Tips

### Tip 1: Use React DevTools

Install React DevTools browser extension to inspect components and state.

### Tip 2: Use Tailwind IntelliSense

Install Tailwind CSS IntelliSense VS Code extension for class autocomplete.

### Tip 3: Hot Module Replacement

Edit files and see changes instantly with Vite's HMR.

### Tip 4: Use ESLint

Add ESLint config to catch bugs early.

### Tip 5: Component Naming

Use descriptive names: `LeadsTable` not `Table`, `PermissionGate` not `Gate`

### Tip 6: Keep Components Small

Keep components under 150 lines for readability.

### Tip 7: Use JSDoc Comments

Document function parameters and return types.

### Tip 8: Test Permission Changes

Switch roles frequently to ensure UI updates correctly.

## 📱 Responsive Classes

```javascript
// Hide on mobile
<div className="hidden md:block">Desktop only</div>

// Show on mobile only
<div className="md:hidden">Mobile only</div>

// Responsive padding
<div className="p-4 md:p-6 lg:p-8">Responsive</div>

// Responsive text size
<h1 className="text-xl md:text-2xl lg:text-3xl">Title</h1>
```

## 🎯 Before Submitting

- [ ] Code follows project structure
- [ ] All imports use correct paths
- [ ] No console errors
- [ ] Components render correctly
- [ ] Permissions work as expected
- [ ] Tenant switching works
- [ ] All tabs functional
- [ ] README.md updated (if needed)
- [ ] Comments added for complex logic
- [ ] No commented-out code left

---

**Last Updated:** January 2025  
**For Questions:** See README.md or ARCHITECTURE.md
