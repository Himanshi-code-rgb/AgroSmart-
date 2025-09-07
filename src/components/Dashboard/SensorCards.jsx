import React from 'react';

const SensorCards = ({ sensorData, t }) => {
  const sensors = [
    {
      key: 'soilMoisture',
      icon: '💧',
      label: 'soil_moisture',
      value: sensorData.soilMoisture,
      unit: '%',
      color: sensorData.soilMoisture < 30 ? 'red' : sensorData.soilMoisture < 50 ? 'yellow' : 'green',
      optimal: '40-70%'
    },
    {
      key: 'temperature',
      icon: '🌡️',
      label: 'temperature',
      value: sensorData.temperature,
      unit: '°C',
      color: sensorData.temperature < 20 || sensorData.temperature > 35 ? 'red' : 'green',
      optimal: '20-30°C'
    },
    {
      key: 'pH',
      icon: '⚗️',
      label: 'ph_level',
      value: sensorData.pH,
      unit: 'pH',
      color: sensorData.pH < 6.0 || sensorData.pH > 7.5 ? 'red' : 'green',
      optimal: '6.0-7.0'
    },
    {
      key: 'sunlight',
      icon: '☀️',
      label: 'sunlight',
      value: sensorData.sunlight,
      unit: '%',
      color: sensorData.sunlight < 40 ? 'yellow' : 'green',
      optimal: '60-80%'
    },
    {
      key: 'waterTankLevel',
      icon: '🚰',
      label: 'water_tank',
      value: sensorData.waterTankLevel,
      unit: '%',
      color: sensorData.waterTankLevel < 20 ? 'red' : sensorData.waterTankLevel < 50 ? 'yellow' : 'green',
      optimal: '> 30%'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'red':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'yellow':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'green':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {sensors.map(sensor => (
        <div key={sensor.key} className={`p-4 rounded-lg border-2 ${getColorClasses(sensor.color)} transition-all hover:shadow-md`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{sensor.icon}</span>
            <div className={`w-3 h-3 rounded-full ${
              sensor.color === 'red' ? 'bg-red-500' : 
              sensor.color === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'
            } animate-pulse`}></div>
          </div>
          
          <h3 className="font-semibold text-sm mb-1">{t(sensor.label)}</h3>
          
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold">
              {typeof sensor.value === 'number' ? sensor.value.toFixed(1) : sensor.value}
            </span>
            <span className="text-sm opacity-75">{sensor.unit}</span>
          </div>
          
          <div className="mt-2 text-xs opacity-75">
            {t('optimal')}: {sensor.optimal}
          </div>

          {/* Progress Bar for Tank Level */}
          {sensor.key === 'waterTankLevel' && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    sensor.color === 'red' ? 'bg-red-500' : 
                    sensor.color === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${sensor.value}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SensorCards;