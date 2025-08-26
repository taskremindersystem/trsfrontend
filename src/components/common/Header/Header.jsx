import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { taskService } from '../../../services/taskService.js';

// Shared styles (accessible by all components)
const userProfileStyle = {
  marginLeft: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const userAvatarStyle = {
  width: '40px',
  height: '40px',
  background: 'rgba(179, 39, 39, 0.2)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// Header Component
const Header = ({ toggleSidebar }) => {
  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '70px',
    background: 'linear-gradient(135deg, #0052CC 0%, #e9e5ec 100%)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1001,
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    color: '#000000',
  };

  const headerContentStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  };

  const menuButtonStyle = {
    background: 'rgba(20, 20, 20, 0.904)',
    border: 'none',
    borderRadius: '8px',
    padding: '10px',
    cursor: 'pointer',
    marginRight: '15px',
    color: '#ffffff',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const logoTextStyle = {
    margin: 0,
    fontSize: '24px',
    fontWeight: 600,
  };

  const desktopNavStyle = {
    marginLeft: 'auto',
    display: 'flex',
    gap: '30px',
  };

  const navLinkStyle = {
    color: '#000000',
    textDecoration: 'none',
    fontWeight: 500,
  };

  const userGreetingStyle = {
    fontSize: '14px',
  };

  return (
    <header style={headerStyle}>
      <div style={headerContentStyle}>
        <button style={menuButtonStyle} onClick={toggleSidebar}>
          ☰
        </button>

        <div style={logoStyle}>
          <h2 style={logoTextStyle}>📋 Task Reminder</h2>
        </div>

        <nav style={desktopNavStyle}>
          <Link to="/get-tasks" style={navLinkStyle}>Tasks</Link>
          <Link to="/create-task" style={navLinkStyle}>Create Task</Link>
        </nav>

        <div style={userProfileStyle}>
          <span style={userGreetingStyle}>Welcome, John!</span>
          <div style={userAvatarStyle}>👤</div>
        </div>
      </div>
    </header>
  );
};

// Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [taskStats, setTaskStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0
  });
  const [loading, setLoading] = useState(true);

  // Load task statistics
  useEffect(() => {
    const loadTaskStats = async () => {
      try {
        setLoading(true);
        const tasks = await taskService.getTasks();
        
        if (tasks && Array.isArray(tasks)) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          const stats = {
            total: tasks.length,
            completed: tasks.filter(task => task.completed || task.status === 'completed').length,
            pending: tasks.filter(task => !task.completed && task.status !== 'completed').length,
            overdue: tasks.filter(task => {
              if (!task.dueDate || task.completed || task.status === 'completed') return false;
              const dueDate = new Date(task.dueDate);
              dueDate.setHours(0, 0, 0, 0);
              return dueDate < today;
            }).length
          };
          
          setTaskStats(stats);
        }
      } catch (error) {
        console.error('Error loading task stats:', error);
        setTaskStats({ total: 0, completed: 0, pending: 0, overdue: 0 });
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      loadTaskStats();
    }
  }, [isOpen]);

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { id: 'tasks', icon: '✅', label: 'My Tasks', path: '/get-tasks', badge: taskStats.pending.toString() },
    { id: 'calendar', icon: '📅', label: 'Calendar', path: '/calendar' },
    { id: 'projects', icon: '📁', label: 'Projects', path: '/projects' },
    { id: 'team', icon: '👥', label: 'Team', path: '/team' },
    { id: 'reports', icon: '📈', label: 'Reports', path: '/reports' },
  ];

  const quickActions = [
    { icon: '➕', label: 'Create Task', action: 'create-task', path: '/create-task' },
    { icon: '📝', label: 'Quick Note', action: 'quick-note' },
    { icon: '⏰', label: 'Set Reminder', action: 'reminder' },
  ];

  const handleMenuClick = (itemId) => {
    setActiveSection(itemId);
  };

  const handleQuickAction = (action, path = null) => {
    if (path) {
      window.location.href = path;
    } else {
      alert(`Quick action: ${action}`);
    }
  };

  const sidebarStyle = {
    position: 'fixed',
    top: '70px',
    left: isOpen ? '0' : '-280px',
    width: '280px',
    height: 'calc(100vh - 70px)',
    background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
    borderRight: '1px solid #e2e8f0',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
    transition: 'left 0.3s ease',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  };

  const sidebarOverlayStyle = {
    position: 'fixed',
    top: '70px',
    left: 0,
    width: '100vw',
    height: 'calc(100vh - 70px)',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    display: isOpen ? 'block' : 'none',
  };

  const sidebarHeaderStyle = {
    padding: '20px',
    borderBottom: '1px solid #e2e8f0',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
  };

  const userInfoStyle = {
    margin: '0 0 4px 0',
    fontSize: '16px',
    fontWeight: 600,
  };

  const userInfoSpanStyle = {
    fontSize: '12px',
    opacity: 0.9,
  };

  const sidebarNavStyle = {
    flex: 1,
    padding: '20px 0',
  };

  const navMenuStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  const navItemStyle = {
    marginBottom: '4px',
  };

  const navLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    color: '#64748b',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  };

  const navLinkHoverStyle = {
    background: '#f1f5f9',
    color: '#334155',
  };

  const navLinkActiveStyle = {
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
  };

  const navIconStyle = {
    fontSize: '18px',
    width: '24px',
    marginRight: '12px',
  };

  const navLabelStyle = {
    flex: 1,
    fontSize: '14px',
    fontWeight: 500,
  };

  const navBadgeStyle = {
    background: '#ef4444',
    color: '#ffffff',
    fontSize: '11px',
    padding: '2px 6px',
    borderRadius: '12px',
    minWidth: '18px',
    textAlign: 'center',
  };

  const quickActionsStyle = {
    padding: '20px',
    borderTop: '1px solid #e2e8f0',
  };

  const quickActionsH4Style = {
    margin: '0 0 12px 0',
    fontSize: '12px',
    fontWeight: 600,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const quickButtonsStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const quickBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#475569',
  };

  const quickBtnHoverStyle = {
    background: '#e2e8f0',
    borderColor: '#cbd5e1',
  };

  const quickIconStyle = {
    marginRight: '8px',
    fontSize: '14px',
  };

  const taskSummaryStyle = {
    padding: '20px',
    borderTop: '1px solid #e2e8f0',
  };

  const taskSummaryH4Style = {
    margin: '0 0 12px 0',
    fontSize: '12px',
    fontWeight: 600,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  };

  const summaryStatsStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  };

  const statItemStyle = {
    textAlign: 'center',
    padding: '8px 6px',
    background: '#f8fafc',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
  };

  const overdueStatItemStyle = {
    ...statItemStyle,
    background: taskStats.overdue > 0 ? '#fef2f2' : '#f8fafc',
    borderColor: taskStats.overdue > 0 ? '#fecaca' : '#e2e8f0',
  };

  const statNumberStyle = {
    display: 'block',
    fontSize: '16px',
    fontWeight: 700,
    color: '#334155',
    marginBottom: '2px',
  };

  const overdueStatNumberStyle = {
    ...statNumberStyle,
    color: taskStats.overdue > 0 ? '#dc2626' : '#334155',
  };

  const statLabelStyle = {
    fontSize: '10px',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  };

  const loadingStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    color: '#64748b',
    fontSize: '12px',
  };

  return (
    <>
      <div style={sidebarOverlayStyle} onClick={toggleSidebar} />
      <aside style={sidebarStyle}>
        <div style={sidebarHeaderStyle}>
          <div style={userProfileStyle}>
            <div style={userAvatarStyle}>👤</div>
            <div>
              <h3 style={userInfoStyle}>John Doe</h3>
              <span style={userInfoSpanStyle}>john@example.com</span>
            </div>
          </div>
        </div>

        <nav style={sidebarNavStyle}>
          <ul style={navMenuStyle}>
            {menuItems.map((item) => (
              <li key={item.id} style={navItemStyle}>
                <Link
                  to={item.path}
                  onClick={() => handleMenuClick(item.id)}
                  style={{
                    ...navLinkStyle,
                    ...(activeSection === item.id ? navLinkActiveStyle : {}),
                    ':hover': navLinkHoverStyle,
                  }}
                >
                  <span style={navIconStyle}>{item.icon}</span>
                  <span style={navLabelStyle}>{item.label}</span>
                  {item.badge && item.badge !== '0' && (
                    <span style={navBadgeStyle}>{item.badge}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div style={quickActionsStyle}>
          <h4 style={quickActionsH4Style}>Quick Actions</h4>
          <div style={quickButtonsStyle}>
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.action, action.path)}
                style={quickBtnStyle}
                onMouseOver={e => (e.currentTarget.style.background = quickBtnHoverStyle.background)}
                onMouseOut={e => (e.currentTarget.style.background = quickBtnStyle.background)}
              >
                <span style={quickIconStyle}>{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        </div>

        <div style={taskSummaryStyle}>
          <h4 style={taskSummaryH4Style}>Today's Overview</h4>
          {loading ? (
            <div style={loadingStyle}>
              Loading...
            </div>
          ) : (
            <div style={summaryStatsStyle}>
              <div style={statItemStyle}>
                <span style={statNumberStyle}>{taskStats.total}</span>
                <span style={statLabelStyle}>Total</span>
              </div>
              <div style={statItemStyle}>
                <span style={statNumberStyle}>{taskStats.completed}</span>
                <span style={statLabelStyle}>Done</span>
              </div>
              <div style={statItemStyle}>
                <span style={statNumberStyle}>{taskStats.pending}</span>
                <span style={statLabelStyle}>Pending</span>
              </div>
              <div style={overdueStatItemStyle}>
                <span style={overdueStatNumberStyle}>{taskStats.overdue}</span>
                <span style={statLabelStyle}>Overdue</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

// Main App Component
const TaskReminderApp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const appStyle = {
    marginTop: '70px',
    padding: '20px',
    minHeight: 'calc(100vh - 70px)',
    background: '#ffffff',
  };

  return (
    <div style={appStyle}>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main style={{ padding: '20px' }}>
        <Outlet /> 
      </main>
    </div>
  );
};

export default TaskReminderApp;