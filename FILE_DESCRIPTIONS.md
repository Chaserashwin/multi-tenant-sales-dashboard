# File Descriptions - What Each File Does

Quick reference for what each file contains and does.

## 🔧 Configuration & Build Files

### package.json

**Purpose:** Project dependencies and npm scripts  
**Edit when:** Adding new packages or changing scripts  
**Key content:**

- Dependencies: React, ReactDOM, Tailwind, Lucide
- Scripts: dev, build, preview
- Version: 0.0.1

### vite.config.js

**Purpose:** Configure Vite build tool  
**Edit when:** Changing port or build settings  
**Key content:**

- Server port: 3000
- React plugin config
- Build optimization settings

### tailwind.config.js

**Purpose:** Configure Tailwind CSS  
**Edit when:** Changing colors, fonts, or extending theme  
**Key content:**

- Content paths for scanning
- Theme extensions
- Color definitions

### postcss.config.js

**Purpose:** Configure CSS post-processing  
**Edit when:** Adding new CSS tools  
**Key content:**

- Tailwind CSS plugin
- Autoprefixer for vendor prefixes

### .env.example

**Purpose:** Template for environment variables  
**Edit when:** Adding new environment configurations  
**Key content:**

- API URL
- App name and version
- Future: API keys, tokens, etc.

### .gitignore

**Purpose:** Tell Git which files to ignore  
**Edit when:** Adding new ignore patterns  
**Key content:**

- node_modules
- dist folder
- .env files
- IDE files

### index.html

**Purpose:** HTML entry point for the app  
**Edit when:** Changing page title or structure  
**Key content:**

- Root div for React
- Script reference to main.jsx
- Meta tags

---

## 📝 React Application Files

### src/main.jsx

**Purpose:** React DOM render entry point  
**What it does:**

- Imports React and ReactDOM
- Imports App component
- Renders App into root div
- Imports global CSS

**Edit when:** Almost never (use App.jsx instead)

### src/App.jsx

**Purpose:** Root React component  
**What it does:**

- Wraps app with TenantProvider
- Returns Dashboard component
- Provides global context to all children

**Edit when:** Adding new providers or global setup

---

## 🎨 Styling

### src/styles/globals.css

**Purpose:** Global styles for entire app  
**What it does:**

- Import Tailwind directives
- Reset browser defaults
- Custom scrollbar styling
- Global animations

**Edit when:** Changing global colors or adding global styles

---

## 🌍 Global State Management

### src/context/TenantContext.jsx

**Purpose:** Global state for tenants and roles  
**What it does:**

- Creates TenantContext
- TenantProvider component wraps app
- Manages currentTenant state
- Manages currentRole state
- Provides hasPermission() function
- Stores currentUser

**How it works:**

```
TenantProvider wraps entire app
  ↓
Provides context value to all children
  ↓
Components use useTenant() hook to access
```

**Edit when:**

- Adding new state (e.g., currentTeam)
- Changing permission logic
- Adding new provider functionality

---

## 🪝 Custom Hooks

### src/hooks/useTenant.js

**Purpose:** Custom hook to access tenant context  
**What it does:**

- Wraps useContext for TenantContext
- Throws error if used outside provider
- Makes context easily accessible

**Usage:**

```javascript
const { currentTenant, hasPermission } = useTenant();
```

**Edit when:** Never (unless adding new hooks)

---

## 🛠️ Utility Files

### src/utils/permissions.js

**Purpose:** Define roles and permissions  
**What it does:**

- Maps roles to permissions
- Defines all available roles
- Defines all available permissions

**Key data:**

- rolePermissions object: { admin: [...], agent: [...] }
- ROLES constant: { ADMIN, AGENT }
- PERMISSIONS constant: { VIEW_LEADS, EDIT_LEADS, ... }

**Edit when:**

- Adding new role
- Adding new permission
- Changing permission mapping

### src/utils/mockData.js

**Purpose:** Mock data for development  
**What it does:**

- Stores leads and calls for both tenants
- Provides helper functions to get data
- getTenants(): Returns list of all tenants
- getLeadsByTenant(): Get leads for specific tenant
- getCallsByTenant(): Get calls for specific tenant
- getTenantById(): Get tenant info by ID

**Data structure:**

```javascript
mockData = {
  'org-a': {
    id, name, leads[], calls[]
  },
  'org-b': {
    id, name, leads[], calls[]
  }
}
```

