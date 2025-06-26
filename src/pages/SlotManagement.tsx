
import React, { useState } from 'react';
import { Clock, Save } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Card from '../components/Common/Card';

const SlotManagement: React.FC = () => {
  const [slots, setSlots] = useState({
    morning: {
      '09:00': false,
      '10:00': true,
      '11:00': false,
      '12:00': true
    },
    afternoon: {
      '14:00': false,
      '15:00': true,
      '16:00': false,
      '17:00': true,
      '18:00': false
    }
  });

  const handleSlotToggle = (shift: 'morning' | 'afternoon', time: string) => {
    setSlots(prev => ({
      ...prev,
      [shift]: {
        ...prev[shift],
        [time]: !prev[shift][time as keyof typeof prev[typeof shift]]
      }
    }));
  };

  const handleSaveChanges = () => {
    console.log('Saving slot changes:', slots);
    // Here you would typically save to your backend
    alert('Slot changes saved successfully!');
  };

  const formatTime = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${time.split(':')[1]} ${ampm}`;
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Slot Management</h1>
          <button
            onClick={handleSaveChanges}
            className="inline-flex items-center px-4 py-2 bg-medical-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>

        {/* Morning Shift */}
        <Card>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <Clock className="w-5 h-5 text-medical-blue mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Morning Shift</h2>
              <span className="ml-2 text-sm text-gray-500">(9:00 AM - 12:00 PM)</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(slots.morning).map(([time, isActive]) => (
                <div key={time} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-900">{formatTime(time)}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={() => handleSlotToggle('morning', time)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-medical-blue"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Afternoon Shift */}
        <Card>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <Clock className="w-5 h-5 text-medical-blue mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Afternoon Shift</h2>
              <span className="ml-2 text-sm text-gray-500">(2:00 PM - 6:00 PM)</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {Object.entries(slots.afternoon).map(([time, isActive]) => (
                <div key={time} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-900">{formatTime(time)}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={() => handleSlotToggle('afternoon', time)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-medical-blue"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card title="Active Slots Summary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Morning Shift Active Slots</h3>
              <div className="space-y-2">
                {Object.entries(slots.morning)
                  .filter(([, isActive]) => isActive)
                  .map(([time]) => (
                    <div key={time} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{formatTime(time)}</span>
                    </div>
                  ))}
                {Object.entries(slots.morning).filter(([, isActive]) => isActive).length === 0 && (
                  <p className="text-sm text-gray-500">No active slots</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Afternoon Shift Active Slots</h3>
              <div className="space-y-2">
                {Object.entries(slots.afternoon)
                  .filter(([, isActive]) => isActive)
                  .map(([time]) => (
                    <div key={time} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{formatTime(time)}</span>
                    </div>
                  ))}
                {Object.entries(slots.afternoon).filter(([, isActive]) => isActive).length === 0 && (
                  <p className="text-sm text-gray-500">No active slots</p>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default SlotManagement;
