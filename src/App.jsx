import React, { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import SensorCards from './components/Dashboard/SensorCards';
import ControlPanel from './components/Dashboard/ControlPanel';
import AlertsPanel from './components/Dashboard/AlertsPanel';
import CropIntelligence from './components/Dashboard/CropIntelligence';
import DataCharts from './components/Dashboard/DataCharts';
import Tutorials from './components/Dashboard/Tutorials';
import { translations } from './data/translations';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sensorData, setSensorData] = useState({
    soilMoisture: 45,
    temperature: 28,
    pH: 6.8,
    sunlight: 75,
    waterTankLevel: 80,
    lastUpdated: new Date()
  });
  const [valveStates, setValveStates] = useState({
    valve1: false,
    valve2: true,
    valve3: false
  });
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'Low soil moisture detected in Field A', timestamp: new Date() },
    { id: 2, type: 'info', message: 'Irrigation cycle completed successfully', timestamp: new Date() }
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        soilMoisture: Math.max(20, Math.min(80, prev.soilMoisture + (Math.random() - 0.5) * 5)),
        temperature: Math.max(15, Math.min(40, prev.temperature + (Math.random() - 0.5) * 2)),
        pH: Math.max(5.5, Math.min(8.0, prev.pH + (Math.random() - 0.5) * 0.2)),
        sunlight: Math.max(0, Math.min(100, prev.sunlight + (Math.random() - 0.5) * 10)),
        waterTankLevel: Math.max(10, Math.min(100, prev.waterTankLevel + (Math.random() - 0.5) * 3)),
        lastUpdated: new Date()
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const t = (key) => translations[currentLanguage]?.[key] || key;

  const toggleValve = (valveId) => {
    setValveStates(prev => ({
      ...prev,
      [valveId]: !prev[valveId]
    }));
    
    // Add alert for valve action
    const newAlert = {
      id: Date.now(),
      type: 'info',
      message: `${t('valve')} ${valveId} ${valveStates[valveId] ? t('turned_off') : t('turned_on')}`,
      timestamp: new Date()
    };
    setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <SensorCards sensorData={sensorData} t={t} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ControlPanel valveStates={valveStates} toggleValve={toggleValve} t={t} />
              <AlertsPanel alerts={alerts} t={t} />
            </div>
            <DataCharts sensorData={sensorData} t={t} />
          </div>
        );
      case 'crops':
        return <CropIntelligence t={t} />;
      case 'tutorials':
        return <Tutorials t={t} />;
      default:
        return <div className="text-center py-8 text-gray-500">{t('select_section')}</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header 
        currentLanguage={currentLanguage} 
        setCurrentLanguage={setCurrentLanguage}
        t={t}
        alertCount={alerts.filter(a => a.type === 'critical' || a.type === 'warning').length}
      />
      <div className="flex flex-1">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          t={t}
        />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;