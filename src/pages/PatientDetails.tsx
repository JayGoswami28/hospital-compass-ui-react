
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Phone, Mail, MapPin } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Card from '../components/Common/Card';
import { mockPatients } from '../data/mockData';

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const patient = mockPatients.find(p => p.id === id);

  // Mock visit history data
  const visitHistory = [
    {
      id: 1,
      date: '2024-06-20',
      time: '10:30 AM',
      type: 'Consultation',
      notes: 'Regular check-up, patient feeling well'
    },
    {
      id: 2,
      date: '2024-05-15',
      time: '2:15 PM',
      type: 'Vaccine',
      notes: 'COVID-19 booster shot administered'
    },
    {
      id: 3,
      date: '2024-04-10',
      time: '11:00 AM',
      type: 'Follow-up',
      notes: 'Blood pressure monitoring'
    }
  ];

  const totalPages = Math.ceil(visitHistory.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentVisits = visitHistory.slice(startIndex, endIndex);

  if (!patient) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold text-gray-700">Patient not found</h2>
        </div>
      </Layout>
    );
  }

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob.split('/').reverse().join('-'));
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
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
          <h1 className="text-2xl font-bold text-gray-900">Patient Details</h1>
        </div>

        {/* Patient Information Card */}
        <Card>
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{patient.name}</h2>
                <p className="text-gray-600">Patient ID: {patient.id}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  patient.type === 'Vaccine' ? 'bg-green-100 text-green-800' :
                  patient.type === 'Consultation' ? 'bg-blue-100 text-blue-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {patient.type}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">{patient.dob}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-gray-400 font-semibold">#</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{calculateAge(patient.dob)} years</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Mobile</p>
                  <p className="font-medium">{patient.mobile}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">patient@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Visit History */}
        <Card title="Visit History">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentVisits.map((visit) => (
                  <tr key={visit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        visit.type === 'Vaccine' ? 'bg-green-100 text-green-800' :
                        visit.type === 'Consultation' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {visit.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {visit.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, visitHistory.length)} of {visitHistory.length} results
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

export default PatientDetails;
