import React from 'react';

const ControlPanel = ({ valveStates, toggleValve, t }) => {
  const valves = [
    { id: 'valve1', name: 'Field A - Main', zone: 'Zone 1' },
    { id: 'valve2', name: 'Field B - Drip', zone: 'Zone 2' },
    { id: 'valve3', name: 'Field C - Sprinkler', zone: 'Zone 3' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{t('irrigation_control')}</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600">{t('system_ready')}</span>
        </div>
      </div>

      <div className="space-y-4">
        {valves.map(valve => (
          <div key={valve.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{valve.name}</h3>
              <p className="text-sm text-gray-500">{valve.zone}</p>
              <div className="flex items-center mt-1">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  valveStates[valve.id] 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {valveStates[valve.id] ? t('active') : t('inactive')}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Status Indicator */}
              <div className={`w-3 h-3 rounded-full ${
                valveStates[valve.id] ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
              }`}></div>

              {/* Toggle Switch */}
              <button
                onClick={() => toggleValve(valve.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                  valveStates[valve.id] ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    valveStates[valve.id] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Override */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <span className="text-yellow-600 text-lg">⚠️</span>
          <div>
            <h4 className="font-medium text-yellow-800">{t('manual_override')}</h4>
            <p className="text-sm text-yellow-700 mt-1">{t('manual_override_warning')}</p>
            <button className="mt-2 px-3 py-1 bg-yellow-200 text-yellow-800 rounded text-sm hover:bg-yellow-300 transition-colors">
              {t('emergency_stop')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;