**Edit when:**

- Adding new leads
- Changing call data
- Adding new tenant
- Modifying existing data

### src/utils/constants.js

**Purpose:** Application-wide constants  
**What it does:**

- APP_CONFIG: App name, version, description
- LEAD_STATUS: All possible lead statuses
- LEAD_STATUS_COLORS: Color mapping for status badges
- CALL_OUTCOME: All possible call outcomes
- CALL_OUTCOME_COLORS: Color mapping for outcome badges
- TABS: Tab identifiers

**Edit when:**

- Adding new statuses
- Adding new outcomes
- Changing app name/version
- Adding new configuration

---

## 🎯 Header Components

### src/components/Header/Header.jsx

**Purpose:** Main application header  
**What it does:**

- Displays app title and version
- Shows current user
- Contains TenantSwitcher
- Contains RoleSwitcher
- Settings button (placeholder)
- Logout button (placeholder)

**Structure:**

```
Header
├─ Left: Logo + Switchers
└─ Right: User info + Buttons
```

**Edit when:** Changing header layout or adding buttons

### src/components/Header/TenantSwitcher.jsx

**Purpose:** Dropdown to switch between tenants  
**What it does:**

- Shows current tenant
- Dropdown with all available tenants
- Updates context when tenant selected
- Shows checkmark on current tenant

**Edit when:** Changing dropdown style or adding features

### src/components/Header/RoleSwitcher.jsx

**Purpose:** Dropdown to switch between roles  
**What it does:**

- Shows current role
- Dropdown with Admin and Agent options
- Updates context when role selected
- Shows checkmark on current role
- Used for testing different permissions

**Edit when:** Changing role options or dropdown style

---

## 📋 Leads Module Components

### src/components/Leads/LeadsModule.jsx

**Purpose:** Container for leads functionality  
**What it does:**

- Fetches leads for current tenant
- Manages status filter state
- Checks permissions (view_leads, edit_leads)
- Shows LoadingState when loading
- Shows EmptyState when no leads
- Passes filtered leads to LeadsTable
- Shows "Add Lead" button only for admins

**Data flow:**

```
useEffect → Get leads
        → Apply filter
        → Check permissions
        → Render table or error
```

**Edit when:** Changing leads logic or permissions

### src/components/Leads/LeadsTable.jsx

**Purpose:** Display leads in table format  
**What it does:**

- Renders table with all leads data
- Shows name, email, phone, status, created date
- Shows edit button only for admins
- Color-codes status badges
- Responsive table with horizontal scroll on mobile

**Edit when:** Adding columns, changing table style, or modifying display

### src/components/Leads/StatusFilter.jsx

**Purpose:** Dropdown to filter leads by status  
**What it does:**

- Select element with status options
- Options: All Status, New, Contacted, Qualified
- Calls onChange callback when selection changes
- Shows filter icon

**Edit when:** Adding new statuses or changing filter options

---

## ☎️ Call Logs Module Components

### src/components/CallLogs/CallLogsModule.jsx

**Purpose:** Container for call logs  
**What it does:**

- Fetches calls for current tenant
- Checks permissions (view_calls)
- Shows LoadingState when loading
- Shows EmptyState when no calls
- Passes calls to CallLogsTable
- Shows phone icon in header

**Edit when:** Changing call logs logic or permissions

### src/components/CallLogs/CallLogsTable.jsx

**Purpose:** Display calls in table format  
**What it does:**

- Renders table with all calls data
- Shows lead name, date/time, duration, outcome, notes
- Color-codes outcome badges
- Responsive table with horizontal scroll on mobile

**Edit when:** Adding columns, changing table style, or modifying display

---

## 🔄 Layout Components

### src/components/Layout/Dashboard.jsx

**Purpose:** Main dashboard layout  
**What it does:**

- Manages activeTab state
- Renders Header
- Renders TabNavigation
- Conditionally renders LeadsModule or CallLogsModule based on tab
- Provides overall page structure

**Structure:**

```
Dashboard
├─ Header (always visible)
├─ TabNavigation (always visible)
└─ LeadsModule OR CallLogsModule (conditional)
```

**Edit when:** Adding new modules or changing layout

### src/components/Layout/TabNavigation.jsx

**Purpose:** Tab switcher at top of content  
**What it does:**

