import React, { useState } from 'react';

const Tutorials = ({ t }) => {
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  const tutorials = [
    {
      id: 1,
      title: 'getting_started',
      icon: '🚀',
      duration: '5 min',
      difficulty: 'beginner',
      steps: [
        'dashboard_overview',
        'sensor_reading',
        'valve_control',
        'alerts_check'
      ]
    },
    {
      id: 2,
      title: 'irrigation_control',
      icon: '💧',
      duration: '8 min',
      difficulty: 'beginner',
      steps: [
        'manual_valve_control',
        'schedule_irrigation',
        'emergency_stop',
        'water_conservation'
      ]
    },
    {
      id: 3,
      title: 'sensor_monitoring',
      icon: '📊',
      duration: '10 min',
      difficulty: 'intermediate',
      steps: [
        'understanding_sensors',
        'optimal_ranges',
        'trend_analysis',
        'troubleshooting'
      ]
    },
    {
      id: 4,
      title: 'crop_management',
      icon: '🌱',
      duration: '12 min',
      difficulty: 'intermediate',
      steps: [
        'crop_selection',
        'growth_tracking',
        'field_observations',
        'harvest_planning'
      ]
    },
    {
      id: 5,
      title: 'alerts_notifications',
      icon: '🔔',
      duration: '6 min',
      difficulty: 'beginner',
      steps: [
        'alert_types',
        'priority_levels',
        'response_actions',
        'notification_settings'
      ]
    },
    {
      id: 6,
      title: 'troubleshooting',
      icon: '🔧',
      duration: '15 min',
      difficulty: 'advanced',
      steps: [
        'common_issues',
        'sensor_calibration',
        'connectivity_problems',
        'maintenance_tips'
      ]
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedTutorial) {
    const tutorial = tutorials.find(t => t.id === selectedTutorial);
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setSelectedTutorial(null)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>{t('back_to_tutorials')}</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
              {t(tutorial.difficulty)}
            </span>
            <span className="text-sm text-gray-500">⏱️ {tutorial.duration}</span>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            <span className="text-3xl mr-3">{tutorial.icon}</span>
            {t(tutorial.title)}
          </h1>
          <p className="text-gray-600">{t(`${tutorial.title}_description`)}</p>
        </div>

        <div className="space-y-6">
          {tutorial.steps.map((step, index) => (
            <div key={step} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{t(step)}</h3>
                  <p className="text-gray-600 mb-3">{t(`${step}_description`)}</p>
                  
                  {/* Interactive elements for demonstration */}
                  {step.includes('valve') && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Demo Valve Control</span>
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                          Try It
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {step.includes('sensor') && (
                    <div className="bg-blue-50 rounded-lg p-3 mb-3">
                      <div className="text-sm">
                        <strong>Example:</strong> Soil moisture: 45% (Optimal range: 40-70%)
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t('tip')}: {t(`${step}_tip`)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            {t('previous_tutorial')}
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            {t('next_tutorial')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tutorial Categories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('learning_center')}</h2>
        <p className="text-gray-600 mb-6">{t('tutorial_intro')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tutorials.map(tutorial => (
            <div
              key={tutorial.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedTutorial(tutorial.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{tutorial.icon}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                  {t(tutorial.difficulty)}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{t(tutorial.title)}</h3>
              <p className="text-sm text-gray-600 mb-3">{t(`${tutorial.title}_description`)}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>⏱️ {tutorial.duration}</span>
                <span>{tutorial.steps.length} {t('steps')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Help */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('quick_help')}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">📞 {t('emergency_contact')}</h4>
            <p className="text-sm text-gray-600 mb-2">{t('emergency_description')}</p>
            <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">
              {t('call_support')}
            </button>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">💬 {t('chat_support')}</h4>
            <p className="text-sm text-gray-600 mb-2">{t('chat_description')}</p>
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
              {t('start_chat')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;