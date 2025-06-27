import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { Switch } from '../components/ui/switch';

const SlotManagement: React.FC = () => {
  const navigate = useNavigate();
  
  const [morningSlots, setMorningSlots] = useState({
    '10:00': true,
    '10:30': true,
    '11:00': true,
    '11:30': true,
    '12:00': true,
    '12:30': true,
    '01:00': true
  });

  const [afternoonSlots, setAfternoonSlots] = useState({
    '05:00': true,
    '05:30': true,
    '06:00': true,
    '06:30': true,
    '07:00': true,
    '07:30': true,
    '08:00': true
  });

  const handleMorningSlotToggle = (time: string) => {
    setMorningSlots(prev => ({
      ...prev,
      [time]: !prev[time as keyof typeof prev]
    }));
  };

  const handleAfternoonSlotToggle = (time: string) => {
    setAfternoonSlots(prev => ({
      ...prev,
      [time]: !prev[time as keyof typeof prev]
    }));
  };

  const handleSaveChanges = () => {
    console.log('Saving slot changes:', { morningSlots, afternoonSlots });
    alert('Slot changes saved successfully!');
  };

  const formatMorningTime = (time: string) => {
    if (time === '01:00') return '01:00 PM';
    return `${time} AM`;
  };

  const formatAfternoonTime = (time: string) => {
    return `${time} PM`;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          
          <button
            onClick={handleSaveChanges}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Morning Shift */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-indigo-600 mb-6">Morning Shift</h2>
            
            <div className="space-y-4">
              {Object.entries(morningSlots).map(([time, isActive]) => (
                <div key={time} className="flex items-center justify-between py-3">
                  <span className="text-gray-700 font-medium">
                    {formatMorningTime(time)}
                  </span>
                  <Switch
                    checked={isActive}
                    onCheckedChange={() => handleMorningSlotToggle(time)}
                    className="data-[state=checked]:bg-indigo-600"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Afternoon Shift */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-indigo-600 mb-6">Afternoon Shift</h2>
            
            <div className="space-y-4">
              {Object.entries(afternoonSlots).map(([time, isActive]) => (
                <div key={time} className="flex items-center justify-between py-3">
                  <span className="text-gray-700 font-medium">
                    {formatAfternoonTime(time)}
                  </span>
                  <Switch
                    checked={isActive}
                    onCheckedChange={() => handleAfternoonSlotToggle(time)}
                    className="data-[state=checked]:bg-indigo-600"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SlotManagement;
