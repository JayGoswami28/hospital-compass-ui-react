
import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Card from '../components/Common/Card';
import { mockPatients } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPatients.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, endIndex);

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob.split('/').reverse().join('-'));
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handlePatientClick = (patientId: string) => {
    navigate(`/patient/${patientId}`);
  };

  const handleViewDetails = (patientId: string) => {
    navigate(`/patient/${patientId}/summary`);
  };

  const getPageTitle = () => {
    switch (user?.role) {
      case 'Admin':
        return 'Admin Dashboard';
      case 'Doctor':
        return 'Doctor Dashboard';
      case 'Receptionist':
        return 'Receptionist Dashboard';
      default:
        return 'Dashboard';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Title */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
          <div className="text-sm text-gray-600">
            Welcome back, {user?.name}!
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-medical-blue mb-1">156</div>
            <div className="text-gray-600 text-sm">Total Patients</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-green-600 mb-1">89</div>
            <div className="text-gray-600 text-sm">Appointments Today</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-orange-600 mb-1">12</div>
            <div className="text-gray-600 text-sm">Pending Reports</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-red-600 mb-1">3</div>
            <div className="text-gray-600 text-sm">Emergency Cases</div>
          </Card>
        </div>

        {/* Patient Records */}
        <Card title="Recent Patient Records">
          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by patient name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent w-full"
              />
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Rows per page: {rowsPerPage}</span>
              <span>|</span>
              <span>{startIndex + 1}-{Math.min(endIndex, filteredPatients.length)} of {filteredPatients.length}</span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Case ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DOB
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handlePatientClick(patient.id)}
                        className="text-medical-blue hover:text-blue-700 font-medium cursor-pointer"
                      >
                        {patient.name}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.mobile}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.dob}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {calculateAge(patient.dob)} years
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleViewDetails(patient.id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-medical-blue hover:bg-blue-700 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredPatients.length)} of {filteredPatients.length} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
