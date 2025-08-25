import React from 'react';
import Layout from '../../components/common/Layout';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <Layout>
      <div className="dashboard">
        <h1>Task Reminder Dashboard</h1>
        <div className="dashboard__stats">
          <div className="stat-card">
            <h3>Total Tasks</h3>
            <p className="stat-number">0</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p className="stat-number">0</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p className="stat-number">0</p>
          </div>
          <div className="stat-card">
            <h3>Overdue</h3>
            <p className="stat-number">0</p>
          </div>
        </div>
        <div className="dashboard__recent">
          <h2>Recent Tasks</h2>
          <p>No recent tasks found.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
