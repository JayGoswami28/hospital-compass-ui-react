import React, { useState } from 'react';
import { Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const Receptionist: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    opd: false,
    indoor: false,
    vaccination: false
  });
  const [dateRange, setDateRange] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Mock patient visits data
  const [patientVisits] = useState([
    {
      id: '140720',
      patientName: 'Tiya Rameshbhai Shama',
      address: 'Surat',
      phoneNo: '9876543210',
      age: '4Y 11M 13D',
      type: 'OPD',
      appointmentTime: '10:00 AM'
    },
    {
      id: '150622',
      patientName: 'Raj Kumar Patel',
      address: 'Ahmedabad',
      phoneNo: '9876543211',
      age: '25Y 6M 8D',
      type: 'Indoor',
      appointmentTime: '11:30 AM'
    },
    {
      id: '280821',
      patientName: 'Priya Shah',
      address: 'Vadodara',
      phoneNo: '9876543212',
      age: '32Y 2M 15D',
      type: 'Vaccination',
      appointmentTime: '2:00 PM'
    },
    {
      id: '120923',
      patientName: 'Amit Joshi',
      address: 'Rajkot',
      phoneNo: '9876543213',
      age: '28Y 9M 22D',
      type: 'OPD',
      appointmentTime: '3:30 PM'
    },
    {
      id: '050224',
      patientName: 'Neha Desai',
      address: 'Surat',
      phoneNo: '9876543214',
      age: '45Y 3M 7D',
      type: 'Indoor',
      appointmentTime: '9:00 AM'
    },
    {
      id: '180324',
      patientName: 'Kiran Modi',
      address: 'Gandhinagar',
      phoneNo: '9876543215',
      age: '35Y 8M 12D',
      type: 'Vaccination',
      appointmentTime: '4:00 PM'
    },
    {
      id: '220424',
      patientName: 'Sanjay Parmar',
      address: 'Bhavnagar',
      phoneNo: '9876543216',
      age: '52Y 1M 9D',
      type: 'OPD',
      appointmentTime: '10:30 AM'
    },
    {
      id: '110524',
      patientName: 'Kavita Sharma',
      address: 'Junagadh',
      phoneNo: '9876543217',
      age: '29Y 11M 18D',
      type: 'Indoor',
      appointmentTime: '1:00 PM'
    },
    {
      id: '030624',
      patientName: 'Rohit Verma',
      address: 'Anand',
      phoneNo: '9876543218',
      age: '41Y 6M 25D',
      type: 'OPD',
      appointmentTime: '11:00 AM'
    },
    {
      id: '250624',
      patientName: 'Sunita Agarwal',
      address: 'Mehsana',
      phoneNo: '9876543219',
      age: '38Y 4M 3D',
      type: 'Vaccination',
      appointmentTime: '2:30 PM'
    },
    {
      id: '070724',
      patientName: 'Vikram Singh',
      address: 'Palanpur',
      phoneNo: '9876543220',
      age: '33Y 7M 14D',
      type: 'Indoor',
      appointmentTime: '9:30 AM'
    },
    {
      id: '150824',
      patientName: 'Meera Patel',
      address: 'Nadiad',
      phoneNo: '9876543221',
      age: '26Y 10M 21D',
      type: 'OPD',
      appointmentTime: '3:00 PM'
    },
    {
      id: '200924',
      patientName: 'Arjun Mehta',
      address: 'Bharuch',
      phoneNo: '9876543222',
      age: '47Y 5M 16D',
      type: 'Vaccination',
      appointmentTime: '4:30 PM'
    },
    {
      id: '081024',
      patientName: 'Disha Chokshi',
      address: 'Morbi',
      phoneNo: '9876543223',
      age: '31Y 2M 28D',
      type: 'Indoor',
      appointmentTime: '10:00 AM'
    }
  ]);

  // Filter patients based on search and filters
  const filteredPatients = patientVisits.filter(patient => {
    const matchesSearch = patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.includes(searchTerm);
    
    const selectedFilterTypes = [];
    if (selectedFilters.opd) selectedFilterTypes.push('OPD');
    if (selectedFilters.indoor) selectedFilterTypes.push('Indoor');
    if (selectedFilters.vaccination) selectedFilterTypes.push('Vaccination');
    
    const matchesFilter = selectedFilterTypes.length === 0 || selectedFilterTypes.includes(patient.type);
    
    return matchesSearch && matchesFilter;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredPatients.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, endIndex);

  const handleFilterChange = (filterType: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType as keyof typeof prev]
    }));
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const handleViewIndoorPatient = (patient: any) => {
    navigate('/indoor-patient-details', { state: { patient } });
  };

  const handleViewVaccinationPatient = (patient: any) => {
    navigate('/vaccination-details', { state: { patient } });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'OPD':
        return 'bg-purple-100 text-purple-800';
      case 'Indoor':
        return 'bg-blue-100 text-blue-800';
      case 'Vaccination':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white p-4 sm:p-6 md:p-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-600 mb-2 sm:mb-4">Welcome to Madhav Hospital</h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">Please select your patient type</p>
        </div>

        {/* Patient Type Selection Cards */}
        <div className="bg-white px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* New Patient Card */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4 sm:p-6 md:p-8 text-center hover:border-indigo-300 cursor-pointer transition-colors">
              <div className="text-indigo-600 mb-3 sm:mb-4">
                <User className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">New Patient</h3>
              <p className="text-gray-600 text-sm sm:text-base">First time visiting our hospital</p>
            </div>

            {/* Old Patient Card */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4 sm:p-6 md:p-8 text-center hover:border-indigo-300 cursor-pointer transition-colors">
              <div className="text-indigo-600 mb-3 sm:mb-4">
                <User className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Old Patient</h3>
              <p className="text-gray-600 text-sm sm:text-base">Returning patient with records</p>
            </div>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-white p-3 sm:p-4 md:p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search by Name */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full text-sm sm:text-base"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
              {/* Filter Checkboxes */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedFilters.opd}
                    onChange={() => handleFilterChange('opd')}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-gray-700 text-sm sm:text-base">OPD</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedFilters.indoor}
                    onChange={() => handleFilterChange('indoor')}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-gray-700 text-sm sm:text-base">Indoor</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedFilters.vaccination}
                    onChange={() => handleFilterChange('vaccination')}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-gray-700 text-sm sm:text-base">Vaccination</span>
                </label>
              </div>

              <div className="flex gap-2 sm:gap-3">
                {/* Date Range */}
                <div className="relative flex-1 sm:min-w-56">
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY ~ DD/MM/YYYY"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full text-sm sm:text-base"
                  />
                </div>

                {/* Search Button */}
                <button className="bg-indigo-600 text-white px-3 sm:px-4 md:px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                  <Search className="w-4 h-4" />
                  <span className="hidden md:inline">Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Visits Table */}
        <div className="bg-white m-3 sm:m-4 md:m-6 rounded-lg shadow-sm overflow-hidden">
          <div className="p-3 sm:p-4 md:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Patients Visits</h2>
              <span className="text-gray-600 text-sm sm:text-base">Total Patients: {filteredPatients.length}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Appointment Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {patient.patientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.phoneNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(patient.type)}`}>
                        {patient.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.appointmentTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {patient.type === 'Indoor' && (
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleViewIndoorPatient(patient);
                          }}
                          className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors text-sm"
                        >
                          View
                        </button>
                      )}
                      {patient.type === 'Vaccination' && (
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleViewVaccinationPatient(patient);
                          }}
                          className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors text-sm"
                        >
                          View
                        </button>
                      )}
                      {patient.type === 'OPD' && (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
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
                  {startIndex + 1}-{Math.min(endIndex, filteredPatients.length)} of {filteredPatients.length}
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
                <span className="px-3 py-1 bg-indigo-600 text-white rounded">
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

export default Receptionist;
