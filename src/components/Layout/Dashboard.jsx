import React, { useState } from "react";
import Header from "../Header/Header";
import TabNavigation from "./TabNavigation";
import LeadsModule from "../Leads/LeadsModule";
import CallLogsModule from "../CallLogs/CallLogsModule";
import { TABS } from "../../utils/constants";

/**
 * Main dashboard component
 * Manages tab state and renders different modules based on active tab
 */
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(TABS.LEADS);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Render active module */}
        {activeTab === TABS.LEADS && <LeadsModule />}
        {activeTab === TABS.CALLS && <CallLogsModule />}
      </main>
    </div>
  );
};

export default Dashboard;
