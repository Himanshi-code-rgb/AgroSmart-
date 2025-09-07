import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const DataCharts = ({ sensorData, t }) => {
  // Generate mock historical data
  const generateHistoricalData = () => {
    const data = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      data.push({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        soilMoisture: Math.max(20, Math.min(80, 45 + Math.sin(i / 4) * 15 + (Math.random() - 0.5) * 10)),
        temperature: Math.max(15, Math.min(40, 25 + Math.sin(i / 6) * 8 + (Math.random() - 0.5) * 5)),
        sunlight: Math.max(0, Math.min(100, i < 6 || i > 18 ? 10 + Math.random() * 20 : 60 + Math.random() * 30)),
        waterUsage: Math.max(0, Math.random() * 50)
      });
    }
    
    return data;
  };

  const historicalData = generateHistoricalData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Soil Moisture & Temperature Trends */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('soil_temperature_trends')}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="soilMoisture" 
              stroke="#3B82F6" 
              strokeWidth={2}
              name={t('soil_moisture') + ' (%)'}
            />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="#EF4444" 
              strokeWidth={2}
              name={t('temperature') + ' (°C)'}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Sunlight & Water Usage */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('sunlight_water_usage')}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="sunlight" 
              stackId="1"
              stroke="#F59E0B" 
              fill="#FEF3C7"
              name={t('sunlight') + ' (%)'}
            />
            <Area 
              type="monotone" 
              dataKey="waterUsage" 
              stackId="2"
              stroke="#06B6D4" 
              fill="#CFFAFE"
              name={t('water_usage') + ' (L)'}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DataCharts;