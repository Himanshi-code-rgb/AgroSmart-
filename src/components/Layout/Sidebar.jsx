import React, { useState } from 'react';

const Sidebar = ({ activeSection, setActiveSection, t }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'dashboard' },
    { id: 'crops', icon: '🌾', label: 'crop_intelligence' },
    { id: 'tutorials', icon: '📚', label: 'tutorials' }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`
        ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}
        md:translate-x-0 fixed md:relative z-40 w-64 h-full bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out
      `}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🚿</span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{t('irrigation_system')}</h2>
              <p className="text-sm text-gray-500">{t('status_online')}</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsCollapsed(true); // Close mobile menu after selection
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors
                    ${activeSection === item.id 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{t(item.label)}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* System Status */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-700 font-medium">{t('system_online')}</span>
            </div>
            <p className="text-xs text-green-600 mt-1">{t('last_sync')}: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
};

export default Sidebar;