- Renders tabs for Leads and Call Logs
- Only shows tabs user has permission to access
- Highlights active tab
- Calls setActiveTab when tab clicked

**Edit when:** Adding new modules or changing tab appearance

---

## 🎁 Common Components

### src/components/Common/LoadingState.jsx

**Purpose:** Reusable loading indicator  
**What it does:**

- Shows animated spinner
- Shows customizable loading message
- Used by all modules while fetching

**Usage:**

```jsx
<LoadingState message="Loading leads..." />
```

**Edit when:** Changing loading animation or style

### src/components/Common/EmptyState.jsx

**Purpose:** Reusable empty state display  
**What it does:**

- Shows icon + message when no data
- Customizable icon (emoji)
- Customizable message
- Used by all modules when no data exists

**Usage:**

```jsx
<EmptyState message="No leads found" icon="📭" />
```

**Edit when:** Changing empty state style or adding features

### src/components/Common/PermissionGate.jsx

**Purpose:** Component wrapper for permission checking  
**What it does:**

- Checks if user has specific permission
- Renders children if permission granted
- Shows fallback message if permission denied
- Used to protect sensitive UI

**Usage:**

```jsx
<PermissionGate permission="edit_leads">
  <EditButton />
</PermissionGate>
```

**Edit when:** Changing how access denied is shown

---

## 📚 Documentation Files

### README.md

**Purpose:** Complete project documentation  
**Contains:**

- Project overview
- Feature list
- Setup instructions
- Architecture explanation
- Usage guide
- Testing scenarios
- Performance notes
- API integration guide
- Future enhancements

**Read for:** Understanding the whole project

### SETUP.md

**Purpose:** Installation and setup guide  
**Contains:**

- Prerequisites
- Step-by-step installation
- Environment setup
- Common troubleshooting
- Quick start checklist
- Next steps

**Read for:** Setting up the project for first time

### ARCHITECTURE.md

**Purpose:** Technical architecture documentation  
**Contains:**

- Design goals
- System architecture diagram
- State management details
- Data flow explanation
- Permission system design
- Component architecture
- Performance optimization strategies
- Security considerations
- Scalability notes
- API integration patterns

**Read for:** Understanding how and why things work

### QUICK_REFERENCE.md

**Purpose:** Quick developer cheatsheet  
**Contains:**

- Common patterns
- Code templates
- Styling quick reference
- Common errors & fixes
- Pro tips
- Before submitting checklist

**Read for:** Quick lookups while coding

### PROJECT_STRUCTURE.txt

**Purpose:** Visual project structure  
**Contains:**

- ASCII folder tree
- Component hierarchy diagram
- File count breakdown
- Import path reference
- Module dependencies

**Read for:** Understanding folder organization

---

## 🎯 File Organization Summary

| Purpose      | Files                                     | Count |
| ------------ | ----------------------------------------- | ----- |
| Config       | _.json, _.js, \*.example, .gitignore      | 7     |
| Entry Points | main.jsx, App.jsx                         | 2     |
| State        | TenantContext.jsx                         | 1     |
| Hooks        | useTenant.js                              | 1     |
| Utils        | permissions.js, mockData.js, constants.js | 3     |
| Styles       | globals.css                               | 1     |
| Components   | Header, Leads, CallLogs, Layout, Common   | 13    |
| Docs         | README, SETUP, ARCHITECTURE, etc.         | 5+    |

---

## 🔗 File Relationships

```
package.json
    ↓ (defines dependencies)
App.jsx
    ↓ (imports)
TenantContext.jsx
    ↓ (provides)
Component files
    ↓ (import)
useTenant.js, utils files, other components
```

---

## ✅ Which Files to Edit

### To customize the app:

- `src/utils/mockData.js` - Change data
- `src/utils/constants.js` - Change colors/labels
- `src/utils/permissions.js` - Change roles/permissions
- Component files - Change UI

### For styling:

- `tailwind.config.js` - Theme colors
- `src/styles/globals.css` - Global styles
- Component files - Component-specific styles

### To add features:

- Create `src/components/NewFeature/` folder
- Follow existing component patterns
- Import useTenant if needed
- Add to TabNavigation

### For configuration:

- `.env` - Environment variables
- `vite.config.js` - Build settings
- `package.json` - Dependencies

---

**Last Updated:** January 2025  
**Use alongside:** README.md and ARCHITECTURE.md
