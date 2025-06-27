import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Calendar } from 'lucide-react';
import Layout from '../components/Layout/Layout';

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Find patient from our dashboard data
  const patientData = {
    id: id || '150520',
    name: 'Isha Sureshbhai Patel',
    mobile: '9123456780',
    dob: '15/05/2020',
    age: '5Y, 1M, 11D',
    email: 'demo@madhavhospital.com',
    totalVisits: 5,
    lastVisit: '11/06/2025'
  };

  // Updated visit history data with description instead of separate columns
  const visitHistory = [
    {
      id: 1,
      visitDate: '11/06/2025',
      type: 'Vaccine',
      description: 'Cough & Cold treatment with Dr. Gupta - Follow-up consultation completed successfully',
      amount: '₹718',
      status: 'Completed'
    },
    {
      id: 2,
      visitDate: '07/06/2025',
      type: 'OPD',
      description: 'General Checkup with Dr. Sharma - Surgery consultation scheduled but cancelled by patient',
      amount: '₹1081',
      status: 'Cancelled'
    },
    {
      id: 3,
      visitDate: '28/04/2025',
      type: 'OPD',
      description: 'General Checkup with Dr. Patel - Follow-up appointment for previous condition cancelled',
      amount: '₹1152',
      status: 'Cancelled'
    },
    {
      id: 4,
      visitDate: '03/02/2025',
      type: 'OPD',
      description: 'General Checkup with Dr. Patel - Follow-up treatment currently in progress',
      amount: '₹546',
      status: 'In Progress'
    },
    {
      id: 5,
      visitDate: '26/12/2024',
      type: 'Vaccine',
      description: 'Cough & Cold vaccination with Dr. Gupta - Vaccination process ongoing',
      amount: '₹1004',
      status: 'In Progress'
    },
    {
      id: 6,
      visitDate: '15/11/2024',
      type: 'Consultation',
      description: 'Fever treatment with Dr. Singh - Medication prescribed and treatment completed',
      amount: '₹850',
      status: 'Completed'
    },
    {
      id: 7,
      visitDate: '22/10/2024',
      type: 'OPD',
      description: 'Stomach Pain examination with Dr. Mehta - General check-up completed successfully',
      amount: '₹425',
      status: 'Completed'
    },
    {
      id: 8,
      visitDate: '08/09/2024',
      type: 'Surgery',
      description: 'Appendicitis surgery with Dr. Kumar - Major surgery completed with full recovery',
      amount: '₹15000',
      status: 'Completed'
    },
    {
      id: 9,
      visitDate: '19/08/2024',
      type: 'Follow-up',
      description: 'Post Surgery follow-up with Dr. Gupta - Recovery monitoring completed',
      amount: '₹300',
      status: 'Completed'
    },
    {
      id: 10,
      visitDate: '05/07/2024',
      type: 'Vaccine',
      description: 'Routine Vaccination with Dr. Sharma - Standard vaccination protocol completed',
      amount: '₹650',
      status: 'Completed'
    },
    {
      id: 11,
      visitDate: '14/06/2024',
      type: 'OPD',
      description: 'Cold & Cough treatment with Dr. Patel - Medication prescribed and symptoms resolved',
      amount: '₹280',
      status: 'Completed'
    },
    {
      id: 12,
      visitDate: '03/05/2024',
      type: 'Consultation',
      description: 'Skin Allergy consultation with Dr. Singh - Treatment plan discussed but cancelled',
      amount: '₹750',
      status: 'Cancelled'
    }
  ];

  // Filter visits based on search term
  const filteredVisits = visitHistory.filter(visit => {
    const matchesSearch = visit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visit.type.toLowerCase().includes(searchTerm.toLowerCase());
    // You can add date filtering logic here when implementing date picker functionality
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredVisits.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentVisits = filteredVisits.slice(startIndex, endIndex);

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Vaccine':
        return 'bg-green-100 text-green-800';
      case 'OPD':
        return 'bg-purple-100 text-purple-800';
      case 'Surgery':
        return 'bg-red-100 text-red-800';
      case 'Consultation':
        return 'bg-blue-100 text-blue-800';
      case 'Follow-up':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-purple-600">Patient Details</h1>
            <p className="text-gray-600">Case ID: {patientData.id}</p>
          </div>
        </div>

        {/* Patient Information Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Details */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Personal Details</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-700">Name: </span>
                <span className="text-sm text-gray-900">{patientData.name}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Date of Birth: </span>
                <span className="text-sm text-gray-900">{patientData.dob}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Age: </span>
                <span className="text-sm text-gray-900">{patientData.age}</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-700">Mobile: </span>
                <span className="text-sm text-gray-900">{patientData.mobile}</span>
              </div>
            </div>
          </div>

          {/* Visit Summary */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Visit Summary</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-700">Total Visits: </span>
                <span className="text-sm text-gray-900">{patientData.totalVisits}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Last Visit: </span>
                <span className="text-sm text-gray-900">{patientData.lastVisit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visit History Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-purple-600">Visit History</h3>
                <p className="text-sm text-gray-600">Showing {filteredVisits.length} visits</p>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {/* Search */}
                <div className="relative min-w-[250px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by description, type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
                  />
                </div>

                {/* Date Range */}
                <div className="relative min-w-[250px]">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY ~ DD/MM/YYYY"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
                  />
                </div>

                {/* Search Button */}
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Visit History Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-purple-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Visit Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentVisits.map((visit) => (
                  <tr key={visit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit.visitDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(visit.type)}`}>
                        {visit.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-600 max-w-md">
                      {visit.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {visit.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(visit.status)}`}>
                        {visit.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Rows per page:</span>
                <select 
                  value={rowsPerPage}
                  onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-600">
                  {startIndex + 1}-{Math.min(endIndex, filteredVisits.length)} of {filteredVisits.length}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  ««
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  ‹
                </button>
                <span className="px-3 py-1 bg-purple-600 text-white rounded">
                  {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  ›
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  »»
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDetails;
