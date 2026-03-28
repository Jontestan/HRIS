import React from 'react';
import '../styles/Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <h3>Menu</h3>
        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/employees">Employees</a></li>
          <li><a href="/departments">Departments</a></li>
          <li><a href="/roles">Roles</a></li>
          <li><a href="/payroll">Payroll</a></li>
          <li><a href="/reports">Reports</a></li>
          <li><a href="/settings">Settings</a></li>
        </ul>
      </nav>
    </aside>
  );
}
