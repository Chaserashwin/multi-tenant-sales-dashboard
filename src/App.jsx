import React from "react";
import { TenantProvider } from "./context/TenantContext";
import Dashboard from "./components/Layout/Dashboard";

function App() {
  return (
    <TenantProvider>
      <Dashboard />
    </TenantProvider>
  );
}

export default App;
