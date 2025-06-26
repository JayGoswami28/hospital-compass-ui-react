
import React, { useState } from 'react';
import { Search, UserCheck, Plus } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Card from '../components/Common/Card';
import { mockAppointments } from '../data/mockData';

const Receptionist: React.FC = () => {
  const [appointments, setAppointments] = useState([
    ...mockAppointments,
    {
      id: 4,
      patientName: 'David Wilson',
      doctorName: 'Dr. Sarah Wilson',
      date: '2024-06-26',
      time: '9:00 AM',
      type: 'Check-in',
      status: 'Waiting'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCheckInForm, setShowCheckInForm] = useState(false);
  const [checkInData, setCheckInData] = useState({
    patientName: '',
    contactNumber: '',
    appointmentType: 'Walk-in'
  });

  const todayAppointments = appointments.filter(apt => 
    apt.date === '2024-06-26' || apt.date === '2024-06-27'
  );

  const filteredAppointments = todayAppointments.filter(apt =>
    apt.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckIn = (appointment: any) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointment.id 
        ? { ...apt, status: 'Checked In' }
        : apt
    ));
  };

  const handleQuickCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    const newAppointment = {
      id: appointments.length + 1,
      patientName: checkInData.patientName,
      doctorName: 'Dr. Available',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: checkInData.appointmentType,
      status: 'Checked In'
    };
    
    setAppointments([...appointments, newAppointment]);
    setCheckInData({ patientName: '', contactNumber: '', appointmentType: 'Walk-in' });
    setShowCheckInForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Checked In': return 'bg-green-100 text-green-800';
      case 'Waiting': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Confirmed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Receptionist Dashboard</h1>
          <button
            onClick={() => setShowCheckInForm(true)}
            className="bg-medical-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Quick Check-in</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {appointments.filter(a => a.status === 'Scheduled').length}
            </div>
            <div className="text-gray-600">Scheduled Today</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {appointments.filter(a => a.status === 'Checked In').length}
            </div>
            <div className="text-gray-600">Checked In</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {appointments.filter(a => a.status === 'Waiting').length}
            </div>
            <div className="text-gray-600">Waiting</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {todayAppointments.length}
            </div>
            <div className="text-gray-600">Total Today</div>
          </Card>
        </div>

        {showCheckInForm && (
          <Card title="Quick Check-in">
            <form onSubmit={handleQuickCheckIn} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    required
                    value={checkInData.patientName}
                    onChange={(e) => setCheckInData({ ...checkInData, patientName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                    placeholder="Enter patient name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={checkInData.contactNumber}
                    onChange={(e) => setCheckInData({ ...checkInData, contactNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                    placeholder="Enter contact number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Type
                  </label>
                  <select
                    value={checkInData.appointmentType}
                    onChange={(e) => setCheckInData({ ...checkInData, appointmentType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                  >
                    <option value="Walk-in">Walk-in</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Consultation">Consultation</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-medical-blue text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Check In Patient
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCheckInForm(false);
                    setCheckInData({ patientName: '', contactNumber: '', appointmentType: 'Walk-in' });
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Card>
        )}

        <Card title="Today's Appointments">
          <div className="mb-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent w-full"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      P{appointment.id.toString().padStart(3, '0')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {appointment.patientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.doctorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      {appointment.status !== 'Checked In' && (
                        <button
                          onClick={() => handleCheckIn(appointment)}
                          className="text-green-600 hover:text-green-800 flex items-center space-x-1"
                        >
                          <UserCheck className="w-4 h-4" />
                          <span>Check-in</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Receptionist;
