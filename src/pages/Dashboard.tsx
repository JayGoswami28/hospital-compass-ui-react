
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Table from '../components/Common/Table';
import Card from '../components/Common/Card';
import { mockPatients } from '../data/mockData';

const Dashboard: React.FC = () => {
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

  const columns = [
    { key: 'id', label: 'Case ID' },
    { key: 'name', label: 'Patient Name' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'dob', label: 'DOB' },
    { key: 'age', label: 'Age' },
    { key: 'type', label: 'Type' },
    { 
      key: 'payment', 
      label: 'Payment',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Cash' ? 'bg-green-100 text-green-800' :
          value === 'Online' ? 'bg-blue-100 text-blue-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'amount', label: 'Amount' }
  ];

  const handleView = (patient: any) => {
    console.log('Viewing patient:', patient);
    // Implement patient details modal or navigation
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <div className="text-2xl font-bold text-medical-blue">156</div>
            <div className="text-gray-600">Total Patients</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-green-600">89</div>
            <div className="text-gray-600">Appointments Today</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-orange-600">12</div>
            <div className="text-gray-600">Pending Reports</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-red-600">3</div>
            <div className="text-gray-600">Emergency Cases</div>
          </Card>
        </div>

        {/* Patient Records */}
        <Card title="Patient Records">
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
          <Table 
            columns={columns}
            data={currentPatients}
            onView={handleView}
          />

          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center">
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
