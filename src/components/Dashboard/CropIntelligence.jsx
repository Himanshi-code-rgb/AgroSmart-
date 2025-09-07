import React, { useState } from 'react';

const CropIntelligence = ({ t }) => {
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [observations, setObservations] = useState('');
  const [cropData, setCropData] = useState([
    { id: 1, crop: 'rice', area: '3.2 acres', planted: '2024-07-15', status: 'flowering' },
    { id: 2, crop: 'wheat', area: '2.8 acres', planted: '2024-08-20', status: 'growing' },
    { id: 3, crop: 'maize', area: '1.5 acres', planted: '2024-08-01', status: 'seedling' }
  ]);

  const crops = [
    { id: 'cardamom', name: 'Cardamom', icon: '🌿', waterNeed: 'High', season: 'Monsoon', frequency: 'daily' },
    { id: 'rice', name: 'Rice', icon: '🌾', waterNeed: 'Very High', season: 'Monsoon', frequency: 'daily' },
    { id: 'maize', name: 'Maize', icon: '🌽', waterNeed: 'Medium', season: 'Summer', frequency: 'every_2_days' },
    { id: 'millet', name: 'Millet', icon: '🌾', waterNeed: 'Low', season: 'Summer', frequency: 'every_3_days' },
    { id: 'wheat', name: 'Wheat', icon: '🌾', waterNeed: 'Medium', season: 'Winter', frequency: 'every_3_days' },
    { id: 'barley', name: 'Barley', icon: '🌾', waterNeed: 'Medium', season: 'Winter', frequency: 'every_3_days' },
    { id: 'oranges', name: 'Oranges', icon: '🍊', waterNeed: 'High', season: 'Winter', frequency: 'every_2_days' },
    { id: 'potatoes', name: 'Potatoes', icon: '🥔', waterNeed: 'Medium', season: 'Winter', frequency: 'every_2_days' },
    { id: 'buckwheat', name: 'Buckwheat', icon: '🌾', waterNeed: 'Low', season: 'Summer', frequency: 'every_3_days' }
  ];

  const handleObservationSubmit = (e) => {
    e.preventDefault();
    if (observations.trim()) {
      // In a real app, this would be sent to the backend
      alert(t('observation_saved'));
      setObservations('');
    }
  };

  const getCropGrowthTips = (cropId) => {
    const tips = {
      cardamom: 'Requires shade and high humidity. Plant under tree canopy.',
      rice: 'Keep fields flooded during growing season. Drain before harvest.',
      maize: 'Plant after last frost. Requires deep, well-drained soil.',
      millet: 'Drought-resistant crop. Avoid overwatering.',
      wheat: 'Cool season crop. Plant in fall for spring harvest.',
      barley: 'Very hardy crop. Can tolerate poor soil conditions.',
      oranges: 'Citrus trees need consistent moisture but good drainage.',
      potatoes: 'Hill soil around plants as they grow. Harvest before frost.',
      buckwheat: 'Fast-growing crop. Can improve soil fertility.'
    };
    return tips[cropId] || 'Follow standard agricultural practices for this crop.';
  };

  return (
    <div className="space-y-6">
      {/* Current Crops Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('current_crops')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cropData.map(crop => {
            const cropInfo = crops.find(c => c.id === crop.crop);
            return (
              <div key={crop.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">{cropInfo?.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900">{cropInfo?.name}</h3>
                    <p className="text-sm text-gray-500">{crop.area}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('planted')}:</span>
                    <span>{new Date(crop.planted).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('status')}:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      crop.status === 'flowering' ? 'bg-pink-100 text-pink-800' :
                      crop.status === 'growing' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {t(crop.status)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('water_need')}:</span>
                    <span>{t(cropInfo?.waterNeed.toLowerCase().replace(' ', '_'))}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Crop Selection & Planning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('crop_selection')}</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {crops.map(crop => (
              <button
                key={crop.id}
                onClick={() => setSelectedCrop(crop.id)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  selectedCrop === crop.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span className="text-xl">{crop.icon}</span>
                  <div className="text-center">
                    <div className="font-medium text-xs">{crop.name}</div>
                    <div className="text-xs text-gray-500">{t(crop.season.toLowerCase())}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {selectedCrop && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-3">{crops.find(c => c.id === selectedCrop)?.name} {t('requirements')}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{t('water_requirement')}:</span>
                  <span className="font-medium">{t(crops.find(c => c.id === selectedCrop)?.waterNeed.toLowerCase().replace(' ', '_'))}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('best_season')}:</span>
                  <span className="font-medium">{t(crops.find(c => c.id === selectedCrop)?.season.toLowerCase())}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('irrigation_frequency')}:</span>
                  <span className="font-medium">{t(crops.find(c => c.id === selectedCrop)?.frequency)}</span>
                </div>
              </div>
              
              {/* Growth Tips */}
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-900 text-sm mb-1">💡 {t('growing_tip')}</h5>
                <p className="text-blue-800 text-xs">{getCropGrowthTips(selectedCrop)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Field Observations */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('field_observations')}</h3>
          
          <form onSubmit={handleObservationSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('select_crop')}
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                {cropData.map(crop => (
                  <option key={crop.id} value={crop.crop}>
                    {crops.find(c => c.id === crop.crop)?.name} - {crop.area}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('observations')}
              </label>
              <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder={t('observation_placeholder')}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              {t('save_observation')}
            </button>
          </form>

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <span>📸</span>
              <span className="text-sm">{t('add_photo')}</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <span>📊</span>
              <span className="text-sm">{t('view_reports')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Seasonal Crop Calendar */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('seasonal_calendar')}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Summer Crops */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-3">☀️ {t('summer')} {t('crops')}</h4>
            <div className="space-y-2">
              {crops.filter(crop => crop.season === 'Summer').map(crop => (
                <div key={crop.id} className="flex items-center space-x-2 text-sm">
                  <span>{crop.icon}</span>
                  <span>{crop.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Winter Crops */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-3">❄️ {t('winter')} {t('crops')}</h4>
            <div className="space-y-2">
              {crops.filter(crop => crop.season === 'Winter').map(crop => (
                <div key={crop.id} className="flex items-center space-x-2 text-sm">
                  <span>{crop.icon}</span>
                  <span>{crop.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monsoon Crops */}
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-3">🌧️ {t('monsoon')} {t('crops')}</h4>
            <div className="space-y-2">
              {crops.filter(crop => crop.season === 'Monsoon').map(crop => (
                <div key={crop.id} className="flex items-center space-x-2 text-sm">
                  <span>{crop.icon}</span>
                  <span>{crop.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropIntelligence;