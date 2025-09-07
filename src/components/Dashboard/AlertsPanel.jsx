import React from 'react';

const AlertsPanel = ({ alerts, t }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return '🚨';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  const getAlertClasses = (type) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{t('alerts_notifications')}</h2>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
          {alerts.filter(a => a.type === 'critical' || a.type === 'warning').length} {t('active')}
        </span>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <span className="text-4xl mb-2 block">✅</span>
            <p>{t('no_alerts')}</p>
          </div>
        ) : (
          alerts.map(alert => (
            <div key={alert.id} className={`p-3 rounded-lg border ${getAlertClasses(alert.type)}`}>
              <div className="flex items-start space-x-3">
                <span className="text-lg flex-shrink-0">{getAlertIcon(alert.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs opacity-75 mt-1">
                    {formatTime(alert.timestamp)}
                  </p>
                </div>
                <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors">
            {t('mark_all_read')}
          </button>
          <button className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors">
            {t('view_history')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;