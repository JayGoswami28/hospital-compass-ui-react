
import React, { useState } from 'react';
import { Plus, UserPlus, UserMinus } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Card from '../components/Common/Card';
import { mockBeds } from '../data/mockData';

const BedManagement: React.FC = () => {
  const [beds, setBeds] = useState(mockBeds);
  const [showForm, setShowForm] = useState(false);
  const [selectedBed, setSelectedBed] = useState<any>(null);
  const [actionType, setActionType] = useState<'assign' | 'release'>('assign');
  const [formData, setFormData] = useState({ patientName: '' });
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredBeds = beds.filter(bed => 
    statusFilter === 'All' || bed.status === statusFilter
  );

  const handleAction = (bed: any, action: 'assign' | 'release') => {
    setSelectedBed(bed);
    setActionType(action);
    setShowForm(true);
    if (action === 'release') {
      setFormData({ patientName: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBeds(beds.map(bed => {
      if (bed.id === selectedBed.id) {
        if (actionType === 'assign') {
          return {
            ...bed,
            status: 'Occupied',
            patientName: formData.patientName,
            assignedDate: new Date().toISOString().split('T')[0]
          };
        } else {
          return {
            ...bed,
            status: 'Available',
            patientName: '',
            assignedDate: ''
          };
        }
      }
      return bed;
    }));
    
    setFormData({ patientName: '' });
    setShowForm(false);
    setSelectedBed(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Occupied': return 'bg-red-100 text-red-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Bed Management</h1>
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-transparent"
            >
              <option value="All">All Beds</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {beds.filter(b => b.status === 'Available').length}
            </div>
            <div className="text-gray-600">Available Beds</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {beds.filter(b => b.status === 'Occupied').length}
            </div>
            <div className="text-gray-600">Occupied Beds</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {beds.filter(b => b.status === 'Maintenance').length}
            </div>
            <div className="text-gray-600">Under Maintenance</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-medical-blue">
              {beds.length}
            </div>
            <div className="text-gray-600">Total Beds</div>
          </Card>
        </div>

        {showForm && (
          <Card title={actionType === 'assign' ? 'Assign Bed' : 'Release Bed'}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Number
                </label>
                <input
                  type="text"
                  value={selectedBed?.roomNumber}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              {actionType === 'assign' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.patientName}
                    onChange={(e) => setFormData({ patientName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                    placeholder="Enter patient name"
                  />
                </div>
              )}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-medical-blue text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {actionType === 'assign' ? 'Assign Bed' : 'Release Bed'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedBed(null);
                    setFormData({ patientName: '' });
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Card>
        )}

        <Card title="Bed Status">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bed ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBeds.map((bed) => (
                  <tr key={bed.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      B{bed.id.toString().padStart(3, '0')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {bed.roomNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bed.status)}`}>
                        {bed.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bed.patientName || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bed.assignedDate || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      {bed.status === 'Available' ? (
                        <button
                          onClick={() => handleAction(bed, 'assign')}
                          className="text-green-600 hover:text-green-800 flex items-center space-x-1"
                          title="Assign bed"
                        >
                          <UserPlus className="w-4 h-4" />
                          <span>Assign</span>
                        </button>
                      ) : bed.status === 'Occupied' ? (
                        <button
                          onClick={() => handleAction(bed, 'release')}
                          className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                          title="Release bed"
                        >
                          <UserMinus className="w-4 h-4" />
                          <span>Release</span>
                        </button>
                      ) : null}
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

export default BedManagement;
