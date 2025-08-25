import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h2>📋 Task Reminder</h2>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#tasks">Tasks</a></li>
            <li><a href="#calendar">Calendar</a></li>
            <li><a href="#settings">Settings</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;