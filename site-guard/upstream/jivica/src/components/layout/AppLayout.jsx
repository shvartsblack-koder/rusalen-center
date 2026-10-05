import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from './AppSidebar';

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className="flex-1 overflow-y-auto transition-all duration-250"
        style={{ marginLeft: collapsed ? 64 : 256 }}
      >
        <Outlet />
      </main>
    </div>
  );
}