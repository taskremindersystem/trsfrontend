import React from 'react';
import './Layout.module.css';

const Layout = ({ children, sidebar = null, header = null }) => {
  return (
    <div className="layout">
      {header && (
        <header className="layout__header">
          {header}
        </header>
      )}
      <div className="layout__content">
        {sidebar && (
          <aside className="layout__sidebar">
            {sidebar}
          </aside>
        )}
        <main className="layout__main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
